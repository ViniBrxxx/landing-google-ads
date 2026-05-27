import { ClipboardList, MessageCircle, PackageCheck, SearchCheck, UserRoundCheck } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Etapa 1", desc: "Solicite acesso ao catálogo." },
  { icon: SearchCheck, title: "Etapa 2", desc: "Receba informações sobre produtos e oportunidades." },
  { icon: MessageCircle, title: "Etapa 3", desc: "Converse com um consultor." },
  { icon: UserRoundCheck, title: "Etapa 4", desc: "Receba orientação comercial conforme seu perfil." },
  { icon: PackageCheck, title: "Etapa 5", desc: "Faça seu primeiro pedido." },
];

export const HowItWorks = () => (
  <section className="bg-muted py-16 sm:py-20">
    <div className="container-tight">
      <div className="reveal mx-auto max-w-2xl text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-primary">Como funciona</span>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-balance sm:text-4xl">
          Como funciona?
        </h2>
      </div>

      <div className="relative mt-12">
        <div className="absolute left-0 right-0 top-7 hidden h-1 rounded-full bg-gradient-blue lg:block" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="reveal relative text-center"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-blue ring-4 ring-muted transition-transform duration-300 hover:scale-110">
                <Icon className="h-6 w-6" />
                <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-accent text-[11px] font-extrabold text-accent-foreground ring-2 ring-muted">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
