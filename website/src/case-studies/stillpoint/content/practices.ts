/**
 * Stillpoint practice content. Single source of truth for the three
 * featured practices — used by the home page's practices section
 * (cards) and by the practice detail pages at /case-study/practice/[slug].
 *
 * The shape is wider than the home cards need (which only use slug,
 * title, Icon, duration, shortDescription). The extra fields land on
 * the detail page: longDescription, audioLength, type, timeOfDay,
 * environment, guide info, the what-to-expect steps, and the imagery
 * key for the hero.
 *
 * Adding a new practice means: add an entry here, add its hero image
 * to the imagery registry if needed, and the detail route picks it up
 * automatically via generateStaticParams.
 */

import {
  MoonIcon,
  SunRisingIcon,
  WaveIcon,
} from "../components/StillpointIcons";
import type { StillpointImageKey } from "./imagery";

type IconComponent = typeof SunRisingIcon;

export type PracticeStep = {
  label: string;
  description: string;
};

export type PracticeGuide = {
  name: string;
  bio: string;
  /** 2-3 letter initials for the avatar mark. */
  initials: string;
};

export type Practice = {
  slug: string;
  title: string;
  Icon: IconComponent;
  /** Card-format meta line, e.g., "5 min · Breath". */
  duration: string;
  /** One-sentence card description. */
  shortDescription: string;
  /** Multi-paragraph editorial copy for the detail page's about section. */
  longDescription: string[];
  /** Practice category, e.g., "Breath", "Body scan". */
  type: string;
  /** Time-of-day grouping for the eyebrow. */
  timeOfDay: "morning" | "midday" | "evening";
  /** Audio length as a clock string, e.g., "5:32". */
  audioLength: string;
  /** Suggested environment / setup for the practice. */
  environment: string;
  /** What-to-expect breakdown — 3 to 5 steps. */
  steps: PracticeStep[];
  /** Guide / instructor for this practice. */
  guide: PracticeGuide;
  /** Hero image key into stillpointImagery. */
  imageKey: StillpointImageKey;
};

const MAYA: PracticeGuide = {
  name: "Maya Okafor",
  initials: "MO",
  bio:
    "Maya leads Stillpoint's morning and mid-day practices. Her background is in somatic-led mindfulness — she favors short, grounded sessions over long retreats. She lives in Brooklyn with two cats who supervise.",
};

const ROHAN: PracticeGuide = {
  name: "Rohan Iyer",
  initials: "RI",
  bio:
    "Rohan guides Stillpoint's evening body scans. He came to the practice through chronic-pain recovery and brings a quiet, unhurried voice to the work. Trained in the U.K., now teaches from a small studio in Lisbon.",
};

