import { Sparkles, SprayCan, HeartPulse, Scissors, ShieldCheck, PackageCheck } from "lucide-react";

const categories = [
  { icon: Sparkles, title: "Cosméticos" },
  { icon: SprayCan, title: "Perfumaria" },
  { icon: HeartPulse, title: "Higiene" },
  { icon: Scissors, title: "Cuidados Capilares" },
  { icon: ShieldCheck, title: "Limpeza" },
  { icon: PackageCheck, title: "Utilidades" },
];

export const Products = () => (
  <section className="bg-background py-16 sm:py-20">
    <div className="container-tight">
      <div className="reveal mx-auto max-w-2xl text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-primary">Categorias de venda</span>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-balance sm:text-4xl">
          Produtos com alta procura para revenda
        </h2>
        <p className="mt-3 text-muted-foreground">
          Trabalhamos com categorias que possuem demanda constante e reposição frequente.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
