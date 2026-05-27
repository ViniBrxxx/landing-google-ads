import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { gtagConversion, gtagEvent } from "@/lib/gtag";
import { trackClarityLead, trackMetaLead } from "@/lib/marketing";
import { sendToSheets } from "@/lib/sheets";

const NEW_TRACKING_URL = "/api/new-tracking/leads";
const NEW_TRACKING_KEY = "u7hjat5pjvfs8m7ls2ndwefn";

const GOALS = [
  "Revender produtos",
  "Abastecer minha loja",
  "Encontrar produtos com maior margem",
  "Ampliar meu mix de produtos",
  "Encontrar um fornecedor",
];

const INVESTMENTS = [
  "Até R$ 800",
  "Entre R$ 800 e R$ 3.000",
  "Entre R$ 3.000 e R$ 10.000",
  "Acima de R$ 10.000",
];

const STATES = ["Maranhão (MA)", "Piauí (PI)"];

type LeadFormProps = {
  final?: boolean;
};

function extractStateCode(stateAnswer: string): string {
  const match = stateAnswer.match(/\(([^)]+)\)/);
  return match ? match[1] : stateAnswer;
}

function getCookie(name: string): string {
  const match = document.cookie.split(";").find((c) => c.trim().startsWith(name + "="));
  return match ? match.split("=").slice(1).join("=").trim() : "";
}

function getFbc(): string {
  const cookie = getCookie("_fbc");
  if (cookie) return cookie;
  const fbclid = new URLSearchParams(window.location.search).get("fbclid") || "";
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : "";
}

function getUtmsForTracking() {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") ?? "",
    utm_medium: p.get("utm_medium") ?? "",
    utm_campaign: p.get("utm_campaign") ?? "",
    utm_content: p.get("utm_content") ?? "",
    utm_term: p.get("utm_term") ?? "",
  };
}

async function sendNewTracking(
  name: string,
  phone: string,
  email: string,
  cnpj: string,
  state: string,
  city: string,
  goal: string,
  segment: string,
  volume: string,
) {
  try {
    await fetch(NEW_TRACKING_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-lead-capture-key": NEW_TRACKING_KEY,
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        cnpj,
        documento: cnpj,
        document: cnpj,
        state: extractStateCode(state),
        estado: extractStateCode(state),
        state_label: state,
        city,
        cidade: city,
        goal,
        objetivo: goal,
        segment,
        segmento: segment,
        volume,
        fbc: getFbc(),
        fbp: getCookie("_fbp"),
        event_id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        ...getUtmsForTracking(),
      }),
    });
  } catch (error) {
    console.error("New tracking request error", error);
  }
}

