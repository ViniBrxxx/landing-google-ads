import { Check, Sparkles } from "lucide-react";
import { LeadForm } from "./LeadForm";

const benefits = ["Cadastro gratuito", "Atendimento especializado", "Condições comerciais", "Catálogo atualizado"];

export const FinalCTA = () => (
  <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground sm:py-24">
    <div className="absolute inset-0 bg-gradient-blue animate-flow" />
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(197_100%_70%/0.2),transparent_60%)]" />

    <div className="container-tight relative grid items-center gap-10 lg:grid-cols-[1fr_460px]">
      <div className="reveal-left">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-accent-foreground">
          <Sparkles className="h-4 w-4" /> Atendimento voltado para compras a partir de R$ 1.000.
        </span>
        <h2 className="mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight text-balance text-white sm:text-4xl lg:text-5xl">
          Receba acesso às condições comerciais da Rio Piranhas
        </h2>
        <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg">
          Preencha seus dados e descubra as oportunidades disponíveis para sua região.
        </p>

        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-2 text-sm font-semibold text-white">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      <div id="form-final" className="reveal-right">
        <LeadForm final />
      </div>
    </div>
  </section>
);
