import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Existe pedido mínimo?",
    a: "Sim. Existem condições comerciais especiais para pedidos a partir de R$ 800.",
  },
  {
    q: "Existe frete grátis?",
    a: "Sim. Para Maranhão e Piauí conforme política comercial vigente.",
  },
  {
    q: "Preciso ter empresa para comprar?",
    a: "Atendemos principalmente empresas e revendedores formalizados. Nossa equipe orientará o melhor caminho conforme seu perfil.",
  },
  {
    q: "Como recebo o catálogo?",
    a: "Após o cadastro você receberá as informações e poderá ser atendido por um consultor.",
  },
];

export const SocialProof = () => (
  <section className="bg-muted py-16 sm:py-20">
    <div className="container-tight">
      <div className="reveal mx-auto max-w-2xl text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-primary">Dúvidas comuns</span>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-balance sm:text-4xl">
          Perguntas Frequentes
        </h2>
      </div>

      <Accordion
        type="single"
        collapsible
        className="reveal mx-auto mt-8 max-w-3xl rounded-2xl border border-border bg-card px-4 shadow-card"
      >
        {faqs.map((faq, index) => (
          <AccordionItem key={faq.q} value={`faq-${index}`}>
            <AccordionTrigger className="text-left font-display font-bold">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
