import type { Project } from "~/types";
import { Link } from "react-router";

const ProjectCard = ({ project }: { project: Project }) => {
    // 1. Bulletproof Guard Clause: If project is null/undefined, don't crash, render nothing or a skeleton
    if (!project) {
        return null; // Or return a loading placeholder div
    }

    return (
        <Link className='block transform transition duration-300 hover:scale-[1.02]' to={`/projects/${project.documentId}`}>
            <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-sm transition hover:shadow-md">
            <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-40 object-cover"
            />
                <div className="p-5">
                    <h3 className="text-3xl font-semibold text-blue-400 mb-1">
                        {project.title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-2">
                        {project.description?.split('.')[0] || ""}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-4 mb-6">
                        {project.techstack?.split(',').map((t, index) => {
                            if (!t.trim()) return null; 
                            return (
                                <span key={index} className="bg-gray-700 px-3 py-1 text-[12px] text-gray-200 rounded-md">
                                    {t.trim()}
                                </span>
                            )
                        })}
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-400">
                        <span>{project.category}</span>
                        <span>{project.date ? new Date(project.date).toLocaleDateString() : ""}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;
