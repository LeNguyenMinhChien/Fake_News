'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { handleContentAnalysis, ContentAnalysisState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Loader2, Paperclip } from 'lucide-react';
import AnalysisResult from './analysis-result';
import { useToast } from '@/hooks/use-toast';

const initialState: ContentAnalysisState = {
  form: {
    content: '',
    platform: 'facebook',
  }
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full h-12 text-lg" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
      Phân tích
    </Button>
  );
}

export default function ContentAnalysisForm() {
  const [state, formAction] = useActionState(handleContentAnalysis, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Lỗi',
        description: state.error,
      });
    }
    if (state.result) {
        formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <div className="space-y-8">
        <Card>
          <form action={formAction} ref={formRef}>
            <CardHeader>
              <CardTitle>Phân tích Nội dung Bài đăng</CardTitle>
              <CardDescription>
                Dán nội dung bài đăng trên mạng xã hội và đính kèm hình ảnh (nếu có) để phân tích.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">Nội dung</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Nhập hoặc dán nội dung bài đăng ở đây..."
                  rows={6}
                  required
                  defaultValue={state.form.content}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platform">Nền tảng</Label>
                   <Select name="platform" defaultValue={state.form.platform}>
                    <SelectTrigger id="platform">
                      <SelectValue placeholder="Chọn nền tảng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="media">Đính kèm Hình ảnh (Tùy chọn)</Label>
                  <div className="relative">
                     <Input id="media" name="media" type="file" accept="image/*" className="pl-10 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                     <Paperclip className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>

        {state.result && (
          <div className="mt-8">
              <AnalysisResult result={state.result} />
          </div>
        )}
    </div>
  );
}
