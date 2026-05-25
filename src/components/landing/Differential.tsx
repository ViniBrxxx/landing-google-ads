import { Award, Boxes, Truck, Users } from "lucide-react";

const items = [
  { icon: Award, title: "52 anos de mercado", desc: "Experiência atendendo empresas e revendedores." },
  { icon: Boxes, title: "+4.000 produtos", desc: "Diversas categorias para ampliar suas oportunidades de venda." },
  { icon: Truck, title: "Frete grátis MA e PI", desc: "Mais competitividade para sua operação." },
  { icon: Users, title: "+2.800 clientes atendidos", desc: "Empresas que compram regularmente conosco." },
];

export const Differential = () => (
  <section className="relative overflow-hidden bg-gradient-blue py-16 text-primary-foreground sm:py-20">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(197_100%_70%/0.18),transparent_60%)]" />
    <div className="container-tight relative">
      <div className="reveal mx-auto max-w-2xl text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-accent">Credibilidade</span>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-balance text-white sm:text-4xl">
          Por que milhares de empresas compram da Rio Piranhas?
        </h2>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, desc }, i) => (
          <div
            key={title}
            className="reveal rounded-2xl bg-white/10 p-5 backdrop-blur-sm ring-1 ring-white/20 transition-colors duration-300 hover:bg-white/20"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-display text-lg font-bold text-white">{title}</h3>
            <p className="mt-1 text-sm text-white/85">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
