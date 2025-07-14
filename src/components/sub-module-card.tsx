import type { SubModule } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlayCircle, FileText, Puzzle, CircleCheck } from 'lucide-react';

type SubModuleCardProps = {
  subModule: SubModule;
};

const getIcon = (type: SubModule['type'], status: SubModule['status']) => {
  const iconProps = { className: "h-8 w-8 shrink-0" };
  if (status === 'completed') {
    return <CircleCheck {...iconProps} className={`${iconProps.className} text-green-600`} />;
  }
  const colorClass = "text-muted-foreground";
  switch (type) {
    case 'video':
      return <PlayCircle {...iconProps} className={`${iconProps.className} ${colorClass}`} />;
    case 'epub':
      return <FileText {...iconProps} className={`${iconProps.className} ${colorClass}`} />;
    case 'plugin':
      return <Puzzle {...iconProps} className={`${iconProps.className} ${colorClass}`} />;
    default:
      return null;
  }
};

const SubModuleCard = ({ subModule }: SubModuleCardProps) => {
  const hasFooter = subModule.status === 'in-progress';

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-1 items-center gap-4">
            {getIcon(subModule.type, subModule.status)}
            <CardTitle className="font-headline text-lg font-semibold leading-tight">
              {subModule.title}
            </CardTitle>
          </div>
          <Badge variant="secondary">~{subModule.duration} min</Badge>
        </div>
      </CardHeader>
      {hasFooter && (
        <CardFooter>
          <Button variant="outline" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Resume</Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default SubModuleCard;
