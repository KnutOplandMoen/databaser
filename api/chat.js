// Stub. Skjelett-fasen er ferdig, men selve studieassistent-API-et er ikke
// implementert ennå. Erstatt denne filen med den faktiske
// OpenRouter-streamingen + embedding-retrievalen når public/chunks.json er
// generert (se plan.md, seksjon 6).
//
// Inntil videre returnerer endepunktet 503 med en lesbar melding —
// chat-widgeten viser dette som en feil i panelet.

export async function POST() {
  return new Response(
    JSON.stringify({
      error:
        "Studieassistenten er ikke aktivert ennå. Innholdsfasen og embedding-pipelinen (noe.py) må kjøres før chat-API-et kan svare.",
    }),
    {
      status: 503,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}

export async function GET() {
  return new Response(
    JSON.stringify({ status: "stub", message: "POST /api/chat for å bruke studieassistenten (ennå ikke aktivert)." }),
    {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}
