import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sourceType, content, title } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Generate comprehensive course content based on input
    const systemPrompt = `You are an expert educational content creator. Generate clear, simple, and well-structured course content. Make notes easy to read with each key point on a new line. Create practical flashcards with concise definitions. Focus on clarity and comprehension.`;

    let userPrompt = '';
    if (sourceType === 'youtube') {
      userPrompt = `Based on this YouTube video: "${content}", create a comprehensive course titled "${title}". Generate:

1. DETAILED NOTES (3 sections):
   ### Section 1 Title
   - Key point 1
   - Key point 2
   - Key point 3
   
   ### Section 2 Title
   - Key point 1
   - Key point 2
   - Key point 3
   
   ### Section 3 Title
   - Key point 1
   - Key point 2
   - Key point 3

2. CHALLENGING QUIZZES (5 questions):
   **Question 1:** [Question text]
   a) Option 1
   b) Option 2
   c) Option 3
   d) Option 4
   **Correct:** a
   **Explanation:** [Brief explanation]

3. FLASHCARDS (8 practical cards):
   **Front:** [Key term, concept, or question]
   **Back:** [One-sentence clear explanation or answer]
   
   **Front:** [Important process or method]
   **Back:** [Step-by-step summary in 2-3 lines max]

   **Front:** [Practical application]
   **Back:** [Real-world example or use case]

Create flashcards that test understanding, not just memorization. Each back should be 1-2 sentences maximum. Focus on the most important concepts that learners need to remember.`;
    } else {
      userPrompt = `Based on this PDF document: "${content}", create a comprehensive course titled "${title}". Generate:

1. DETAILED NOTES (3 sections):
   ### Section 1 Title
   - Key point 1
   - Key point 2
   - Key point 3
   
   ### Section 2 Title
   - Key point 1
   - Key point 2
   - Key point 3
   
   ### Section 3 Title
   - Key point 1
   - Key point 2
   - Key point 3

2. CHALLENGING QUIZZES (5 questions):
   **Question 1:** [Question text]
   a) Option 1
   b) Option 2
   c) Option 3
   d) Option 4
   **Correct:** a
   **Explanation:** [Brief explanation]

3. FLASHCARDS (8 practical cards):
   **Front:** [Key term, concept, or question]
   **Back:** [One-sentence clear explanation or answer]
   
   **Front:** [Important process or method]
   **Back:** [Step-by-step summary in 2-3 lines max]

   **Front:** [Practical application]
   **Back:** [Real-world example or use case]

Create flashcards that test understanding, not just memorization. Each back should be 1-2 sentences maximum. Focus on the most important concepts that learners need to remember.`;
    }

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
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    // Parse the generated content to extract structured data
    const parseContent = (content: string) => {
      const sections = content.split(/(?=\d+\.\s+(?:DETAILED NOTES|CHALLENGING QUIZZES|FLASHCARDS))/);
      
      const notes = [];
      const quizzes = [];
      const flashcards = [];

      sections.forEach(section => {
        if (section.includes('DETAILED NOTES')) {
          // Extract notes sections
          const noteMatches = section.match(/### (.+?)\n([\s\S]*?)(?=###|$)/g);
          if (noteMatches) {
            noteMatches.forEach(match => {
              const [, title] = match.match(/### (.+?)\n/) || [];
              let content = match.replace(/### .+?\n/, '').trim();
              
              // Format content for better readability - convert bullet points to proper format
              content = content
                .replace(/^-\s+/gm, '• ')  // Convert - to bullet points
                .replace(/^\*\s+/gm, '• ') // Convert * to bullet points
                .replace(/\n\n+/g, '\n\n') // Clean up extra line breaks
                .trim();
              
              if (title && content) {
                notes.push({
                  title,
                  content,
                  duration: `${Math.ceil(content.split(' ').length / 200)} min read`
                });
              }
            });
          }
        } else if (section.includes('CHALLENGING QUIZZES')) {
          // Extract quiz questions
          const quizMatches = section.match(/\*\*Question \d+:\*\*(.+?)(?=\*\*Question \d+:\*\*|$)/gs);
          if (quizMatches) {
            quizMatches.forEach(match => {
              const questionMatch = match.match(/\*\*Question \d+:\*\*\s*(.+?)\n/);
              const optionsMatch = match.match(/(?:a\)|A\)).+/g);
              const correctMatch = match.match(/\*\*Correct:\*\*\s*([a-dA-D])/);
              const explanationMatch = match.match(/\*\*Explanation:\*\*\s*([\s\S]+?)(?=\n\n|$)/);

              if (questionMatch && optionsMatch && correctMatch) {
                const options = optionsMatch.map(opt => opt.replace(/^[a-dA-D]\)\s*/, ''));
                const correctIndex = correctMatch[1].toLowerCase().charCodeAt(0) - 97;
                
                quizzes.push({
                  question: questionMatch[1].trim(),
                  options,
                  correct: correctIndex,
                  explanation: explanationMatch ? explanationMatch[1].trim() : 'Explanation not provided.'
                });
              }
            });
          }
        } else if (section.includes('FLASHCARDS')) {
          // Extract flashcards
          const cardMatches = section.match(/\*\*Front:\*\*(.+?)\*\*Back:\*\*(.+?)(?=\*\*Front:|$)/gs);
          if (cardMatches) {
            cardMatches.forEach(match => {
              const frontMatch = match.match(/\*\*Front:\*\*\s*(.+?)(?:\n|\*\*Back)/);
              const backMatch = match.match(/\*\*Back:\*\*\s*([\s\S]+?)(?=\n\n|\*\*Front:|$)/);
              
              if (frontMatch && backMatch) {
                const front = frontMatch[1].trim();
                let back = backMatch[1].trim();
                
                // Clean up the back content - remove extra formatting and keep it concise
                back = back
                  .replace(/\n+/g, ' ')  // Replace line breaks with spaces
                  .replace(/\s+/g, ' ')  // Clean up multiple spaces
                  .trim();
                
                flashcards.push({
                  front,
                  back,
                  category: "Key Concepts"
                });
              }
            });
          }
        }
      });

      return { notes, quizzes, flashcards };
    };

    const parsedContent = parseContent(generatedContent);

    // Fallback content if parsing fails
    if (parsedContent.notes.length === 0) {
      parsedContent.notes = [
        {
          title: "Core Concepts and Fundamentals",
          content: generatedContent.substring(0, 800) + "...",
          duration: "8 min read"
        }
      ];
    }

    return new Response(JSON.stringify({
      success: true,
      courseContent: parsedContent,
      rawContent: generatedContent
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-course-content function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});