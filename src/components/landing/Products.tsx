import { Baby, HeartPulse, Home, Pill, ShoppingBag, Sparkles } from "lucide-react";

const categories = [
  { icon: Sparkles, title: "Cosméticos" },
  { icon: HeartPulse, title: "Higiene Pessoal" },
  { icon: Sparkles, title: "Perfumaria" },
  { icon: Home, title: "Utilidades Domésticas" },
  { icon: Baby, title: "Produtos Infantis" },
  { icon: Pill, title: "Farmácia" },
  { icon: ShoppingBag, title: "Conveniência" },
];

export const Products = () => (
  <section className="bg-background py-16 sm:py-20">
    <div className="container-tight">
      <div className="reveal mx-auto max-w-2xl text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-primary">Categorias de venda</span>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-balance sm:text-4xl">
          Conheça algumas das categorias disponíveis
        </h2>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map(({ icon: Icon, title }, i) => (
          <div
            key={title}
            className="reveal flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-blue"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="font-display text-lg font-bold">{title}</h3>
          </div>
        ))}
      </div>
    </div>
  </section>
);
