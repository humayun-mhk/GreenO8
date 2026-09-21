const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const PROJECTS_ENDPOINT = process.env.NEXT_PUBLIC_PROJECTS_ENDPOINT || '/api/projects?status=verified&listed=true';

export async function getVerifiedProjects({ signal } = {}) {
  if (!BASE_URL) {
    return { status: 'not-configured', projects: [] };
  }

  const response = await fetch(`${BASE_URL}${PROJECTS_ENDPOINT}`, {
    signal,
    headers: { Accept: 'application/json' },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`Project feed failed with status ${response.status}`);
  }

  const payload = await response.json();
  const projects = Array.isArray(payload) ? payload : payload.projects || payload.items || payload.data || [];

  return {
    status: 'ok',
    projects: projects.filter((project) => project?.verified !== false && project?.status !== 'rejected')
  };
}
