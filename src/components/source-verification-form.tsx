'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { handleSourceVerification, SourceVerificationState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import VerificationResult from './verification-result';
import { useToast } from '@/hooks/use-toast';

const initialState: SourceVerificationState = {
  form: {
    sourceName: '',
  }
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full h-12 text-lg" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
      Xác minh
    </Button>
  );
}

export default function SourceVerificationForm() {
  const [state, formAction] = useFormState(handleSourceVerification, initialState);
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
              <CardTitle>Xác minh Nguồn tin</CardTitle>
              <CardDescription>
                Nhập tên một hãng tin hoặc tổ chức để kiểm tra độ uy tín.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sourceName">Tên Nguồn tin</Label>
                <Input
                  id="sourceName"
                  name="sourceName"
                  placeholder="Ví dụ: Reuters, BBC News,..."
                  required
                  defaultValue={state.form.sourceName}
                />
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>
        
        {state.result && (
            <div className="mt-8">
                <VerificationResult result={state.result} />
            </div>
        )}
    </div>
  );
}
