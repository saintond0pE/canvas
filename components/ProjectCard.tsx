import React from 'react';
import { Project } from '../types';
import { TrashIcon } from './icons/TrashIcon';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  onDelete: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, onDelete }) => {
  const latestImage = project.history[project.history.length - 1] || project.originalImage.base64;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card's onClick from firing
    onDelete();
  };

  return (
    <div 
        className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-md dark:shadow-2xl dark:shadow-black/20 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        onClick={onClick}
    >
      <div className="relative w-full aspect-video bg-gray-200 dark:bg-slate-700">
        <img src={latestImage} alt={project.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {project.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Last updated: {new Date(project.updatedAt).toLocaleDateString()}
        </p>
      </div>
      
      <button 
        onClick={handleDelete} 
        className="absolute top-3 right-3 p-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-full text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white dark:hover:bg-red-600"
        aria-label="Delete project"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProjectCard;