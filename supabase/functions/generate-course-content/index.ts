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
    
    const courseStructure = `
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

    if (sourceType === 'youtube') {
      userPrompt = `Based on this YouTube video: "${content}", create a comprehensive course titled "${title}". Generate:${courseStructure}`;
    } else if (sourceType === 'pdf') {
      userPrompt = `Based on this PDF document content: "${content}", create a comprehensive course titled "${title}". Generate:${courseStructure}`;
    } else if (sourceType === 'text') {
      userPrompt = `Based on this text content: "${content}", create a comprehensive course titled "${title}". Generate:${courseStructure}`;
    } else if (sourceType === 'web') {
      userPrompt = `Based on this web article: "${content}", create a comprehensive course titled "${title}". Generate:${courseStructure}`;
    } else if (sourceType === 'audio') {
      userPrompt = `Based on this audio content: "${content}", create a comprehensive course titled "${title}". Generate:${courseStructure}`;
    } else {
      userPrompt = `Based on this content: "${content}", create a comprehensive course titled "${title}". Generate:

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
      console.log('Parsing content:', content.substring(0, 500));
      
      const notes = [];
      const quizzes = [];
      const flashcards = [];

      // Split content into major sections
      const sections = content.split(/(?=##?\s*(?:DETAILED NOTES|CHALLENGING QUIZZES|FLASHCARDS))/i);
      
      sections.forEach(section => {
        const sectionLower = section.toLowerCase();
        
        if (sectionLower.includes('detailed notes') || sectionLower.includes('notes')) {
          // Extract notes sections - stop at quizzes or flashcards
          const notesContent = section.split(/##?\s*(?:challenging quizzes|flashcards)/i)[0];
          const noteMatches = notesContent.match(/###\s*(.+?)\n([\s\S]*?)(?=###|$)/g);
          
          if (noteMatches) {
            noteMatches.forEach(match => {
              const titleMatch = match.match(/###\s*(.+?)\n/);
              if (titleMatch) {
                const title = titleMatch[1].trim();
                let content = match.replace(/###\s*.+?\n/, '').trim();
                
                // Stop at quiz or flashcard sections
                content = content.split(/##?\s*(?:challenging quizzes|flashcards)/i)[0].trim();
                
                // Format content for better readability
                content = content
                  .replace(/^-\s+/gm, '• ')
                  .replace(/^\*\s+/gm, '• ')
                  .replace(/\n\n+/g, '\n\n')
                  .trim();
                
                if (title && content) {
                  notes.push({
                    title,
                    content,
                    duration: `${Math.ceil(content.split(' ').length / 200)} min read`
                  });
                }
              }
            });
          }
        }
        
        if (sectionLower.includes('challenging quizzes') || sectionLower.includes('quizzes')) {
          // Extract quiz questions
          const quizSection = section.split(/##?\s*flashcards/i)[0]; // Stop at flashcards
          const quizMatches = quizSection.match(/\*\*Question \d+:\*\*\s*(.+?)(?=\*\*Question \d+:\*\*|##|$)/gs);
          
          if (quizMatches) {
            quizMatches.forEach(match => {
              const questionMatch = match.match(/\*\*Question \d+:\*\*\s*(.+?)(?:\n|$)/);
              const optionsMatch = match.match(/[a-d]\)\s*(.+?)(?:\n|$)/gi);
              const correctMatch = match.match(/\*\*Correct:\*\*\s*([a-d])/i);
              const explanationMatch = match.match(/\*\*Explanation:\*\*\s*([\s\S]+?)(?=\n\*\*|$)/);

              if (questionMatch && optionsMatch && correctMatch) {
                const options = optionsMatch.map(opt => opt.replace(/^[a-d]\)\s*/i, '').trim());
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
        }
        
        if (sectionLower.includes('flashcards')) {
          // Extract flashcards
          const cardMatches = section.match(/\*\*Front:\*\*\s*(.+?)\s*\*\*Back:\*\*\s*([\s\S]*?)(?=\*\*Front:|$)/gs);
          
          if (cardMatches) {
            cardMatches.forEach(match => {
              const frontMatch = match.match(/\*\*Front:\*\*\s*(.+?)(?=\s*\*\*Back)/s);
              const backMatch = match.match(/\*\*Back:\*\*\s*([\s\S]+?)(?=\s*$)/s);
              
              if (frontMatch && backMatch) {
                const front = frontMatch[1].trim();
                let back = backMatch[1].trim();
                
                // Clean up the back content
                back = back
                  .replace(/\n+/g, ' ')
                  .replace(/\s+/g, ' ')
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

      console.log('Parsed results:', { notesCount: notes.length, quizzesCount: quizzes.length, flashcardsCount: flashcards.length });
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