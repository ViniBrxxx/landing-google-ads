import { BadgeDollarSign, TrendingUp, Repeat, PanelsTopLeft } from "lucide-react";

const goals = [
  { icon: BadgeDollarSign, title: "Mais margem", desc: "Comprar melhor para lucrar mais." },
  { icon: TrendingUp, title: "Mais faturamento", desc: "Adicionar novas categorias de venda." },
  { icon: Repeat, title: "Mais recorrência", desc: "Produtos com demanda constante." },
  { icon: PanelsTopLeft, title: "Mais oportunidades", desc: "Ampliar o mix e aumentar o potencial de venda." },
];

export const Logistics = () => (
  <section className="bg-background py-16 sm:py-20">
    <div className="container-tight">
      <div className="reveal mx-auto max-w-2xl text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-primary">Objetivos comerciais</span>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-balance sm:text-4xl">
          O que nossos clientes procuram?
        </h2>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {goals.map(({ icon: Icon, title, desc }, i) => (
          <div
            key={title}
            className="reveal rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-blue"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="mt-3 font-display text-lg font-bold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
