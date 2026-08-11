'use client'

import {useEffect, useState} from 'react'
import {client} from '@/sanity/client'
import {PROJECTS_QUERY} from '@/sanity/queries'
import type {PROJECTS_QUERY_RESULT} from '../../sanity.types'
import {ProjectCard} from '@/components/ProjectCard'

export const ProjectsSection = () => {
  const [projects, setProjects] = useState<PROJECTS_QUERY_RESULT>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    let cancelled = false

    const loadProjects = async () => {
      try {
        const result = await client.fetch<PROJECTS_QUERY_RESULT>(PROJECTS_QUERY)
        if (cancelled) return
        setProjects(result)
        setStatus('ready')
      } catch (error) {
        console.error('Failed to load projects from Sanity:', error)
        if (cancelled) return
        setStatus('error')
      }
    }

    void loadProjects()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section
      id="work"
      className="border-t border-bone/10 px-5 py-20 md:px-8 md:py-28"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 md:mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-mute">
            Selected work
          </p>
          <h2
            id="work-heading"
            className="mt-3 text-4xl font-semibold tracking-[-0.03em] md:text-5xl"
          >
            Projects
          </h2>
        </div>

        {status === 'loading' ? (
          <p className="border-t border-bone/15 py-14 text-mute">Loading projects…</p>
        ) : null}

        {status === 'error' ? (
          <p className="border-t border-bone/15 py-14 text-mute">
            Couldn’t load projects right now. Refresh and try again.
          </p>
        ) : null}

        {status === 'ready' && projects.length === 0 ? (
          <p className="border-t border-bone/15 py-14 text-mute">
            No projects yet. Publish one in Sanity Studio.
          </p>
        ) : null}

        {status === 'ready'
          ? projects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))
          : null}
      </div>
    </section>
  )
}
