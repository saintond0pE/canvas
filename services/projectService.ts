import { Project } from '../types';

const STORAGE_KEY = 'canvas-ai-projects';

export const getProjects = (): Project[] => {
  try {
    const projectsJson = localStorage.getItem(STORAGE_KEY);
    if (!projectsJson) return [];
    const projects = JSON.parse(projectsJson) as Project[];
    // Sort by most recently updated
    return projects.sort((a, b) => b.updatedAt - a.updatedAt);
  } catch (error) {
    console.error("Failed to parse projects from localStorage", error);
    return [];
  }
};

export const getProject = (id: string): Project | null => {
  const projects = getProjects();
  return projects.find(p => p.id === id) || null;
};

export const saveProject = (projectToSave: Project): void => {
  const projects = getProjects();
  const existingIndex = projects.findIndex(p => p.id === projectToSave.id);

  if (existingIndex > -1) {
    projects[existingIndex] = projectToSave;
  } else {
    projects.push(projectToSave);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

export const deleteProject = (id: string): void => {
  let projects = getProjects();
  projects = projects.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};
