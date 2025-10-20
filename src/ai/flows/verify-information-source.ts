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
  prompt: `Bạn là một chuyên gia AI trong việc đánh giá uy tín của các nguồn tin tức và các tổ chức kiểm chứng thông tin.

Bạn sẽ nhận được tên của một nguồn thông tin và xác định xem nó có được coi là uy tín hay không dựa trên kiến thức và cơ sở dữ liệu nội bộ của bạn.

Hãy xem xét các yếu tố như lịch sử của nguồn, thực tiễn kiểm chứng thông tin, tiêu chuẩn biên tập, tính minh bạch và các thành kiến tiềm tàng.

Tên nguồn: {{{sourceName}}}

Xác định xem nguồn có uy tín không, gán điểm uy tín (0-100), và cung cấp một lời giải thích ngắn gọn cho đánh giá của bạn.

Tất cả các phản hồi phải bằng tiếng Việt.

Xuất ra ở định dạng JSON:
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
