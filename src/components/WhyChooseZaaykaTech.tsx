"use client";
import { motion } from "framer-motion";
import {
    Smartphone,
    ShieldCheck,
    RefreshCw,
    Palette,
    Share2,
    BadgeDollarSign,
    Check,
    X,
    Minus,
} from "lucide-react";
import { FeatureWithImageComparison } from "@/components/ui/feature-with-image-comparison";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const features = [
    {
        Icon: Smartphone,
        name: "Modern Customer Experience",
        description: "Provide customers with a sleek, modern way to view your menu on any device.",
        href: "#features",
        cta: "Learn more",
        background: null,
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
        Icon: ShieldCheck,
        name: "Contactless & Hygienic",
        description: "Eliminate shared touchpoints with 100% contactless menu viewing.",
        href: "#features",
        cta: "Learn more",
        background: null,
        className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
        Icon: RefreshCw,
        name: "Easy Menu Updates",
        description: "Update your menu items and prices instantly without reprinting costs.",
        href: "#features",
        cta: "Learn more",
        background: null,
        className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
    },
    {
        Icon: Palette,
        name: "Brand-Matched Design",
        description: "Every menu website is fully customized to match your restaurant's brand.",
        href: "#features",
        cta: "Learn more",
        background: null,
        className: "lg:col-start-2 lg:col-end-4 lg:row-start-2 lg:row-end-3",
    },
    {
        Icon: Share2,
        name: "Social Media Sharing",
        description: "Customers can easily share your menu with friends and family.",
        href: "#features",
        cta: "Learn more",
        background: null,
        className: "lg:col-start-1 lg:col-end-3 lg:row-start-3 lg:row-end-4",
    },
    {
        Icon: BadgeDollarSign,
        name: "Affordable Annual Pricing",
        description: "Simple yearly pricing with no hidden fees or monthly subscriptions.",
        href: "#features",
        cta: "Learn more",
        background: null,
        className: "lg:col-start-3 lg:col-end-4 lg:row-start-3 lg:row-end-4",
    },
];

type Status = "yes" | "no" | "partial";

interface CompareRow {
    feature: string;
    traditional?: Status;
    traditionalNote?: string;
    zaaykatech: Status;
    zaaykatechNote?: string;
    pdf?: Status;
    pdfNote?: string;
}

const vsTraditional: CompareRow[] = [
    {
        feature: "Cost of Updates",
        traditional: "no",
        traditionalNote: "High (Reprints)",
        zaaykatech: "yes",
        zaaykatechNote: "2 free yearly updates",
    },
    {
        feature: "Hygiene",
        traditional: "no",
        traditionalNote: "Shared Touchpoints",
        zaaykatech: "yes",
        zaaykatechNote: "100% Contactless",
    },
    {
        feature: "Visual Appeal",
        traditional: "partial",
        traditionalNote: "Static",
        zaaykatech: "yes",
        zaaykatechNote: "Responsive, Interactive",
    },
    {
        feature: "Brand Customization",
        traditional: "no",
        traditionalNote: "Limited",
        zaaykatech: "yes",
        zaaykatechNote: "Fully on-theme design",
    },
    {
        feature: "Easy Sharing",
        traditional: "no",
        traditionalNote: "Not Possible",
        zaaykatech: "yes",
        zaaykatechNote: "Share via WhatsApp or Link",
    },
];

const vsPdf: CompareRow[] = [
    {
        feature: "File Size & Loading",
        pdf: "no",
        pdfNote: "Large files, slow loading",
        zaaykatech: "yes",
        zaaykatechNote: "Fast, optimized loading",
    },
    {
        feature: "Mobile Experience",
        pdf: "no",
        pdfNote: "Poor zoom/scroll experience",
        zaaykatech: "yes",
        zaaykatechNote: "Perfect mobile optimization",
    },
    {
        feature: "Search Functionality",
        pdf: "no",
        pdfNote: "Limited or no search",
        zaaykatech: "yes",
        zaaykatechNote: "Easy item search & filtering",
    },
    {
        feature: "Updates",
        pdf: "partial",
        pdfNote: "Replace entire file",
        zaaykatech: "yes",
        zaaykatechNote: "Instant live updates",
    },
    {
        feature: "Accessibility",
        pdf: "no",
        pdfNote: "Poor screen reader support",
        zaaykatech: "yes",
        zaaykatechNote: "Fully accessible design",
    },
    {
        feature: "Analytics",
        pdf: "no",
        pdfNote: "No usage insights",
        zaaykatech: "yes",
        zaaykatechNote: "Detailed menu analytics",
    },
];

function StatusIcon({ status }: { status: Status }) {
    if (status === "yes")
        return (
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Check className="w-5 h-5" strokeWidth={3} />
            </div>
        );
    if (status === "no")
        return (
            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 dark:text-red-400">
                <X className="w-5 h-5" strokeWidth={3} />
            </div>
        );
    return (
        <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-500 dark:text-amber-400">
            <Minus className="w-5 h-5" strokeWidth={3} />
        </div>
    );
}

