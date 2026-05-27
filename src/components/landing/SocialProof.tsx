import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Preciso ter CNPJ?",
    a: "Sim. O atendimento é voltado para operações comerciais e revendedores formalizados.",
  },
  {
    q: "Existe valor mínimo de compra?",
    a: "As condições comerciais são apresentadas conforme análise do cadastro e perfil de compra.",
  },
  {
    q: "Posso comprar para revender?",
    a: "Sim.",
  },
  {
    q: "Vocês entregam onde?",
    a: "Maranhão e Piauí.",
  },
  {
    q: "Recebo catálogo?",
    a: "Sim, após aprovação do cadastro.",
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
