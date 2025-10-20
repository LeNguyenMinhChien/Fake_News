'use server';

/**
 * @fileOverview An AI agent for analyzing social media content to detect potential misinformation.
 *
 * - analyzeSocialContent - A function that analyzes social media content.
 * - AnalyzeSocialContentInput - The input type for the analyzeSocialContent function.
 * - AnalyzeSocialContentOutput - The return type for the analyzeSocialContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSocialContentInputSchema = z.object({
  content: z.string().describe('The social media content to analyze (text, image, or video description).'),
  platform: z.enum(['facebook', 'instagram', 'other']).describe('The social media platform where the content was found.'),
  mediaUrl: z.string().optional().describe('The URL of the media (image or video) if any, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'),
});
export type AnalyzeSocialContentInput = z.infer<typeof AnalyzeSocialContentInputSchema>;

const AnalyzeSocialContentOutputSchema = z.object({
  isMisinformation: z.boolean().describe('Whether the content is likely to be misinformation.'),
  confidenceScore: z.number().describe('A score between 0 and 1 indicating the confidence level of the misinformation assessment.'),
  reasoning: z.string().describe('The reasoning behind the misinformation assessment.'),
});
export type AnalyzeSocialContentOutput = z.infer<typeof AnalyzeSocialContentOutputSchema>;

export async function analyzeSocialContent(input: AnalyzeSocialContentInput): Promise<AnalyzeSocialContentOutput> {
  return analyzeSocialContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSocialContentPrompt',
  input: {schema: AnalyzeSocialContentInputSchema},
  output: {schema: AnalyzeSocialContentOutputSchema},
  prompt: `You are an expert in identifying misinformation on social media platforms like Facebook and Instagram.

You will analyze the provided content and determine if it is likely to be misinformation.

Consider the source of the content, the claims made, and any available media.
{{#if mediaUrl}}
The content includes the following media: {{media url=mediaUrl}}
{{/if}}

Content: {{{content}}}
Platform: {{{platform}}}

Provide a confidence score (0-1) and reasoning for your assessment. Set the isMisinformation field appropriately.

Output in JSON format.
`,
});

const analyzeSocialContentFlow = ai.defineFlow(
  {
    name: 'analyzeSocialContentFlow',
    inputSchema: AnalyzeSocialContentInputSchema,
    outputSchema: AnalyzeSocialContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
