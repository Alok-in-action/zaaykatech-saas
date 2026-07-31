import { Sparkles } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-2xl font-bold font-headline text-foreground">
      <div className="p-2 bg-primary/10 rounded-full">
        <Sparkles className="size-7 text-primary" />
      </div>
      <span>
        Zaayka<span className="text-primary">Tech</span>
      </span>
    </div>
  );
};

export default Logo;