export const PRACTICES: Practice[] = [
  {
    slug: "morning-grounding",
    title: "Morning Grounding",
    Icon: SunRisingIcon,
    duration: "5 min · Breath",
    shortDescription: "Begin the day with a few mindful minutes.",
    longDescription: [
      "Morning Grounding is a short breath-led practice built for the first quiet moment of the day. Five minutes is enough to settle the nervous system before the day's first demands arrive — coffee, kids, calendar, the rest of it.",
      "The practice doesn't aim to make you feel any particular way. It aims to give you a small window of attention before everything else begins. Some mornings that lands as calm; some mornings as alert; some mornings as nothing in particular. Any of those is fine. The practice is the window, not the mood it produces.",
    ],
    type: "Breath",
    timeOfDay: "morning",
    audioLength: "5:32",
    environment:
      "Sit comfortably — a cushion, a chair, the edge of your bed. Eyes open or closed; whichever you prefer. Headphones help but aren't required.",
    steps: [
      {
        label: "Settle",
        description:
          "Find your seat. Notice contact with the surface beneath you. Let your shoulders drop.",
      },
      {
        label: "Three rounds of breath",
        description:
          "A slow inhale, a slightly slower exhale. Three rounds, not counted strictly — just three full cycles where the breath has time to land.",
      },
      {
        label: "Quiet awareness",
        description:
          "Stay with the breath for the rest of the practice. When attention drifts, return — without judgment, without effort. Returning is the practice.",
      },
      {
        label: "Carry it forward",
        description:
          "End with one full breath, then open your eyes if they were closed. Notice what's shifted, if anything. Begin the day from here.",
      },
    ],
    guide: MAYA,
    imageKey: "stillLifeJournal",
  },
  {
    slug: "mid-day-reset",
    title: "Mid-day Reset",
    Icon: WaveIcon,
    duration: "3 min · Breath",
    shortDescription: "A short pause to reset between meetings.",
    longDescription: [
      "Mid-day Reset is a three-minute breath practice for the moment between things — after a meeting, before a call, in the gap between a hard task and the next one. Short enough to fit anywhere; long enough to actually reset.",
      "The aim isn't to clear your mind. It's to step out of the flow for a moment, notice what's in your body, and step back in with slightly more space. Three minutes is a small enough commitment that you can use it often without it feeling like a project.",
    ],
    type: "Breath",
    timeOfDay: "midday",
    audioLength: "3:15",
    environment:
      "Anywhere reasonably quiet. At your desk is fine. Outside is better if you have the option. Eyes can stay open.",
    steps: [
      {
        label: "Pause",
        description:
          "Stop whatever's in your hand. Sit back. Notice you've decided to take three minutes.",
      },
      {
        label: "Three slow breaths",
        description:
          "Slower than your default pace. Don't strain — just longer than usual.",
      },
      {
        label: "Notice",
        description:
          "Where's the tension? Shoulders, jaw, hands? You don't need to fix it; just see it.",
      },
      {
        label: "Return",
        description:
          "When the audio ends, return to whatever's next — but from a slightly different starting point.",
      },
    ],
    guide: MAYA,
    imageKey: "abstractGradient",
  },
  {
    slug: "evening-wind-down",
    title: "Evening Wind-down",
    Icon: MoonIcon,
    duration: "7 min · Body scan",
    shortDescription: "Let the day settle before sleep.",
    longDescription: [
      "Evening Wind-down is a seven-minute body scan for the transition from day into rest. The practice moves attention slowly through the body, from the feet upward, settling each region as it goes. By the end, the day's accumulated tension has somewhere to go besides into sleep.",
      "It's longer than the morning and mid-day practices for a reason — bodies need time to settle, and rushing the wind-down defeats the purpose. Seven minutes is a calibrated minimum; if you have more, you can stay with the silence at the end.",
    ],
    type: "Body scan",
    timeOfDay: "evening",
    audioLength: "7:08",
    environment:
      "Lying down preferred — bed, couch, floor mat. A blanket helps. Eyes closed. The audio is quiet; turn the volume slightly higher than you would for music.",
    steps: [
      {
        label: "Lie down",
        description:
          "Get comfortable. Arms at your sides or over your chest, whichever feels natural. Let the surface support you.",
      },
      {
        label: "Begin at the feet",
        description:
          "Bring attention to the feet. Notice them without trying to relax them. Just notice they're there.",
      },
      {
        label: "Move attention upward",
        description:
          "Slowly — calves, knees, thighs, hips, belly, chest, shoulders, arms, neck, face. Pause at each. The audio paces you.",
      },
      {
        label: "Rest in stillness",
        description:
          "When the scan finishes, stay where you are. The practice ends; the rest can continue as long as you want.",
      },
    ],
    guide: ROHAN,
    imageKey: "stillLifeCandle",
  },
];

export function getPractice(slug: string): Practice | undefined {
  return PRACTICES.find((p) => p.slug === slug);
}

export function getOtherPractices(slug: string): Practice[] {
  return PRACTICES.filter((p) => p.slug !== slug);
}