function CompareTable({
    rows,
    colA,
    colAKey,
    noteAKey,
}: {
    rows: CompareRow[];
    colA: string;
    colAKey: "traditional" | "pdf";
    noteAKey: "traditionalNote" | "pdfNote";
}) {
    return (
        <div className="overflow-hidden rounded-3xl border border-border bg-background/50 backdrop-blur-md shadow-xl">
            <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-sm border-collapse min-w-[500px] md:min-w-full">
                    <thead>
                        <tr className="bg-muted/30 border-b border-border">
                            <th className="text-left px-4 md:px-6 py-5 font-bold text-foreground text-[10px] md:text-sm uppercase tracking-wider">
                                Feature
                            </th>
                            <th className="px-4 md:px-6 py-5 font-bold text-muted-foreground text-center text-[10px] md:text-sm uppercase tracking-wider">
                                {colA}
                            </th>
                            <th className="px-4 md:px-6 py-5 font-bold text-primary text-center text-[10px] md:text-sm uppercase tracking-wider bg-primary/5">
                                ZaaykaTech QR
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {rows.map((row) => (
                            <tr
                                key={row.feature}
                                className="hover:bg-muted/20 transition-colors group"
                            >
                                <td className="px-4 md:px-6 py-4 font-semibold text-foreground align-middle text-xs md:text-sm">
                                    {row.feature}
                                </td>
                                <td className="px-4 md:px-6 py-4 text-center align-middle">
                                    <div className="flex flex-col items-center gap-1.5">
                                        {row[colAKey] ? (
                                            <StatusIcon status={row[colAKey] as Status} />
                                        ) : (
                                            <span className="text-muted-foreground text-xs">—</span>
                                        )}
                                        {row[noteAKey] && (
                                            <span className="text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-tight">
                                                {row[noteAKey]}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-4 md:px-6 py-4 text-center align-middle bg-primary/[0.02] group-hover:bg-primary/[0.04]">
                                    <div className="flex flex-col items-center gap-1.5">
                                        <StatusIcon status={row.zaaykatech} />
                                        {row.zaaykatechNote && (
                                            <span className="text-[10px] md:text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tight">
                                                {row.zaaykatechNote}
                                            </span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function WhyChooseZaaykaTech() {
    const [compareMode, setCompareMode] = useState<"traditional" | "pdf">("traditional");

    return (
        <section id="features" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
                            Why Us
                        </p>
                        <h2 className="text-3xl md:text-5xl font-bold font-headline tracking-tight mb-4">
                            Why Choose ZaaykaTech?
                        </h2>
                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                            Transform your restaurant&apos;s menu experience with our
                            comprehensive digital solution.
                        </p>
                    </motion.div>
                </div>

                {/* Feature Cards with Bento Grid */}
                <div className="mb-24">
                    <BentoGrid className="lg:grid-rows-3">
                        {features.map((feature) => (
                            <BentoCard key={feature.name} {...feature} />
                        ))}
                    </BentoGrid>
                </div>

                {/* Image Comparison Slider */}
                <div className="mb-24 max-w-4xl mx-auto">
                    <FeatureWithImageComparison
                        badge="See the Difference"
                        title="Digital vs Traditional Menu"
                        description="Drag the slider to compare a traditional paper menu with ZaaykaTech's modern, interactive digital menu experience."
                        beforeImage={{
                            src: "/desktop/menu.png",
                            alt: "Traditional paper menu at restaurant",
                        }}
                        afterImage={{
                            src: "/desktop/qr.png",
                            alt: "Modern digital QR menu on phone",
                        }}
                        beforeLabel="Traditional Menu"
                        afterLabel="ZaaykaTech QR"
                    />
                </div>

                {/* Comparison Section with Toggle */}
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl md:text-4xl font-bold font-headline mb-6 tracking-tight">
                            The Modern Digital Advantage
                        </h3>

                        {/* Toggle Control */}
                        <div className="inline-flex p-1 bg-muted rounded-full border border-border">
                            <button
                                onClick={() => setCompareMode("traditional")}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 relative",
                                    compareMode === "traditional" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {compareMode === "traditional" && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-primary rounded-full pointer-events-none"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">vs Traditional</span>
                            </button>
                            <button
                                onClick={() => setCompareMode("pdf")}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 relative",
                                    compareMode === "pdf" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {compareMode === "pdf" && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-primary rounded-full pointer-events-none"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">vs PDF Menu</span>
                            </button>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={compareMode}
                            initial={{ opacity: 0, x: compareMode === "traditional" ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: compareMode === "traditional" ? 20 : -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {compareMode === "traditional" ? (
                                <CompareTable
                                    rows={vsTraditional}
                                    colA="Traditional Menu"
                                    colAKey="traditional"
                                    noteAKey="traditionalNote"
                                />
                            ) : (
                                <CompareTable
                                    rows={vsPdf}
                                    colA="PDF Menu"
                                    colAKey="pdf"
                                    noteAKey="pdfNote"
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
