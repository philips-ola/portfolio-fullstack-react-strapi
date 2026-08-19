
import type { Project } from "~/types";
import ProjectCard from "./ProjectCard";

type FeatureProjectsProps ={
    projects: Project[],
    count: number;
}

const FeatureProject = ({projects, count = 4}:FeatureProjectsProps) => {
    if(projects.length === 0) return;
    return (
        <>
        <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-200">
                Featured Project
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
        </>
    )
}

export default FeatureProject;