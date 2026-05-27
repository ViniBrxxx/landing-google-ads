import { ClipboardList, SearchCheck, MapPinned, PackageCheck } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Passo 1", desc: "Preencha seu cadastro." },
  { icon: SearchCheck, title: "Passo 2", desc: "Nossa equipe analisa seu perfil comercial." },
  { icon: MapPinned, title: "Passo 3", desc: "Você recebe as condições disponíveis para sua região." },
  { icon: PackageCheck, title: "Passo 4", desc: "Escolha os produtos mais adequados ao seu negócio." },
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
        <div className="grid gap-6 lg:grid-cols-4">
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
