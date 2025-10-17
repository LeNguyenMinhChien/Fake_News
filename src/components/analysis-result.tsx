'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  BrainCircuit,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import type { AnalyzeSocialContentOutput } from '@/ai/flows/analyze-social-content';

type ResultStatus = 'Authentic' | 'Misinformation' | 'Uncertain';

interface ResultDisplay {
  icon: React.ReactNode;
  title: string;
  colorClass: string;
  description: string;
}

export default function AnalysisResult({
  result,
}: {
  result: AnalyzeSocialContentOutput;
}) {
  const { isMisinformation, confidenceScore, reasoning } = result;

  let status: ResultStatus;
  if (confidenceScore < 0.7) {
    status = 'Uncertain';
  } else {
    status = isMisinformation ? 'Misinformation' : 'Authentic';
  }

  const resultDisplayMap: Record<ResultStatus, ResultDisplay> = {
    Misinformation: {
      icon: <XCircle className="h-10 w-10 text-destructive" />,
      title: 'Khả năng cao là Tin giả',
      colorClass: 'border-destructive/80 bg-destructive/5',
      description: 'Nội dung này có các dấu hiệu của thông tin sai lệch hoặc lừa đảo.',
    },
    Authentic: {
      icon: <CheckCircle2 className="h-10 w-10 text-emerald-500" />,
      title: 'Có vẻ Đáng tin cậy',
      colorClass: 'border-emerald-500/80 bg-emerald-500/5',
      description: 'Nội dung này dường như không chứa thông tin sai lệch rõ ràng.',
    },
    Uncertain: {
      icon: <AlertTriangle className="h-10 w-10 text-orange-500" />,
      title: 'Không chắc chắn',
      colorClass: 'border-orange-500/80 bg-orange-500/5',
      description: 'Chúng tôi không thể xác định chắc chắn. Hãy thận trọng và kiểm tra thêm.',
    },
  };

  const display = resultDisplayMap[status];

  return (
    <Card className={`transition-all duration-500 animate-in fade-in-0 zoom-in-95 ${display.colorClass}`}>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
        {display.icon}
        <div className="flex-1">
          <CardTitle className="text-2xl">{display.title}</CardTitle>
          <CardDescription>{display.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold flex items-center gap-2 text-foreground/90">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Độ tin cậy
                </h3>
                <span className="font-bold text-lg text-primary">
                    {Math.round(confidenceScore * 100)}%
                </span>
            </div>
            <Progress value={confidenceScore * 100} className="h-2" />
            <p className="text-xs text-muted-foreground">
                Mức độ tin cậy của AI trong việc đánh giá này.
            </p>
        </div>
        <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2 text-foreground/90">
                <BrainCircuit className="h-5 w-5 text-primary" />
                Lý giải của AI
            </h3>
            <div className="text-sm bg-background/50 p-4 rounded-md border text-foreground/80">
                {reasoning}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
