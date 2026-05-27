import { Store, Repeat, TrendingUp } from "lucide-react";

const audiences = [
  { icon: Store, title: "Tenho uma loja", desc: "Abasteça seu estoque comprando direto da distribuidora." },
  { icon: Repeat, title: "Já revendo produtos", desc: "Amplie seu portfólio com categorias de alta procura." },
  { icon: TrendingUp, title: "Quero crescer meu faturamento", desc: "Tenha acesso a condições comerciais voltadas para revendedores." },
];

export const Problem = () => (
  <section className="bg-muted py-16 sm:py-20">
    <div className="container-tight">
      <div className="reveal mx-auto max-w-2xl text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-primary">Oportunidade de revenda</span>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-balance sm:text-4xl">
          Para quem é essa oportunidade?
        </h2>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {audiences.map(({ icon: Icon, title, desc }, i) => (
          <div
            key={title}
            className="reveal rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow duration-300 hover:shadow-blue"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
