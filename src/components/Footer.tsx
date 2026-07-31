'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Facebook, Youtube, Linkedin, Instagram, Twitter, Github } from 'lucide-react';
import Logo from './Logo';
import Link from 'next/link';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Product',
		links: [
			{ title: 'Features', href: '#features' },
			{ title: 'Pricing', href: '/pricing' },
			{ title: 'Testimonials', href: '#testimonials' },
			{ title: 'Demo', href: '#demo' },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'About Us', href: '#' },
			{ title: 'Contact', href: '#contact' },
			{ title: 'Privacy Policy', href: '#' },
			{ title: 'Terms of Services', href: '#' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'Blog', href: '#' },
			{ title: 'Changelog', href: '#' },
			{ title: 'Brand', href: '#' },
			{ title: 'Help', href: '#' },
		],
	},
	{
		label: 'Social Links',
		links: [
			{ title: 'Facebook', href: '#', icon: Facebook },
			{ title: 'Instagram', href: '#', icon: Instagram },
			{ title: 'Youtube', href: '#', icon: Youtube },
			{ title: 'LinkedIn', href: '#', icon: Linkedin },
            { title: 'Twitter', href: '#', icon: Twitter },
            { title: 'Github', href: '#', icon: Github },
		],
	},
];

const Footer = () => {
	return (
		<footer className="bg-secondary/30 text-card-foreground">
			<div className="container mx-auto px-4 py-12 lg:py-16">
				<div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
					<AnimatedContainer className="space-y-4">
						<Logo />
						<p className="text-muted-foreground mt-4 text-sm md:mt-0 max-w-xs">
                            Revolutionizing the dining experience with smart technology.
						</p>
                        <p className="text-muted-foreground mt-8 text-sm md:mt-0">
						    © {new Date().getFullYear()} ZaaykaTech. All rights reserved.
					    </p>
					</AnimatedContainer>

					<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
						{footerLinks.map((section, index) => (
							<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
								<div className="mb-10 md:mb-0">
									<h3 className="text-sm font-headline font-bold mb-4">{section.label}</h3>
									<ul className="text-muted-foreground mt-4 space-y-3 text-sm">
										{section.links.map((link) => (
											<li key={link.title}>
												<Link
													href={link.href}
													className="hover:text-primary inline-flex items-center transition-all duration-300"
												>
													{link.icon && <link.icon className="me-2 size-4" />}
													{link.title}
												</Link>
											</li>
										))}
									</ul>
								</div>
							</AnimatedContainer>
						))}
					</div>
				</div>
            </div>
		</footer>
	);
};

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', y: 8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', y: 0, opacity: 1 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ delay, duration: 0.5, ease: "easeOut" }}
			className={className}
		>
			{children}
		</motion.div>
	);
};

export default Footer;
