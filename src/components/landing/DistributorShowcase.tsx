import { useEffect, useState } from "react";
import { PackageCheck } from "lucide-react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const distributorImages = [
  "WhatsApp Image 2026-04-27 at 14.40.55 (2).jpeg",
  "WhatsApp Image 2026-04-27 at 14.40.56 (1).jpeg",
  "WhatsApp Image 2026-04-27 at 14.40.56 (3).jpeg",
  "WhatsApp Image 2026-04-27 at 14.40.57.jpeg",
  "WhatsApp Image 2026-04-27 at 14.40.58 (3).jpeg",
  "WhatsApp Image 2026-04-27 at 14.40.59.jpeg",
  "WhatsApp Image 2026-04-27 at 14.40.59 (3).jpeg",
  "WhatsApp Image 2026-04-27 at 14.41.00 (1).jpeg",
  "WhatsApp Image 2026-04-27 at 14.41.01 (2).jpeg",
  "WhatsApp Image 2026-04-27 at 14.41.01 (3).jpeg",
];

export const DistributorShowcase = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateCurrent = () => setCurrent(api.selectedScrollSnap());

    updateCurrent();
    api.on("select", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
    };
  }, [api]);

  return (
    <section className="overflow-hidden bg-gradient-soft py-16 sm:py-20">
      <div className="container-tight">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold uppercase tracking-wider text-primary shadow-sm ring-1 ring-primary/15">
            <PackageCheck className="h-4 w-4" />
            Estrutura Rio Piranhas
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-balance sm:text-4xl">
            Por dentro da distribuidora
          </h2>
          <p className="mt-3 text-muted-foreground">
            Veja um pouco do nosso estoque, mix de produtos e estrutura pronta para atender empresas e revendedores.
          </p>
        </div>

        <div className="reveal relative mt-10">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="mx-auto max-w-6xl"
          >
            <CarouselContent className="-ml-3 sm:-ml-4">
              {distributorImages.map((image, index) => (
                <CarouselItem key={image} className="pl-3 sm:basis-1/2 sm:pl-4 lg:basis-1/3">
                  <figure className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
                    <div className="aspect-[4/5] bg-secondary">
                      <img
                        src={`/products/${image}`}
                        alt={`Foto da distribuidora Rio Piranhas ${index + 1}`}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        loading={index < 3 ? "eager" : "lazy"}
                      />
                    </div>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-3 top-1/2 h-10 w-10 border-white/80 bg-white/95 shadow-card hover:bg-white sm:-left-5" />
            <CarouselNext className="right-3 top-1/2 h-10 w-10 border-white/80 bg-white/95 shadow-card hover:bg-white sm:-right-5" />
          </Carousel>

          <div className="mt-6 flex justify-center gap-2">
            {distributorImages.map((image, index) => (
              <button
                key={`dot-${image}`}
                type="button"
                aria-label={`Ir para foto ${index + 1}`}
                onClick={() => api?.scrollTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  current === index ? "w-8 bg-primary" : "w-2.5 bg-primary/25 hover:bg-primary/45"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
