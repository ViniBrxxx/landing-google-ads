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
  "Complementar minha renda",
  "Começar um negócio de revenda",
  "Revender na minha loja",
  "Encontrar fornecedor para meu negócio",
  "Ampliar meu portfólio atual",
];

const INVESTMENTS = [
  "Até R$ 500",
  "R$ 500 a R$ 1.000",
  "R$ 1.000 a R$ 3.000",
  "Acima de R$ 3.000",
];

const SEGMENTS = [
  "Loja de variedades",
  "Loja de cosméticos",
  "Mercado",
  "Farmácia",
  "Revendedor",
  "Distribuidor",
  "Outro",
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

function maskCNPJ(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

function isValidCNPJ(cnpj: string): boolean {
  const d = cnpj.replace(/\D/g, "");
  if (d.length !== 14 || /^(\d)\1+$/.test(d)) return false;
  const calc = (str: string, len: number) => {
    let sum = 0;
    let pos = len - 7;
    for (let i = len; i >= 1; i--) {
      sum += +str[len - i] * pos--;
      if (pos < 2) pos = 9;
    }
    return sum % 11 < 2 ? 0 : 11 - (sum % 11);
  };
  return calc(d, 12) === +d[12] && calc(d, 13) === +d[13];
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
  const [segment, setSegment] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", phone: "", cnpj: "" });
  const [consultantLink, setConsultantLink] = useState("");
  const [cnpjError, setCnpjError] = useState(false);
  const [cnpjValid, setCnpjValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const startForm = () => {
    if (hasStarted) return;
    gtagEvent("form_start", { form_name: final ? "final_lead_form" : "lead_form" });
    setHasStarted(true);
  };

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = maskCNPJ(e.target.value);
    setContact({ ...contact, cnpj: formatted });
    const digits = formatted.replace(/\D/g, "");
    if (digits.length === 14) {
      const valid = isValidCNPJ(formatted);
      setCnpjValid(valid);
      setCnpjError(!valid);
    } else {
      setCnpjValid(false);
      setCnpjError(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!contact.name || !contact.email || !contact.phone || !city.trim() || !state || !contact.cnpj || !goal || !investment) {
      toast.error("Preencha todos os campos obrigatórios para continuar");
      return;
    }
    if (final && !segment) {
      toast.error("Selecione seu segmento para continuar");
      return;
    }
    if (!isValidCNPJ(contact.cnpj)) {
      setCnpjError(true);
      toast.error("CNPJ inválido. Verifique e tente novamente.");
      return;
    }

    setIsSubmitting(true);
    const normalizedPhone = contact.phone.replace(/\D/g, "");
    const formSegment = final ? segment : goal;

    try {
      await sendToSheets({
        name: contact.name,
        email: contact.email,
        whatsapp: contact.phone,
        cnpj: contact.cnpj,
        city: city.trim(),
        state,
        segment: final ? segment : "",
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
      contact.cnpj.replace(/\D/g, ""),
      state,
      city.trim(),
      goal,
      formSegment,
      investment,
    );

    gtagEvent("generate_lead", {
      form_name: final ? "final_lead_form" : "lead_form",
      goal,
      segment: formSegment,
      state,
      city: city.trim(),
      volume: investment,
    });
    gtagConversion();
    trackMetaLead({ state, city: city.trim(), segment: formSegment, volume: investment });
    trackClarityLead({ state, city: city.trim(), segment: formSegment, volume: investment });

    const msg = encodeURIComponent(
      `Olá! Sou ${contact.name}, CNPJ ${contact.cnpj}. Quero receber as condições comerciais da Rio Piranhas. Cidade: ${city.trim()}, Estado: ${state}, Objetivo: ${goal}, Segmento: ${formSegment}, Investimento aproximado: ${investment}.`,
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
            {final ? "Receba acesso às condições comerciais" : "Receba condições comerciais exclusivas"}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">Preencha seus dados para análise comercial.</p>
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
            <Label htmlFor={final ? "final-email" : "email"} className="text-xs font-semibold">Email</Label>
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
            <Label htmlFor={final ? "final-cnpj" : "cnpj"} className="text-xs font-semibold">CNPJ obrigatório</Label>
            <Input
              id={final ? "final-cnpj" : "cnpj"}
              placeholder="00.000.000/0000-00"
              inputMode="numeric"
              maxLength={18}
              autoComplete="off"
              value={contact.cnpj}
              onChange={handleCnpjChange}
              onBlur={() => {
                const digits = contact.cnpj.replace(/\D/g, "");
                setCnpjError(digits.length > 0 && !isValidCNPJ(contact.cnpj));
                setCnpjValid(digits.length === 14 && isValidCNPJ(contact.cnpj));
              }}
              className={`mt-2 ${cnpjError ? "border-red-500 focus-visible:ring-red-500" : cnpjValid ? "border-green-500 focus-visible:ring-green-500" : ""}`}
            />
            {cnpjError && <p className="mt-1 text-xs text-red-500">CNPJ inválido. Verifique os números.</p>}
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
            <Label className="text-xs font-semibold">O que você procura?</Label>
            <Select value={goal} onValueChange={(value) => { startForm(); setGoal(value); }}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                {GOALS.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {final && (
            <div className="sm:col-span-2">
              <Label className="text-xs font-semibold">Qual seu segmento?</Label>
              <Select value={segment} onValueChange={(value) => { startForm(); setSegment(value); }}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione seu segmento" />
                </SelectTrigger>
                <SelectContent>
                  {SEGMENTS.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="sm:col-span-2">
            <Label className="text-xs font-semibold">
              Qual o valor aproximado que você pretende investir na sua próxima compra?
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
          disabled={cnpjError || isSubmitting}
        >
          <Check className="h-5 w-5" />
          {isSubmitting ? "Enviando dados..." : final ? "Quero receber as condições comerciais" : "Quero receber as condições"}
        </Button>
        <p className="text-center text-[11px] text-muted-foreground">
          Atendimento destinado para empresas e revendedores. Condições comerciais sujeitas à análise cadastral.
        </p>
      </form>
    </div>
  );
};
