"use client";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { GripVertical } from "lucide-react";

interface FeatureWithImageComparisonProps {
    badge?: string;
    title?: string;
    description?: string;
    beforeImage: { src: string; alt: string };
    afterImage: { src: string; alt: string };
    beforeLabel?: string;
    afterLabel?: string;
}

function FeatureWithImageComparison({
    badge = "Platform",
    title = "See the Difference",
    description = "Drag the slider to compare traditional vs digital menus.",
    beforeImage,
    afterImage,
    beforeLabel = "Before",
    afterLabel = "After",
}: FeatureWithImageComparisonProps) {
    const [inset, setInset] = useState<number>(50);
    const containerRef = useRef<HTMLDivElement>(null);

    const calcPercent = useCallback((clientX: number) => {
        if (!containerRef.current) return 50;
        const { left, width } = containerRef.current.getBoundingClientRect();
        return Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
    }, []);

    /* ── Pointer capture: smooth drag on any device ── */
    const handlePointerDown = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            setInset(calcPercent(e.clientX));
        },
        [calcPercent]
    );

    const handlePointerMove = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
            setInset(calcPercent(e.clientX));
        },
        [calcPercent]
    );

    const handlePointerUp = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            e.currentTarget.releasePointerCapture(e.pointerId);
        },
        []
    );

    return (
        <div className="w-full">
            <div className="flex flex-col gap-4">
                <div>
                    <Badge variant="outline">{badge}</Badge>
                </div>
                <div className="flex gap-2 flex-col">
                    <h3 className="text-2xl md:text-3xl tracking-tighter font-bold">{title}</h3>
                    <p className="text-base leading-relaxed tracking-tight text-muted-foreground">
                        {description}
                    </p>
                </div>

                <div className="pt-4 w-full">
                    {/* Comparison image area */}
                    <div
                        ref={containerRef}
                        className="relative aspect-video w-full overflow-hidden rounded-2xl select-none cursor-ew-resize touch-none"
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerUp}
                    >
                        {/* Corner labels */}
                        <div className="absolute top-3 left-3 z-30 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm pointer-events-none">
                            {beforeLabel}
                        </div>
                        <div className="absolute top-3 right-3 z-30 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm pointer-events-none">
                            {afterLabel}
                        </div>

                        {/* Divider line */}
                        <div
                            className="absolute top-0 h-full w-0.5 bg-white/90 z-20 shadow-lg pointer-events-none"
                            style={{ left: `${inset}%`, transition: "left 0ms" }}
                        >
                            {/* Handle */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-xl w-9 h-9 flex items-center justify-center border border-border">
                                <GripVertical className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>

                        {/* After image — always visible underneath */}
                        <Image
                            src={afterImage.src}
                            alt={afterImage.alt}
                            fill
                            priority
                            draggable={false}
                            className="absolute inset-0 w-full h-full object-cover rounded-2xl select-none"
                        />

                        {/* Before image — clipped to left side */}
                        <Image
                            src={beforeImage.src}
                            alt={beforeImage.alt}
                            fill
                            priority
                            draggable={false}
                            className="absolute inset-0 w-full h-full object-cover rounded-2xl select-none z-10"
                            style={{ clipPath: `inset(0 ${100 - inset}% 0 0)` }}
                        />
                    </div>

                    {/* Mobile range slider */}
                    <div className="mt-4 md:hidden">
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={inset}
                            onChange={(e) => setInset(Number(e.target.value))}
                            className="w-full accent-primary cursor-pointer"
                            aria-label="Comparison slider"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1 px-1">
                            <span>← {beforeLabel}</span>
                            <span>{afterLabel} →</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { FeatureWithImageComparison };
