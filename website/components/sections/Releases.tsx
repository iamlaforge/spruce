import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";

/**
 * Releases section. Server-fetches the latest GitHub releases at build
 * time (with hourly revalidation via ISR) and renders the most recent
 * three to five with editorial restraint — version + date in mono caps,
 * release name in italic Fraunces, first-paragraph excerpt, link out
 * to the full release on GitHub.
 *
 * Graceful fallback: if the API returns nothing (no releases yet, or
 * the fetch fails), the section renders nothing. The homepage stays
 * clean either way.
 *
 * Sits between FAQModule (§ 03) and InstallParallel (§ 05) — visitor
 * sees what Spruce does, gets common questions answered, sees that the
 * project is actively shipping, then installs with confidence.
 */

const REPO = "iamlaforge/spruce";
const PER_PAGE = 5;
const REVALIDATE_SECONDS = 3600; // hourly

type GitHubRelease = {
  name: string | null;
  tag_name: string;
  published_at: string;
  body: string;
  html_url: string;
  draft: boolean;
  prerelease: boolean;
};

async function fetchReleases(): Promise<GitHubRelease[]> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    // Optional token — required if the repo is private; for public repos
    // the unauthenticated rate limit is sufficient for build-time fetches.
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/releases?per_page=${PER_PAGE}`,
      {
        next: { revalidate: REVALIDATE_SECONDS },
        headers,
      },
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    // Skip drafts; keep prereleases (visible work in progress).
    return data.filter((r: GitHubRelease) => !r.draft);
  } catch {
    return [];
  }
}

// Pull the first paragraph of the release body, stripping markdown
// headings so the excerpt reads as prose. The release notes are
// hand-written editorial — typically the opening paragraph names the
// release's character ("Spruce now starts with users, not pixels…").
function getExcerpt(body: string): string {
  if (!body) return "";
  const firstParagraph = body
    .split(/\n\s*\n/)[0]
    .replace(/^#+ .*$/gm, "")
    .trim();
  return firstParagraph;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export async function Releases() {
  const releases = await fetchReleases();
  if (releases.length === 0) return null;

  return (
    <Section id="releases" tone="default">
      <SectionHeader mark="§ 04">Releases &middot; Recent shipping</SectionHeader>

      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 mb-12 md:mb-16">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-2">
          <p className="font-display font-normal text-2xl md:text-3xl leading-tight tracking-tight text-ink text-balance">
            What&rsquo;s been shipping.{" "}
            <span className="text-ink-muted">
              The latest releases, in editorial brief.
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
        <ol
          role="list"
          className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2 list-none"
        >
          {releases.map((release, i) => (
            <ReleaseEntry
              key={release.tag_name}
              release={release}
              isFirst={i === 0}
            />
          ))}
        </ol>
      </div>

      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 pt-8 md:pt-10 mt-8 md:mt-10 border-t border-rule-subtle">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2">
          <a
            href={`https://github.com/${REPO}/releases`}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-2xs uppercase tracking-widest text-ink hover:text-accent transition-colors duration-fast ease-considered"
          >
            View all releases on GitHub &rarr;
          </a>
        </div>
      </div>
    </Section>
  );
}

// ---------------------------------------------------------------------------
// ReleaseEntry — one release: version + date eyebrow, italic Fraunces
// title, first-paragraph excerpt, link to the full release on GitHub.
// Hairline rule above each entry except the first.
// ---------------------------------------------------------------------------

function ReleaseEntry({
  release,
  isFirst,
}: {
  release: GitHubRelease;
  isFirst: boolean;
}) {
  const excerpt = getExcerpt(release.body);
  const title = release.name || release.tag_name;

  return (
    <li
      className={
        isFirst ? "" : "border-t border-rule-subtle pt-8 md:pt-10 mt-8 md:mt-10"
      }
    >
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 mb-4">
        <span className="font-mono text-2xs uppercase tracking-widest text-accent">
          {release.tag_name}
        </span>
        <span className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
          {formatDate(release.published_at)}
        </span>
        {release.prerelease ? (
          <span className="font-mono text-2xs uppercase tracking-widest text-ink-subtle">
            Pre-release
          </span>
        ) : null}
      </div>
      <h3 className="font-display italic font-normal text-2xl md:text-3xl tracking-tight text-ink leading-tight mb-4 max-w-prose text-balance">
        {title}
      </h3>
      {excerpt ? (
        <p className="text-base md:text-lg text-ink-muted leading-relaxed text-pretty max-w-prose">
          {excerpt}
        </p>
      ) : null}
      <a
        href={release.html_url}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-block font-mono text-2xs uppercase tracking-widest text-accent hover:text-accent-hover transition-colors duration-fast ease-considered"
      >
        Read full release &rarr;
      </a>
    </li>
  );
}
