import React, { useState, useEffect, useCallback } from 'react';
import { Project } from '../types';
import { getProjects, deleteProject } from '../services/projectService';
import Button from './Button';
import ProjectCard from './ProjectCard';

interface ProjectLibraryProps {
  onSelectProject: (id: string) => void;
  onNewProject: () => void;
}

const ProjectLibrary: React.FC<ProjectLibraryProps> = ({ onSelectProject, onNewProject }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  const loadProjects = useCallback(() => {
    setProjects(getProjects());
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      deleteProject(id);
      loadProjects();
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
        <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Your Projects</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                Continue your work or start something new.
            </p>
        </div>
        <Button onClick={onNewProject} size="lg" className="mt-4 sm:mt-0 whitespace-nowrap">
          + New Project
        </Button>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => onSelectProject(project.id)}
              onDelete={() => handleDelete(project.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl">
          <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">No projects yet</h3>
          <p className="mt-1 text-md text-gray-500 dark:text-gray-400">Get started by creating a new project.</p>
          <div className="mt-6">
            <Button onClick={onNewProject}>
              Create your first project
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectLibrary;