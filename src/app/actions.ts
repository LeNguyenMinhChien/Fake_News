'use server';

import { z } from 'zod';
import { analyzeSocialContent, AnalyzeSocialContentOutput } from '@/ai/flows/analyze-social-content';
import { verifyInformationSource, VerifyInformationSourceOutput } from '@/ai/flows/verify-information-source';

// Content Analysis
const contentAnalysisSchema = z.object({
  content: z.string().min(10, 'Nội dung phải có ít nhất 10 ký tự.'),
  platform: z.enum(['facebook', 'instagram', 'other']),
  media: z.instanceof(File).optional(),
});

export type ContentAnalysisState = {
  result?: AnalyzeSocialContentOutput;
  error?: string;
  form: {
    content: string;
    platform: 'facebook' | 'instagram' | 'other';
  }
};

async function fileToGenerativePart(file: File) {
  const base64 = Buffer.from(await file.arrayBuffer()).toString('base64');
  return `data:${file.type};base64,${base64}`;
}

export async function handleContentAnalysis(
  prevState: ContentAnalysisState,
  formData: FormData
): Promise<ContentAnalysisState> {
  const validatedFields = contentAnalysisSchema.safeParse({
    content: formData.get('content'),
    platform: formData.get('platform'),
    media: formData.get('media'),
  });

  const formValues = {
    content: formData.get('content') as string || '',
    platform: formData.get('platform') as 'facebook' | 'instagram' | 'other' || 'facebook',
  };

  if (!validatedFields.success) {
    return {
      ...prevState,
      error: validatedFields.error.flatten().fieldErrors.content?.[0] || 'Dữ liệu không hợp lệ.',
      form: formValues,
    };
  }

  const { content, platform, media } = validatedFields.data;

  try {
    let mediaUrl: string | undefined;
    if (media && media.size > 0) {
      if (media.size > 4 * 1024 * 1024) { // 4MB limit
        return { ...prevState, error: 'Kích thước hình ảnh không được vượt quá 4MB.', form: formValues };
      }
      mediaUrl = await fileToGenerativePart(media);
    }
    
    const result = await analyzeSocialContent({ content, platform, mediaUrl });
    return { result, form: { content: '', platform: 'facebook' } };
  } catch (e) {
    console.error(e);
    return { ...prevState, error: 'Đã xảy ra lỗi khi phân tích. Vui lòng thử lại.', form: formValues };
  }
}

// Source Verification
const sourceVerificationSchema = z.object({
  sourceName: z.string().min(3, 'Tên nguồn phải có ít nhất 3 ký tự.'),
});

export type SourceVerificationState = {
  result?: VerifyInformationSourceOutput;
  error?: string;
  form: {
    sourceName: string;
  }
};

export async function handleSourceVerification(
  prevState: SourceVerificationState,
  formData: FormData
): Promise<SourceVerificationState> {
  const sourceName = formData.get('sourceName') as string || '';
  const validatedFields = sourceVerificationSchema.safeParse({
    sourceName,
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      error: validatedFields.error.flatten().fieldErrors.sourceName?.[0] || 'Dữ liệu không hợp lệ.',
      form: { sourceName }
    };
  }

  try {
    const result = await verifyInformationSource({ sourceName: validatedFields.data.sourceName });
    return { result, form: { sourceName: '' } };
  } catch (e) {
    console.error(e);
    return { ...prevState, error: 'Đã xảy ra lỗi khi xác minh. Vui lòng thử lại.', form: { sourceName } };
  }
}
