import nivea from "@/assets/NIVEA-logo.png";
import dove from "@/assets/Dove_logo.png";
import colgate from "@/assets/colgate-logo-1.svg";
import palmolive from "@/assets/Palmolive_logo_2019.png";
import garnier from "@/assets/Garnier-Logo.png";
import johnson from "@/assets/Johnson_and_Johnson_Logo.svg";
import loreal from "@/assets/L'Oréal_logo.svg.png";
import mamypoko from "@/assets/logo-mamypoko-02.png";
import pampers from "@/assets/pampers-logo-1.png";
import lux from "@/assets/Lux_logo.jpg";
import sundown from "@/assets/sundown-logo.png";
import huggies from "@/assets/huggies logo.png";

const allBrands = [
  { name: "Dove", logo: dove },
  { name: "Nivea", logo: nivea },
  { name: "Colgate", logo: colgate },
  { name: "Palmolive", logo: palmolive },
  { name: "Garnier", logo: garnier },
  { name: "Johnson & Johnson", logo: johnson },
  { name: "L'Oréal", logo: loreal },
  { name: "MamyPoko", logo: mamypoko },
  { name: "Pampers", logo: pampers },
  { name: "Lux", logo: lux },
  { name: "Sundown", logo: sundown },
  { name: "Huggies", logo: huggies },
];

const compactBrands = [allBrands[0], allBrands[1], allBrands[2], allBrands[3]];

type BrandsProps = {
  compact?: boolean;
};

export const Brands = ({ compact = false }: BrandsProps) => {
  if (compact) {
    return (
      <div className="mt-3 rounded-2xl bg-white/10 p-4 shadow-blue ring-1 ring-white/20 backdrop-blur">
        <p className="text-center text-sm font-bold uppercase tracking-wider text-white/85">
          Marcas de alta procura
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {compactBrands.map((b) => (
            <div
              key={b.name}
              className="flex items-center justify-center rounded-lg bg-white px-3 py-3 transition-all hover:shadow-card"
              title={b.name}
            >
              <img src={b.logo} alt={b.name} className="h-8 w-full object-contain sm:h-10" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const doubled = [...allBrands, ...allBrands];

  return (
    <section className="reveal border-y border-border bg-white py-12 sm:py-14">
      <div className="container-tight mb-6">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Marcas que trabalhamos
        </p>
        <h2 className="mt-1 text-center font-display text-2xl font-extrabold text-foreground sm:text-3xl">
          Distribuidores oficiais das melhores marcas
        </h2>
      </div>

      <div className="animate-marquee-pause overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-6 px-3">
          {doubled.map((b, i) => (
            <div
              key={`${b.name}-${i}`}
              className="flex h-20 w-36 shrink-0 items-center justify-center rounded-2xl border border-border bg-white px-5 py-3 shadow-sm transition-shadow duration-200 hover:shadow-card sm:h-24 sm:w-44"
              title={b.name}
            >
              <img
                src={b.logo}
                alt={b.name}
                className="max-h-14 w-full object-contain grayscale transition-all duration-300 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
