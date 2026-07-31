"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MorphingText } from "./morphing-text";

interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: React.ReactNode | string[];
  description: string;
  images: string[];
  imageLinks?: (string | null)[];
  className?: string;
}

export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  title,
  description,
  images,
  imageLinks,
  className,
}) => {
  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  const duplicatedImages = [...images, ...images];

  return (
    <section
      className={cn(
        "relative w-full min-h-screen md:h-screen overflow-hidden bg-background flex flex-col items-center justify-start text-center px-4 pt-28 md:pt-32",
        className
      )}
    >
      <div className="z-10 flex flex-col items-center w-full max-w-5xl pb-[36vh] md:pb-[40vh]">

        {/* ZaaykaTech Brand Name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-4"
        >
          <span className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-foreground select-none font-headline leading-none">
            ZaaykaTech
          </span>
        </motion.div>

        {/* Tagline pill */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          className="mb-4 inline-block rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs md:text-sm font-medium text-muted-foreground backdrop-blur-sm"
        >
          {tagline}
        </motion.div>

        <div className="w-full">
          {Array.isArray(title) ? (
            <div className="flex justify-center items-center -mt-4 mb-2">
              <MorphingText
                texts={title}
                className="text-foreground font-bold tracking-tighter !text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl !h-12 sm:!h-16 md:!h-20 lg:!h-24 w-full"
              />
            </div>
          ) : (
            <motion.h1
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-foreground leading-[1.1] text-center"
            >
              {typeof title === 'string' ? (
                title.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    variants={FADE_IN_ANIMATION_VARIANTS}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))
              ) : (
                title
              )}
            </motion.h1>
          )}
        </div>

        <motion.p
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.5 }}
          className="mt-4 max-w-xl text-sm md:text-base text-muted-foreground px-4 text-center"
        >
          {description}
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[30vh] md:h-2/5 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] pointer-events-none">
        <motion.div
          className="flex gap-4"
          animate={{
            x: ["-100%", "0%"],
            transition: {
              ease: "linear",
              duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 40,
              repeat: Infinity,
            },
          }}
        >
          {duplicatedImages.map((src, index) => {
            const originalIndex = index % images.length;
            const link = imageLinks?.[originalIndex];
            const imgEl = (
              <img
                src={src}
                alt={`Showcase image ${originalIndex + 1}`}
                className="w-full h-full object-cover object-top rounded-2xl shadow-md border border-white/10"
              />
            );
            return (
              <div
                key={index}
                className="relative aspect-[3/4] h-40 md:h-72 flex-shrink-0"
                style={{ rotate: `${(index % 2 === 0 ? -2 : 5)}deg` }}
              >
                {link ? (
                  <a href={link} target="_blank" rel="noopener noreferrer" className="block w-full h-full pointer-events-auto">
                    {imgEl}
                  </a>
                ) : (
                  imgEl
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};