import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContentAnalysisForm from '@/components/content-analysis-form';
import SourceVerificationForm from '@/components/source-verification-form';
import { FileText, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
          Kiểm tra Tin tức, Nâng cao Tin cậy
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Sử dụng công nghệ AI tiên tiến để phân tích và xác minh tính xác thực của nội dung trên mạng xã hội.
        </p>
      </div>

      <Tabs defaultValue="content-analysis" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="content-analysis" className="text-base">
            <FileText className="mr-2 h-5 w-5" />
            Phân tích Nội dung
          </TabsTrigger>
          <TabsTrigger value="source-verification" className="text-base">
            <ShieldCheck className="mr-2 h-5 w-5" />
            Xác minh Nguồn
          </TabsTrigger>
        </TabsList>
        <TabsContent value="content-analysis" className="mt-6">
            <ContentAnalysisForm />
        </TabsContent>
        <TabsContent value="source-verification" className="mt-6">
            <SourceVerificationForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