function maskPhone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export const LeadForm = ({ final = false }: LeadFormProps) => {
  const [goal, setGoal] = useState("");
  const [investment, setInvestment] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [consultantLink, setConsultantLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const startForm = () => {
    if (hasStarted) return;
    gtagEvent("form_start", { form_name: final ? "final_lead_form" : "lead_form" });
    setHasStarted(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!contact.name || !contact.email || !contact.phone || !city.trim() || !state || !goal || !investment) {
      toast.error("Preencha todos os campos obrigatórios para continuar");
      return;
    }

    setIsSubmitting(true);
    const normalizedPhone = contact.phone.replace(/\D/g, "");

    try {
      await sendToSheets({
        name: contact.name,
        email: contact.email,
        whatsapp: contact.phone,
        cnpj: "",
        city: city.trim(),
        state,
        segment: "",
        goal,
        volume: investment,
      });
    } catch {
      setIsSubmitting(false);
      toast.error("Não foi possível enviar os dados para a planilha.");
      return;
    }

    await sendNewTracking(
      contact.name,
      normalizedPhone,
      contact.email,
      "",
      state,
      city.trim(),
      goal,
      goal,
      investment,
    );

    gtagEvent("generate_lead", {
      form_name: final ? "final_lead_form" : "lead_form",
      goal,
      segment: goal,
      state,
      city: city.trim(),
      volume: investment,
    });
    gtagConversion();
    trackMetaLead({ state, city: city.trim(), segment: goal, volume: investment });
    trackClarityLead({ state, city: city.trim(), segment: goal, volume: investment });

    const msg = encodeURIComponent(
      `Olá! Sou ${contact.name}. Quero acessar o catálogo e oportunidades de revenda da Rio Piranhas. Cidade: ${city.trim()}, Estado: ${state}, Objetivo: ${goal}, Investimento aproximado: ${investment}.`,
    );
    const phoneNumbers: Record<string, string> = {
      "Maranhão (MA)": "558695319157",
      "Piauí (PI)": "558694271798",
    };
    const selectedPhone = phoneNumbers[state] || phoneNumbers["Piauí (PI)"];

    setConsultantLink(`https://wa.me/${selectedPhone}?text=${msg}`);
    setSubmitted(true);
    setIsSubmitting(false);
    toast.success("Recebemos seu cadastro! Agora você pode falar com o consultor responsável.");
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-card p-5 text-center text-foreground shadow-blue ring-1 ring-border sm:p-7">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success text-success-foreground">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold">Cadastro recebido com sucesso</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Seu atendimento foi direcionado para o consultor responsável por {state}. Clique abaixo para iniciar a
          conversa.
        </p>
        <Button asChild variant="cta" size="xl" className="mt-6 w-full animate-pulse-soft">
          <a href={consultantLink} target="_blank" rel="noreferrer">
            <Check className="h-5 w-5" />
            Falar com o consultor no WhatsApp
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card p-5 shadow-blue ring-1 ring-border sm:p-7 text-foreground">
      <form onSubmit={submit} onFocus={startForm} className="animate-float-up space-y-4">
        <div>
          <h3 className="font-display text-xl font-bold sm:text-2xl">
            Receba acesso ao catálogo e oportunidades de revenda
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">Veja produtos, categorias e condições disponíveis para sua região.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor={final ? "final-name" : "name"} className="text-xs font-semibold">Nome Completo</Label>
            <Input
              id={final ? "final-name" : "name"}
              placeholder="Seu nome completo"
              autoComplete="name"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              className="mt-2"
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor={final ? "final-email" : "email"} className="text-xs font-semibold">E-mail</Label>
            <Input
              id={final ? "final-email" : "email"}
              type="email"
              placeholder="seuemail@empresa.com.br"
              autoComplete="email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor={final ? "final-phone" : "phone"} className="text-xs font-semibold">WhatsApp</Label>
            <Input
              id={final ? "final-phone" : "phone"}
              type="tel"
              inputMode="tel"
              placeholder="(98) 90000-0000"
              autoComplete="tel"
              maxLength={15}
              value={contact.phone}
              onChange={(e) => setContact({ ...contact, phone: maskPhone(e.target.value) })}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor={final ? "final-city" : "city"} className="text-xs font-semibold">Cidade</Label>
            <Input
              id={final ? "final-city" : "city"}
              placeholder="Digite sua cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-xs font-semibold">Estado</Label>
            <Select value={state} onValueChange={(value) => { startForm(); setState(value); }}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {STATES.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-2">
            <Label className="text-xs font-semibold">Qual o seu objetivo hoje?</Label>
            <Select value={goal} onValueChange={(value) => { startForm(); setGoal(value); }}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                {GOALS.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-2">
            <Label className="text-xs font-semibold">
              Quanto pretende investir na próxima compra?
            </Label>
            <Select value={investment} onValueChange={(value) => { startForm(); setInvestment(value); }}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Selecione uma faixa" />
              </SelectTrigger>
              <SelectContent>
                {INVESTMENTS.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          type="submit"
          variant="cta"
          size="xl"
          className="w-full animate-pulse-soft disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
        >
          <Check className="h-5 w-5" />
          {isSubmitting ? "Enviando dados..." : "Quero acessar o catálogo"}
        </Button>
        <div className="rounded-xl bg-primary-soft p-4">
          <p className="text-sm font-bold text-primary-deep">O que você vai receber</p>
          <ul className="mt-3 grid gap-2 text-sm text-foreground sm:grid-cols-2">
            {[
              "Catálogo atualizado",
              "Produtos de maior giro",
              "Sugestões de categorias",
              "Condições comerciais",
              "Atendimento especializado",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-center text-[11px] text-muted-foreground">
          Atendimento destinado para empresas e revendedores. CNPJ poderá ser solicitado posteriormente pelo atendimento.
        </p>
      </form>
    </div>
  );
};
