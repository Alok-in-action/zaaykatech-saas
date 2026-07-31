"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const Logos3 = ({
  heading = "Trusted by leading Cafe & Restaurants",
  logos = [
    {
      id: "logo-1",
      description: "Logo 1",
      image: "https://placehold.co/150x50.png",
      className: "h-8 w-auto",
    },
    {
      id: "logo-2",
      description: "Logo 2",
      image: "https://placehold.co/150x50.png",
      className: "h-8 w-auto",
    },
    {
      id: "logo-3",
      description: "Logo 3",
      image: "https://placehold.co/150x50.png",
      className: "h-8 w-auto",
    },
    {
      id: "logo-4",
      description: "Logo 4",
      image: "https://placehold.co/150x50.png",
      className: "h-8 w-auto",
    },
    {
      id: "logo-5",
      description: "Logo 5",
      image: "https://placehold.co/150x50.png",
      className: "h-8 w-auto",
    },
    {
      id: "logo-6",
      description: "Logo 6",
      image: "https://placehold.co/150x50.png",
      className: "h-8 w-auto",
    },
    {
      id: "logo-7",
      description: "Logo 7",
      image: "https://placehold.co/150x50.png",
      className: "h-8 w-auto",
    },
    {
      id: "logo-8",
      description: "Logo 8",
      image: "https://placehold.co/150x50.png",
      className: "h-8 w-auto",
    },
  ],
}: Logos3Props) => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container flex flex-col items-center text-center">
        <h3 className="text-xl text-muted-foreground font-semibold mb-8">
          {heading}
        </h3>
      </div>
      <div className="pt-4">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[AutoScroll({ playOnInit: true, speed: 1 })]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-10 flex shrink-0 items-center justify-center">
                    <div>
                      <img
                        src={logo.image}
                        alt={logo.description}
                        className={`${logo.className} opacity-60 hover:opacity-100 transition-opacity`}
                        data-ai-hint="logo"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-secondary/30 to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-secondary/30 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export { Logos3 };
