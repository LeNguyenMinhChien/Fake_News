'use server';

/**
 * @fileOverview A flow to verify information sources against a database of reputable news outlets and fact-checking organizations.
 *
 * - verifyInformationSource - A function that handles the information source verification process.
 * - VerifyInformationSourceInput - The input type for the verifyInformationSource function.
 * - VerifyInformationSourceOutput - The return type for the verifyInformationSource function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyInformationSourceInputSchema = z.object({
  sourceName: z.string().describe('The name of the information source to verify.'),
});
export type VerifyInformationSourceInput = z.infer<typeof VerifyInformationSourceInputSchema>;

const VerifyInformationSourceOutputSchema = z.object({
  isReputable: z.boolean().describe('Whether the information source is considered reputable.'),
  reputationScore: z.number().describe('A score indicating the reputation of the source (0-100).'),
  reason: z.string().describe('The reasoning behind the reputation assessment.'),
});
export type VerifyInformationSourceOutput = z.infer<typeof VerifyInformationSourceOutputSchema>;

export async function verifyInformationSource(input: VerifyInformationSourceInput): Promise<VerifyInformationSourceOutput> {
  return verifyInformationSourceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'verifyInformationSourcePrompt',
  input: {schema: VerifyInformationSourceInputSchema},
  output: {schema: VerifyInformationSourceOutputSchema},
  prompt: `You are an AI expert in evaluating the reputability of news sources and fact-checking organizations.

You will receive the name of an information source and determine whether it is considered reputable based on your knowledge and internal database.

Consider factors such as the source's history, fact-checking practices, editorial standards, transparency, and potential biases.

Source Name: {{{sourceName}}}

Determine if the source is reputable, assign a reputation score (0-100), and provide a brief explanation for your assessment.

Output in JSON format:
{
  "isReputable": boolean,
  "reputationScore": number,
  "reason": string
}`,
});

const verifyInformationSourceFlow = ai.defineFlow(
  {
    name: 'verifyInformationSourceFlow',
    inputSchema: VerifyInformationSourceInputSchema,
    outputSchema: VerifyInformationSourceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
