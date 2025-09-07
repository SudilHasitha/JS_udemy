import Button from "./Button";
import { Trash2 } from 'lucide-react';

export default function ProjectSidebar({ onStartAddProject, currentProjects, onSelectProject, onDelete }) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h1 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h1>

      <div>
        <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>

      {currentProjects.length === 0 ? (
        <p className="mt-8 text-stone-400">
          No projects available. Please add a new project.
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {currentProjects.projects.map((project) => (
            <li key={project.id} className="mb-0">
              <div className="flex items-center justify-between">
                {/* Project title */}
                <button
                  className="flex-1 text-left hover:text-stone-200 text-stone-400 hover:bg-stone-800 px-2 py-1 rounded"
                  onClick={() => onSelectProject(project.id)}
                >
                  {project.title}
                </button>

                {/* Delete icon button */}
                <button
                  className="ml-4 p-2 hover:bg-stone-800 rounded"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click from bubbling up to the project selection
                    onDelete(project.id);
                  }}
                  aria-label="Delete project"
                >
                  <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
