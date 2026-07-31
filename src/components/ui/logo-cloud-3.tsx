import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

type Logo = {
    src?: string;
    alt: string;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
    logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
    return (
        <div
            {...props}
            className={cn(
                "overflow-hidden py-10 [mask-image:linear-gradient(to_right,transparent,black,transparent)]",
                className
            )}
        >
            <InfiniteSlider gap={60} reverse duration={30} durationOnHover={60}>
                {logos.map((logo) => (
                    <span
                        key={`logo-${logo.alt}`}
                        className="text-muted-foreground/50 hover:text-primary transition-all duration-500 font-headline font-bold text-2xl md:text-4xl whitespace-nowrap cursor-default px-8 py-2 italic tracking-tight"
                    >
                        {logo.alt}
                    </span>
                ))}
            </InfiniteSlider>
        </div>
    );
}
