import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sourceType, content, title } = await req.json();
    
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
    console.error('Error in generate-course-content function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      notes: [],
      quizzes: [],
      flashcards: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});