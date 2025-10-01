import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting map (userId -> { count, resetTime })
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per window
const RATE_LIMIT_WINDOW = 60000; // 1 minute

const validateInput = (data: any) => {
  if (!data.sourceType || !data.content) {
    throw new Error("Missing required fields: sourceType and content");
  }
  
  if (!["youtube", "pdf", "text"].includes(data.sourceType)) {
    throw new Error("Invalid sourceType. Must be youtube, pdf, or text");
  }
  
  if (typeof data.content !== "string" || data.content.trim().length === 0) {
    throw new Error("Content must be a non-empty string");
  }
  
  if (data.content.length > 10000) {
    throw new Error("Content exceeds maximum length of 10000 characters");
  }
  
  return {
    sourceType: data.sourceType,
    content: data.content.trim(),
  };
};

const checkRateLimit = (userId: string): boolean => {
  const now = Date.now();
  const userLimit = rateLimitMap.get(userId);
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(userId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (userLimit.count >= RATE_LIMIT) {
    return false;
  }
  
  userLimit.count++;
  return true;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify JWT token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('Missing authorization header');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      console.error('Authentication failed:', authError?.message);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check rate limit
    if (!checkRateLimit(user.id)) {
      console.warn(`Rate limit exceeded for user ${user.id}`);
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing request for user ${user.id}`);

    // Validate input
    const requestData = await req.json();
    const { sourceType, content } = validateInput(requestData);
    const { title } = requestData;
    
    console.log('Received request:', { sourceType, content: content?.substring(0, 100), title });

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create prompt based on source type
    let prompt = '';
    
    if (sourceType === 'youtube') {
      prompt = `Create educational content from this YouTube video URL: ${content}

Please generate comprehensive course material in the following JSON format:
{
  "notes": [
    {
      "title": "Section Title",
      "content": "Detailed notes content with key concepts and explanations"
    }
  ],
  "quizzes": [
    {
      "question": "Question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Explanation of why this answer is correct"
    }
  ],
  "flashcards": [
    {
      "front": "Term or concept",
      "back": "Definition or explanation"
    }
  ]
}

Generate at least 5 comprehensive note sections, 10 quiz questions, and 15 flashcards based on the video content.`;
    } else if (sourceType === 'pdf') {
      prompt = `Create educational content from these PDF files: ${content}

Please generate comprehensive course material in the following JSON format:
{
  "notes": [
    {
      "title": "Section Title", 
      "content": "Detailed notes content with key concepts and explanations"
    }
  ],
  "quizzes": [
    {
      "question": "Question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Explanation of why this answer is correct"
    }
  ],
  "flashcards": [
    {
      "front": "Term or concept",
      "back": "Definition or explanation"
    }
  ]
}

Generate at least 5 comprehensive note sections, 10 quiz questions, and 15 flashcards based on the PDF content.`;
    } else {
      prompt = `Create educational content from this input: ${content}

Please generate comprehensive course material in the following JSON format:
{
  "notes": [
    {
      "title": "Section Title",
      "content": "Detailed notes content with key concepts and explanations"
    }
  ],
  "quizzes": [
    {
      "question": "Question text", 
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Explanation of why this answer is correct"
    }
  ],
  "flashcards": [
    {
      "front": "Term or concept",
      "back": "Definition or explanation"
    }
  ]
}

Generate at least 5 comprehensive note sections, 10 quiz questions, and 15 flashcards.`;
    }

    console.log('Making OpenAI API call...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert educational content creator. Always respond with valid JSON in exactly the format requested. Generate high-quality, comprehensive educational content including detailed notes, challenging quiz questions, and useful flashcards.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');
    
    const generatedContent = data.choices[0].message.content;
    console.log('Generated content preview:', generatedContent.substring(0, 200));

    // Parse the JSON response from OpenAI
    let courseContent;
    try {
      // Clean the response to extract JSON
      const jsonMatch = generatedContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        courseContent = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No valid JSON found in response');
      }
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Raw content:', generatedContent);
      
      // Fallback: create structured content from the text response
      courseContent = {
        notes: [
          {
            title: "Generated Content",
            content: generatedContent
          }
        ],
        quizzes: [
          {
            question: "What is the main topic of this content?",
            options: ["Topic A", "Topic B", "Topic C", "Topic D"],
            correctAnswer: 0,
            explanation: "This is the primary focus of the material."
          }
        ],
        flashcards: [
          {
            front: "Key Concept",
            back: "This represents the main learning objective from the content."
          }
        ]
      };
    }

    // Ensure we have the required structure
    if (!courseContent.notes) courseContent.notes = [];
    if (!courseContent.quizzes) courseContent.quizzes = [];
    if (!courseContent.flashcards) courseContent.flashcards = [];

    console.log('Course content structure:', {
      notes: courseContent.notes.length,
      quizzes: courseContent.quizzes.length,
      flashcards: courseContent.flashcards.length
    });

    return new Response(JSON.stringify(courseContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-course-content function:', error instanceof Error ? error.message : 'Unknown error');
    
    const statusCode = error instanceof Error && error.message.includes('Rate limit') ? 429 :
                       error instanceof Error && (error.message.includes('Invalid') || error.message.includes('Missing')) ? 400 : 500;
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate course content',
        notes: [],
        quizzes: [],
        flashcards: []
      }),
      { 
        status: statusCode,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});