import Image from 'next/image'
import {urlFor} from '@/sanity/image'
import type {PROJECTS_QUERY_RESULT} from '../../sanity.types'

type ProjectCardProps = {
  project: PROJECTS_QUERY_RESULT[number]
  index: number
}

const formatIndex = (index: number) => String(index + 1).padStart(2, '0')

export const ProjectCard = ({project, index}: ProjectCardProps) => {
  const accentClass = index % 2 === 0 ? 'text-signal border-signal' : 'text-brew border-brew'
  const numberClass = index % 2 === 0 ? 'text-signal' : 'text-brew'
  const imageUrl = project.image?.asset
    ? urlFor(project.image).width(1600).height(1100).fit('crop').url()
    : null
  const imageAlt = project.image?.alt || `${project.title} project image`
  const linkLabel = project.linkLabel || 'Visit site'
  const tags = project.tags?.filter(Boolean) ?? []
  const reverseOnDesktop = index % 2 === 1
  const isEndlessUndead =
    project.slug?.current === 'endless-undead' ||
    (project.title ?? '').toLowerCase().includes('endless undead')

  return (
    <article
      className="group grid gap-8 border-t border-bone/15 py-14 md:grid-cols-12 md:gap-10 md:py-20"
      aria-labelledby={`project-${project._id}`}
    >
      <div className="md:col-span-1">
        <span className={`font-mono text-sm ${numberClass}`}>
          {formatIndex(index)}
        </span>
      </div>

      <div
        className={`md:col-span-5 ${reverseOnDesktop ? 'order-2 md:order-none' : ''}`}
      >
        {project.eyebrow ? (
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-mute">
            {project.eyebrow}
          </p>
        ) : null}
        <h3
          id={`project-${project._id}`}
          className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-4xl"
        >
          {project.title}
        </h3>
        {project.summary ? (
          <p className="mt-5 max-w-md text-base leading-relaxed text-mute">
            {project.summary}
          </p>
        ) : null}
        {tags.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
            {tags.map((tag, tagIndex) => (
              <li key={`${project._id}-${tag}`} className="contents">
                {tagIndex > 0 ? <span aria-hidden="true">·</span> : null}
                <span>{tag}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {project.url || isEndlessUndead ? (
          <div className="mt-8 flex flex-wrap items-center gap-6">
            {project.url ? (
              <a
                href={project.url}
                className={`inline-flex items-center gap-2 border-b pb-1 text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-bone hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${accentClass}`}
                tabIndex={0}
                aria-label={`${linkLabel}: ${project.title}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkLabel}
                <span aria-hidden="true">↗</span>
              </a>
            ) : null}
            {isEndlessUndead ? (
              <a
                href="https://x.com/EndlessUndead_"
                className="inline-flex items-center gap-2 border-b border-bone/30 pb-1 text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
                tabIndex={0}
                aria-label="Endless Undead on X"
                target="_blank"
                rel="noopener noreferrer"
              >
                Endless Undead on X
                <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </div>
        ) : null}
      </div>

      <div
        className={`md:col-span-6 ${reverseOnDesktop ? 'order-1 md:order-none' : ''}`}
      >
        <div className="relative flex aspect-[16/11] items-center justify-center overflow-hidden bg-[#080808]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute">
              Add an image in Sanity
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
