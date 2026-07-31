'use client';

import React from 'react';
import { motion } from "framer-motion";

// --- Types ---
interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
  dataAiHint: string;
}

// --- Data ---
const testimonials: Testimonial[] = [
  {
    text: "ZaaykaTech has revolutionized our service. Orders are faster, more accurate, and our customers love the modern experience. It's a must-have for any restaurant.",
    image: "https://placehold.co/150x150.png",
    name: "Briana Patton",
    role: "Owner, Curry & Co.",
    dataAiHint: "woman portrait"
  },
  {
    text: "The room service ordering system is brilliant. It has reduced call volumes and improved order accuracy. Our guests appreciate the convenience.",
    image: "https://placehold.co/150x150.png",
    name: "Bilal Ahmed",
    role: "Manager, The Grand Hotel",
    dataAiHint: "man portrait"
  },
  {
    text: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.",
    image: "https://placehold.co/150x150.png",
    name: "Saman Malik",
    role: "Customer Support Lead",
    dataAiHint: "woman portrait"
  },
  {
    text: "This ERP's seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.",
    image: "https://placehold.co/150x150.png",
    name: "Omar Raza",
    role: "CEO, FoodChain",
    dataAiHint: "man portrait"
  },
  {
    text: "Its robust features and quick support have transformed our workflow, making us significantly more efficient.",
    image: "https://placehold.co/150x150.png",
    name: "Zainab Hussain",
    role: "Project Manager",
    dataAiHint: "woman portrait"
  },
  {
    text: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.",
    image: "https://placehold.co/150x150.png",
    name: "Aliza Khan",
    role: "Business Analyst",
    dataAiHint: "woman portrait"
  },
  {
    text: "Our business functions improved with a user-friendly design and positive customer feedback.",
    image: "https://placehold.co/150x150.png",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
    dataAiHint: "man portrait"
  },
  {
    text: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.",
    image: "https://placehold.co/150x150.png",
    name: "Sana Sheikh",
    role: "Sales Manager",
    dataAiHint: "woman portrait"
  },
  {
    text: "Using this ERP, our online presence and conversions significantly improved, boosting business performance.",
    image: "https://placehold.co/150x150.png",
    name: "Hassan Ali",
    role: "E-commerce Manager",
    dataAiHint: "man portrait"
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Sub-Components ---
const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role, dataAiHint }, i) => (
                <motion.li
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  whileFocus={{
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  className="p-10 rounded-3xl border border-border bg-card shadow-lg shadow-black/5 max-w-xs w-full transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <blockquote className="m-0 p-0">
                    <p className="text-muted-foreground leading-relaxed font-normal m-0 transition-colors duration-300">
                      {text}
                    </p>
                    <footer className="flex items-center gap-3 mt-6">
                      <div className="flex flex-col">
                        <cite className="font-semibold not-italic tracking-tight leading-5 text-card-foreground transition-colors duration-300">
                          {name}
                        </cite>
                        <span className="text-sm leading-5 tracking-tight text-muted-foreground mt-0.5 transition-colors duration-300">
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

const TestimonialsV2 = () => {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-background py-12 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 }
        }}
        className="container px-4 z-10 mx-auto"
      >
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16">
          <div className="flex justify-center">
            <div className="border border-border py-1 px-4 rounded-full text-xs font-semibold tracking-wide uppercase text-muted-foreground bg-secondary/50">
              Loved by Restaurants and Hotels
            </div>
          </div>

          <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight mt-6 text-center text-foreground transition-colors">
            What our users say
          </h2>
          <p className="text-center mt-5 text-muted-foreground text-lg leading-relaxed max-w-sm transition-colors">
            Discover how thousands of teams streamline their operations with our platform.
          </p>
        </div>

        <div
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsV2;
