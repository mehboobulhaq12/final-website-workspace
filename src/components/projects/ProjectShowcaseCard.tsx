import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { getProjectPath, type Project } from "@/lib/projects";

type ProjectShowcaseCardProps = {
  project: Project;
  className?: string;
};

export default function ProjectShowcaseCard({ project, className = "" }: ProjectShowcaseCardProps) {
  const previewHref = project.previewUrl ?? (project.videoSrc ? `${getProjectPath(project.slug)}#project-demo` : undefined);
  const previewLabel = project.previewLabel ?? (project.videoSrc ? "Preview Live Demo" : "Open Live Project");
  const previewIsExternal = previewHref ? /^https?:\/\//.test(previewHref) : false;

  return (
    <article
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#080808] transition-transform duration-500 hover:-translate-y-1 hover:border-orange-400/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        className,
      ].join(" ")}
    >
      <Link
        to={getProjectPath(project.slug)}
        className="block text-white no-underline visited:text-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-white/5">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
            width={1280}
            height={880}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[10px] font-light tracking-[0.18em] text-white/75 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" aria-hidden="true" />
            {project.tag}
          </div>

          <div className="absolute right-4 top-4 rounded-xl border border-white/10 bg-black/55 px-3 py-2 text-right backdrop-blur-md">
            <span className="block text-lg font-light leading-none text-orange-300 md:text-xl">{project.metric}</span>
            <span className="mt-1 block text-[10px] font-light uppercase tracking-[0.2em] text-white/45">
              {project.metricLabel}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col space-y-4 px-4 py-4 md:px-5 md:py-5">
        <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/35">
          <span>{project.category}</span>
          <span className="h-1 w-1 rounded-full bg-white/20" aria-hidden="true" />
          <span className="truncate">{project.client}</span>
        </div>

        <div className="space-y-2">
          <Link
            to={getProjectPath(project.slug)}
            className="block text-white no-underline visited:text-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <h3 className="text-base font-light leading-tight text-white transition-colors duration-300 md:text-lg text-balance line-clamp-2">
              {project.title}
            </h3>
          </Link>
        </div>

        <div className="mt-auto border-t border-white/8 pt-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to={getProjectPath(project.slug)}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-2 text-xs font-light text-white transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white md:text-sm"
            >
              View Breakdown
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>

            {previewHref ? (
              <a
                href={previewHref}
                target={previewIsExternal ? "_blank" : undefined}
                rel={previewIsExternal ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-3.5 py-2 text-xs font-light text-orange-200 transition-colors duration-300 hover:border-orange-300/35 hover:bg-orange-500/15 hover:text-orange-100 md:text-sm"
              >
                {previewLabel}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
