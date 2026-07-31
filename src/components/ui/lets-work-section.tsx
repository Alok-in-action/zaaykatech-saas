"use client"

import type React from "react"
import { useState } from "react"
import { ArrowUpRight, Calendar } from "lucide-react"

export function LetsWorkTogether() {
    const [isHovered, setIsHovered] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [isButtonHovered, setIsButtonHovered] = useState(false)

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsClicked(true)

        setTimeout(() => {
            setShowSuccess(true)
        }, 500)
    }

    const handleBookCall = () => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            window.location.href = "tel:+917000703701"
        } else {
            window.open("https://cal.com/zaaykatech/15min", "_blank")
        }
    }

    return (
        <section id="contact" className="flex min-h-[80vh] items-center justify-center px-6 py-20 bg-background overflow-hidden">
            <div className="relative flex flex-col items-center gap-12 w-full max-w-6xl">
                <div
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                    style={{
                        opacity: showSuccess ? 1 : 0,
                        transform: showSuccess ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                        pointerEvents: showSuccess ? "auto" : "none",
                    }}
                >
                    {/* Elegant heading */}
                    <div className="flex flex-col items-center gap-2">
                        <span
                            className="text-xs font-bold tracking-[0.3em] uppercase text-primary transition-all duration-500"
                            style={{
                                transform: showSuccess ? "translateY(0)" : "translateY(10px)",
                                opacity: showSuccess ? 1 : 0,
                                transitionDelay: "100ms",
                            }}
                        >
                            Perfect
                        </span>
                        <h3
                            className="text-3xl font-bold font-headline tracking-tight text-foreground transition-all duration-500 sm:text-5xl"
                            style={{
                                transform: showSuccess ? "translateY(0)" : "translateY(10px)",
                                opacity: showSuccess ? 1 : 0,
                                transitionDelay: "200ms",
                            }}
                        >
                            Let&apos;s talk
                        </h3>
                    </div>

                    {/* Book a call button */}
                    <button
                        onClick={handleBookCall}
                        onMouseEnter={() => setIsButtonHovered(true)}
                        onMouseLeave={() => setIsButtonHovered(false)}
                        className="group relative flex items-center gap-4 transition-all duration-500 cursor-pointer"
                        style={{
                            transform: showSuccess
                                ? isButtonHovered
                                    ? "translateY(0) scale(1.02)"
                                    : "translateY(0) scale(1)"
                                : "translateY(15px) scale(1)",
                            opacity: showSuccess ? 1 : 0,
                            transitionDelay: "150ms",
                        }}
                    >
                        {/* Left line */}
                        <div
                            className="h-px w-8 bg-border transition-all duration-500 sm:w-16"
                            style={{
                                transform: isButtonHovered ? "scaleX(0)" : "scaleX(1)",
                                opacity: isButtonHovered ? 0 : 0.5,
                            }}
                        />

                        {/* Button content */}
                        <div
                            className="relative flex items-center gap-3 overflow-hidden rounded-full border px-8 py-4 transition-all duration-500 sm:px-10 sm:py-5"
                            style={{
                                borderColor: isButtonHovered ? "var(--primary)" : "var(--border)",
                                backgroundColor: isButtonHovered ? "var(--primary)" : "transparent",
                                boxShadow: isButtonHovered ? "0 0 30px rgba(59,130,246,0.2), 0 10px 40px rgba(0,0,0,0.08)" : "none",
                            }}
                        >
                            <Calendar
                                className="size-5 transition-all duration-500 sm:size-6"
                                strokeWidth={1.5}
                                style={{
                                    color: isButtonHovered ? "white" : "var(--foreground)",
                                }}
                            />
                            <span
                                className="text-base font-bold tracking-wide transition-all duration-500 sm:text-lg"
                                style={{
                                    color: isButtonHovered ? "white" : "var(--foreground)",
                                }}
                            >
                                Book a call
                            </span>
                            <ArrowUpRight
                                className="size-5 transition-all duration-500 sm:size-6"
                                strokeWidth={1.5}
                                style={{
                                    color: isButtonHovered ? "white" : "var(--foreground)",
                                    transform: isButtonHovered ? "translate(3px, -3px) scale(1.1)" : "translate(0, 0) scale(1)",
                                }}
                            />
                        </div>

                        {/* Right line */}
                        <div
                            className="h-px w-8 bg-border transition-all duration-500 sm:w-16"
                            style={{
                                transform: isButtonHovered ? "scaleX(0)" : "scaleX(1)",
                                opacity: isButtonHovered ? 0 : 0.5,
                            }}
                        />
                    </button>

                    {/* Subtle subtext */}
                    <span
                        className="text-xs tracking-widest uppercase text-muted-foreground/60 transition-all duration-500 font-semibold"
                        style={{
                            transform: showSuccess ? "translateY(0)" : "translateY(10px)",
                            opacity: showSuccess ? 1 : 0,
                            transitionDelay: "450ms",
                        }}
                    >
                        15 min intro call
                    </span>
                </div>

                <div
                    className="flex items-center gap-3 transition-all duration-500"
                    style={{
                        opacity: isClicked ? 0 : 1,
                        transform: isClicked ? "translateY(-20px)" : "translateY(0)",
                        pointerEvents: isClicked ? "none" : "auto",
                    }}
                >
                    <span className="relative flex size-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-sm font-bold tracking-widest uppercase text-muted-foreground">
                        Available for new projects
                    </span>
                </div>

                <div
                    className="group relative cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={(e) => handleClick(e as unknown as React.MouseEvent<HTMLDivElement>)}
                    style={{
                        pointerEvents: isClicked ? "none" : "auto",
                    }}
                >
                    <div className="flex flex-col items-center gap-8">
                        <h2
                            className="relative text-center text-6xl font-bold font-headline tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-9xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            style={{
                                opacity: isClicked ? 0 : 1,
                                transform: isClicked ? "translateY(-40px) scale(0.95)" : "translateY(0) scale(1)",
                            }}
                        >
                            <span className="block overflow-hidden pb-2">
                                <span
                                    className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                    style={{
                                        transform: isHovered && !isClicked ? "translateY(-8%)" : "translateY(0)",
                                    }}
                                >
                                    Let&apos;s work
                                </span>
                            </span>
                            <span className="block overflow-hidden pb-2">
                                <span
                                    className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75"
                                    style={{
                                        transform: isHovered && !isClicked ? "translateY(-8%)" : "translateY(0)",
                                    }}
                                >
                                    <span className="text-muted-foreground/40">together</span>
                                </span>
                            </span>
                        </h2>

                        <div className="relative mt-8 flex size-20 items-center justify-center sm:size-28">
                            <div
                                className="pointer-events-none absolute inset-0 rounded-full border-2 transition-all ease-out"
                                style={{
                                    borderColor: isClicked ? "var(--primary)" : isHovered ? "var(--primary)" : "var(--border)",
                                    backgroundColor: isClicked ? "transparent" : isHovered ? "var(--primary)" : "transparent",
                                    transform: isClicked ? "scale(3)" : isHovered ? "scale(1.1)" : "scale(1)",
                                    opacity: isClicked ? 0 : 1,
                                    transitionDuration: isClicked ? "700ms" : "500ms",
                                }}
                            />
                            <ArrowUpRight
                                className="size-8 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] sm:size-10"
                                style={{
                                    transform: isClicked
                                        ? "translate(100px, -100px) scale(0.5)"
                                        : isHovered
                                            ? "translate(2px, -2px)"
                                            : "translate(0, 0)",
                                    opacity: isClicked ? 0 : 1,
                                    color: isHovered && !isClicked ? "white" : "var(--foreground)",
                                    transitionDuration: isClicked ? "600ms" : "500ms",
                                }}
                            />
                        </div>
                    </div>

                    <div className="absolute -left-12 top-1/2 -translate-y-1/2 sm:-left-24">
                        <div
                            className="h-px w-12 bg-border transition-all duration-500 sm:w-20"
                            style={{
                                transform: isClicked ? "scaleX(0) translateX(-20px)" : isHovered ? "scaleX(1.5)" : "scaleX(1)",
                                opacity: isClicked ? 0 : isHovered ? 1 : 0.5,
                            }}
                        />
                    </div>
                    <div className="absolute -right-12 top-1/2 -translate-y-1/2 sm:-right-24">
                        <div
                            className="h-px w-12 bg-border transition-all duration-500 sm:w-20"
                            style={{
                                transform: isClicked ? "scaleX(0) translateX(20px)" : isHovered ? "scaleX(1.5)" : "scaleX(1)",
                                opacity: isClicked ? 0 : isHovered ? 1 : 0.5,
                            }}
                        />
                    </div>
                </div>

                <div
                    className="mt-12 flex flex-col items-center gap-6 text-center transition-all duration-500 delay-100"
                    style={{
                        opacity: isClicked ? 0 : 1,
                        transform: isClicked ? "translateY(20px)" : "translateY(0)",
                        pointerEvents: isClicked ? "none" : "auto",
                    }}
                >
                    <p className="max-w-lg text-lg leading-relaxed text-muted-foreground font-medium">
                        Have a project in mind? We&apos;d love to hear about it. Let&apos;s create something exceptional together.
                    </p>
                    <div className="flex flex-col gap-1 items-center">
                        <a href="mailto:zaaykatech@gmail.com" className="text-sm font-bold tracking-widest uppercase hover:text-primary transition-colors">zaaykatech@gmail.com</a>
                        <a href="tel:+917000703701" className="text-xs text-muted-foreground hover:text-primary transition-colors font-semibold tracking-widest">+91 70007 03701</a>
                    </div>
                </div>
            </div>
        </section>
    )
}
