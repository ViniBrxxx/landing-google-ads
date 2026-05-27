import { BriefcaseBusiness, Store, ShoppingBasket, Scissors } from "lucide-react";

const audiences = [
  { icon: BriefcaseBusiness, title: "Revendedores", desc: "Produtos para quem vende pelo WhatsApp, redes sociais ou atendimento direto." },
  { icon: Store, title: "Lojas", desc: "Abastecimento para operações físicas e online." },
  { icon: ShoppingBasket, title: "Mercados e Farmácias", desc: "Mix de produtos com demanda recorrente." },
  { icon: Scissors, title: "Salões", desc: "Produtos de beleza e higiene com alta saída." },
];

export const Problem = () => (
  <section className="bg-muted py-16 sm:py-20">
    <div className="container-tight">
      <div className="reveal mx-auto max-w-2xl text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-primary">Oportunidade de revenda</span>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-balance sm:text-4xl">
          Seja para revender ou abastecer sua loja, encontre produtos com alta procura.
        </h2>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
