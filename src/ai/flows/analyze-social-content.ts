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
  prompt: `Bạn là một chuyên gia trong việc xác định thông tin sai lệch trên các nền tảng mạng xã hội như Facebook và Instagram.

Bạn sẽ phân tích nội dung được cung cấp và xác định xem đó có khả năng là thông tin sai lệch hay không.

Hãy xem xét nguồn gốc của nội dung, các tuyên bố được đưa ra và bất kỳ phương tiện truyền thông nào có sẵn.
{{#if mediaUrl}}
Nội dung bao gồm phương tiện sau: {{media url=mediaUrl}}
{{/if}}

Nội dung: {{{content}}}
Nền tảng: {{{platform}}}

Cung cấp điểm tin cậy (0-1) và lý do cho đánh giá của bạn. Đặt trường isMisinformation một cách thích hợp.

Tất cả các phản hồi phải bằng tiếng Việt.

Xuất ra ở định dạng JSON.
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
