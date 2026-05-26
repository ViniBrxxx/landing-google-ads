import logo from "@/assets/logo.png";
import { LeadForm } from "./LeadForm";
import { Brands } from "./Brands";
import { Check } from "lucide-react";

const bullets = [
  "Compra direto da distribuidora",
  "Produtos com alta saída",
  "Frete grátis MA e PI",
  "Mais de 52 anos de mercado",
  "Atendimento especializado",
];

const hero =
  "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=1600&h=1100&fit=crop&crop=faces";

export const Hero = () => {
  return (
    <header className="relative overflow-hidden">
      <img
        src={hero}
        alt="Empreendedores conversando sobre compras para revenda"
        width={1600}
        height={1100}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-hero animate-flow" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-deep/40 via-primary-deep/20 to-primary-deep/50" />

      <div className="container-tight relative z-10 flex flex-col gap-10 pb-20 pt-6 lg:flex-row lg:items-center lg:gap-16 lg:py-20">
        {/* Top bar */}
        <div className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between sm:left-8 sm:right-8">
          <div className="flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-card backdrop-blur">
            <img src={logo} alt="Rio Piranhas" width={32} height={32} className="h-8 w-8" />
            <span className="font-display text-sm font-extrabold text-primary-deep">RIO PIRANHAS</span>
          </div>
          <a
            href="#form"
            className="hidden rounded-full bg-accent px-4 py-2 text-xs font-bold text-accent-foreground shadow-cta transition-transform duration-200 hover:scale-105 sm:inline-block"
          >
            Receber condições
          </a>
        </div>

        {/* Left column */}
        <div className="mt-14 flex-1 text-white animate-float-up lg:mt-0">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
            Cadastro gratuito para empresas e revendedores
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.05] text-balance sm:text-4xl lg:text-5xl xl:text-6xl">
            Revenda produtos de alta procura e <span style={{ color: '#FFD700' }}>lucre até 100%</span> comprando direto da distribuidora
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg">
            Mais de 4.000 produtos entre cosméticos, higiene, perfumaria e utilidades para quem deseja
            abastecer seu negócio ou ampliar seu portfólio de revenda.
          </p>

          <div className="mt-5 rounded-xl bg-white/95 px-4 py-3 text-sm font-bold text-primary-deep shadow-card">
            Condições comerciais voltadas para operações com compras a partir de R$ 1.000.
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {bullets.map((b, i) => (
              <li
                key={b}
                className="flex items-start gap-2 text-sm font-semibold sm:text-base"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <p className="text-sm font-bold text-white">+2.800 clientes atendidos</p>
            <Brands compact />
          </div>
        </div>

        {/* Right column - form */}
        <div id="form" className="w-full flex-1 animate-float-up lg:max-w-[480px]" style={{ animationDelay: "150ms" }}>
          <LeadForm />
        </div>
      </div>

      <div className="wave-divider-white absolute bottom-0 left-0 right-0 h-12 sm:h-16" />
    </header>
  );
};
