import { Package } from "lucide-react";

export const Conditions = () => (
  <section className="bg-background py-16 sm:py-20">
    <div className="container-tight">
      <div className="reveal mx-auto max-w-3xl text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-primary">Operações de revenda</span>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-balance sm:text-4xl">
          Trabalhamos com operações que desejam crescer
        </h2>
        <p className="mt-4 text-muted-foreground">
          Nosso objetivo é atender empresas e revendedores que buscam ampliar seu faturamento através da
          compra direta da distribuidora. Cada cadastro passa por uma análise para garantir as melhores
          condições comerciais.
        </p>
      </div>

      <div className="reveal mx-auto mt-8 flex max-w-3xl gap-4 rounded-2xl bg-accent/20 p-5 ring-1 ring-accent/50">
        <Package className="mt-0.5 h-6 w-6 shrink-0 text-primary-deep" />
        <p className="text-sm font-semibold text-foreground">
          Condições comerciais, benefícios logísticos e disponibilidade podem variar conforme região,
          perfil cadastral e volume de compra.
        </p>
      </div>
    </div>
  </section>
);
