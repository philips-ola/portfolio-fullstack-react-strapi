import type { Route } from "./+types/details";
import type { Project, StrapiResponse, StrapiProject } from "~/types";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";


export async function loader({request, params}:Route.LoaderArgs){
    const{id} = params;


    const query = new URLSearchParams({
  "filters[documentId][$eq]": id,
  populate: "image",
  "fields[0]": "title",
  "fields[1]": "description",
  "fields[2]": "url",
  "fields[3]": "github",
  "fields[4]": "techstack",
  "fields[5]": "date",
  "fields[6]": "category",
});

const res = await fetch(
  `${import.meta.env.VITE_STRAPI_URL}/api/projects?${query}`
);

if (!res.ok) {
  throw new Response("Unable to load project", { status: res.status });
}

const json: StrapiResponse<StrapiProject> = await res.json();
const item = json.data[0];

if (!item) {
  throw new Response("Project not found", { status: 404 });
}


    const project:Project = {
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        description: item.description,
        image: item.image?.url? `${item.image?.url}` : '/images/no-image.png',
        url: item.url,
        github: item.github,
        techstack: item.techstack,
        date :item.date,
         category: item.category,
         featured: item.featured
    }
    return {project};

}   

const ProductDetailPage = ({loaderData}:Route.ComponentProps) => {
    const {project} = loaderData;
    
    return(
        <>
           <Link to='/projects' className="flex items-center text-blue-400 hover:text-blue-500 mb-6 transition">
    <FaArrowLeft className="mr-2" /> Back to Projects
</Link>


<div className="grid gap-8 md:grid-cols-12 items-start">

    {/* Image container: Takes full width on mobile, 5/12 columns (41.6%) on desktop */}
    <div className="md:col-span-5">
        <img src={project.image} alt={project.title} className='w-full rounded-lg shadow-md' />
    </div>

    {/* Text container: Takes full width on mobile, 7/12 columns (58.3%) on desktop */}
    <div className="md:col-span-7">
        <h1 className="text-3xl font-bold text-blue-400 mb-4">
            {project.title}
        </h1>
        <p className="text-gray-300 text-sm mb-4 flex gap-2">
            <span className="bg-gray-800 px-3 py-1 rounded-md">{new Date(project.date).toLocaleDateString()}</span>
            <span className="bg-gray-800 px-3 py-1 rounded-md">{project.category}</span> 
        </p>
        <p className="text-gray-200 mb-6">
           {project.description}
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

        <a href={project.url} target="_blank" rel="noreferrer" className='inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 mr-4 rounded transition'>
            View Live Site 
        </a>
        {project.github && 
        (<a href={project.github} target="_blank" rel="noreferrer" className='inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition'>
            GitHub Repo
        </a>)
        }
    </div>
</div>

        </>
    )
}

export default ProductDetailPage;