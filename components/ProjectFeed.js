'use client';

import { useEffect, useState } from 'react';
import { getVerifiedProjects } from '@/lib/api';
import { ArrowUpRight, Database, Shield } from './Icons';

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card__visual" aria-hidden="true">
        <span className="project-card__grid" />
        <span className="project-card__sun" />
      </div>
      <div className="project-card__body">
        <div className="project-card__meta">
          <span>{project.type || project.category || 'Renewable project'}</span>
          <span className="verified-chip"><Shield /> Verified</span>
        </div>
        <h3>{project.name || project.title || 'Verified project'}</h3>
        {project.location && <p>{project.location}</p>}
        <div className="project-card__fields">
          {project.minimumInvestment != null && <span><small>Minimum</small><strong>{project.currency || '$'}{project.minimumInvestment}</strong></span>}
          {project.riskLevel && <span><small>Risk</small><strong>{project.riskLevel}</strong></span>}
          {project.status && <span><small>Status</small><strong>{project.status}</strong></span>}
        </div>
        <button type="button" className="text-action">View project <ArrowUpRight /></button>
      </div>
    </article>
  );
}

export default function ProjectFeed() {
  const [state, setState] = useState({ loading: true, status: 'loading', projects: [], error: null });

  useEffect(() => {
    const controller = new AbortController();
    getVerifiedProjects({ signal: controller.signal })
      .then(({ status, projects }) => setState({ loading: false, status, projects, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ loading: false, status: 'error', projects: [], error });
      });
    return () => controller.abort();
  }, []);

  if (state.loading) {
    return (
      <div className="project-feed-state" aria-live="polite">
        <div className="feed-loader" />
        <div><strong>Checking the verified project feed…</strong><span>Only backend-supplied project data is rendered here.</span></div>
      </div>
    );
  }

  if (state.status === 'ok' && state.projects.length > 0) {
    return <div className="project-grid">{state.projects.slice(0, 6).map((project, index) => <ProjectCard key={project.id || project.slug || index} project={project} />)}</div>;
  }

  return (
    <div className="project-feed-empty">
      <div className="feed-illustration" aria-hidden="true">
        <span className="feed-horizon" />
        <span className="feed-sun" />
        <span className="panel panel--1" /><span className="panel panel--2" /><span className="panel panel--3" /><span className="panel panel--4" />
      </div>
      <div className="feed-copy">
        <div className="feed-badge"><Database /> REAL DATA ONLY</div>
        <h3>{state.status === 'not-configured' ? 'Project API ready to connect.' : 'Live opportunities are temporarily unavailable.'}</h3>
        <p>
          This landing page intentionally ships with <strong>no invented project, yield, funding, or payout figures</strong>. When the backend team provides the verified-project endpoint, cards populate from that source automatically.
        </p>
        <div className="feed-contract">
          <span>Expected fields</span>
          <code>name · type · location · verified · riskLevel · minimumInvestment · status</code>
        </div>
      </div>
    </div>
  );
}
