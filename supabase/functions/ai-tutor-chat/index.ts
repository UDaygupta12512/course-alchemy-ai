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
    const { message, courseContext } = await req.json();
    
    console.log('AI Tutor request:', { message, courseContext });

    if (!message) {
      throw new Error('Message is required');
    }

    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      throw new Error('OpenAI API key not configured');
    }

    // Create system prompt for AI tutor
    const systemPrompt = `You are an AI learning tutor assistant for MindSphere AI. Your role is to help students understand course content, answer questions, and provide educational guidance. 

${courseContext ? `Course Context: ${courseContext}` : ''}

Guidelines:
- Be helpful, encouraging, and educational
- Break down complex concepts into simple explanations
- Provide examples when helpful
- Ask follow-up questions to ensure understanding
- Keep responses concise but thorough
- If you don't know something, say so and suggest how the student might find the answer
- Always maintain a supportive and positive tone
- Format your responses with clear structure: use bullet points or numbered lists when listing multiple items
- Put each main point on a separate line for better readability
- Use line breaks between different concepts or topics`;

    console.log('Making OpenAI API request...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    console.log('OpenAI response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error response:', errorText);
      throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenAI API response received');
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid response format from OpenAI API:', data);
      throw new Error('Invalid response format from OpenAI API');
    }
    
    const aiResponse = data.choices[0].message.content;
    console.log('AI response generated successfully');

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-tutor-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Please check the console logs for more information'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});