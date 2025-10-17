'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BadgeCheck, ShieldAlert, ShieldX } from 'lucide-react';
import type { VerifyInformationSourceOutput } from '@/ai/flows/verify-information-source';

type ReputationStatus = 'Reputable' | 'NotReputable' | 'Mixed';

interface ReputationDisplay {
  icon: React.ReactNode;
  title: string;
  colorClass: string;
  scoreColor: string;
  description: string;
}

export default function VerificationResult({ result }: { result: VerifyInformationSourceOutput }) {
  const { reputationScore, reason } = result;

  let status: ReputationStatus;
  if (reputationScore > 75) {
    status = 'Reputable';
  } else if (reputationScore < 40) {
    status = 'NotReputable';
  } else {
    status = 'Mixed';
  }

  const reputationDisplayMap: Record<ReputationStatus, ReputationDisplay> = {
    Reputable: {
      icon: <BadgeCheck className="h-10 w-10 text-emerald-500" />,
      title: 'Nguồn Uy tín',
      colorClass: 'border-emerald-500/80 bg-emerald-500/5',
      scoreColor: 'text-emerald-500',
      description: 'Nguồn này thường được coi là đáng tin cậy và tuân thủ các tiêu chuẩn báo chí nghiêm ngặt.'
    },
    NotReputable: {
      icon: <ShieldX className="h-10 w-10 text-destructive" />,
      title: 'Nguồn không đáng tin cậy',
      colorClass: 'border-destructive/80 bg-destructive/5',
      scoreColor: 'text-destructive',
      description: 'Nguồn này có tiền sử đăng tải thông tin sai lệch hoặc không được xác thực. Cần hết sức thận trọng.'
    },
    Mixed: {
      icon: <ShieldAlert className="h-10 w-10 text-orange-500" />,
      title: 'Độ uy tín Trung bình/Hỗn hợp',
      colorClass: 'border-orange-500/80 bg-orange-500/5',
      scoreColor: 'text-orange-500',
      description: 'Nguồn này có thể có một số thành kiến hoặc độ tin cậy không nhất quán. Cần kiểm tra chéo thông tin.'
    },
  };

  const display = reputationDisplayMap[status];

  return (
    <Card className={`transition-all duration-500 animate-in fade-in-0 zoom-in-95 ${display.colorClass}`}>
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
        {display.icon}
        <div className="flex-1">
          <CardTitle className="text-2xl">{display.title}</CardTitle>
          <CardDescription className="mt-1">{display.description}</CardDescription>
        </div>
        <div className="text-center">
            <div className={`font-bold text-4xl ${display.scoreColor}`}>{reputationScore}</div>
            <div className="text-xs text-muted-foreground">/ 100</div>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2 text-foreground/90">Lý giải chi tiết:</h3>
        <div className="text-sm bg-background/50 p-4 rounded-md border text-foreground/80">
            {reason}
        </div>
      </CardContent>
    </Card>
  );
}
