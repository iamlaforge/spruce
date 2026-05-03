import { SpecimenFrame } from "./DemoFrame";
import { stillpointScenarios } from "@/src/case-studies/stillpoint/content/scenarios";

/**
 * /scenarios demo. Renders the actual Stillpoint .scenarios.md content
 * as research-dossier scenario cards — two stacked scenarios (Maya's
 * morning kitchen + Jordan's first-time-on-the-couch), each with
 * persona + job header, confidence eyebrow, narrative as the
 * centerpiece, and a closing design-implication block.
 *
 * Visual register: SpecimenFrame matches the designed-deliverable
 * register of /personas and /journey. The narrative gets editorial
 * weight (larger body, relaxed line-height) — it IS the artifact's
 * value; the surrounding metadata is scaffolding.
 */

type Scenario = {
  name: string;
  persona: string;
  job: string;
  confidence: string;
  designDecisionsInformed: readonly string[];
  narrative: string;
  designImplication: string;
};

export function ScenariosDemo() {
  const scenarios = stillpointScenarios.scenarios as readonly Scenario[];

  return (
    <SpecimenFrame
      eyebrow="Specimen"
      scope="/scenarios · Stillpoint"
      caption="/scenarios writes .scenarios.md — short narratives anchoring a named persona doing a specific job in a specific moment. The lightest of the Discovery artifacts and the most concrete; what designers keep on the wall while making specific design decisions."
    >
      <div className="border border-rule-subtle bg-surface rounded-md">
        {scenarios.map((scenario, i) => (
          <ScenarioCard
            key={scenario.name}
            scenario={scenario}
            isLast={i === scenarios.length - 1}
          />
        ))}
      </div>
    </SpecimenFrame>
  );
}

// ---------------------------------------------------------------------------
// ScenarioCard — eyebrow + name headline, persona + job + confidence
// metadata, design-decisions-informed list, then the narrative as the
// centerpiece, with a closing design-implication callout.
// ---------------------------------------------------------------------------

function ScenarioCard({
  scenario,
  isLast,
}: {
  scenario: Scenario;
  isLast: boolean;
}) {
  return (
    <section
      className={`px-6 py-7 md:px-8 md:py-9 ${
        isLast ? "" : "border-b border-rule-subtle"
      }`}
    >
      <header className="mb-6">
        <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-3">
          Scenario
        </p>
        <h3 className="font-display font-normal text-xl md:text-2xl tracking-tight text-ink leading-tight mb-3">
          {scenario.name}
        </h3>
        <div className="space-y-1">
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
            Persona ·{" "}
            <span className="text-ink-muted normal-case">{scenario.persona}</span>
          </p>
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
            Job · <span className="text-ink-muted normal-case">{scenario.job}</span>
          </p>
          <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
            Confidence ·{" "}
            <span className="text-ink-muted normal-case">{scenario.confidence}</span>
          </p>
        </div>
      </header>

      {/* Design decisions informed — small precursor list */}
      <div className="mb-6 max-w-prose">
        <p className="font-mono text-2xs uppercase tracking-widest text-ink-subtle mb-2">
          Decisions this scenario informs
        </p>
        <ul role="list" className="list-none space-y-1.5">
          {scenario.designDecisionsInformed.map((d, i) => (
            <li
              key={i}
              className="text-sm text-ink-muted leading-snug pl-4 relative text-pretty"
            >
              <span aria-hidden className="absolute left-0 top-0 text-ink-subtle">
                &mdash;
              </span>
              {d}
            </li>
          ))}
        </ul>
      </div>

      {/* Narrative — the centerpiece */}
      <div className="border-l-2 border-accent pl-5 my-6 max-w-prose">
        <p className="font-display font-normal text-base md:text-lg text-ink leading-relaxed text-pretty">
          {scenario.narrative}
        </p>
      </div>

      {/* Design implication */}
      <div className="border-t border-rule-subtle pt-5 max-w-prose">
        <p className="font-display italic font-normal text-base md:text-lg text-ink leading-snug mb-2">
          Design implication
        </p>
        <p className="text-sm md:text-base text-ink-muted leading-snug text-pretty">
          {scenario.designImplication}
        </p>
      </div>
    </section>
  );
}
