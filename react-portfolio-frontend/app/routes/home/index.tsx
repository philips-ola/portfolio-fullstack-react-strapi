import type { Route } from "./+types/index";
import FeatureProject from "~/components/FeatureProjects";
import type { Project, PostMeta } from "~/types";
import AboutPreview from "~/components/AboutPreview";
import LatestPosts from "~/components/LatestPosts";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home | React Developer" },
    { name: "description", content: "Philips Ola portfolio, react developer in Nigeria" },
    { name: "author", content: "Philips Ola" },
  ];
}

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
  const url = new URL(request.url);
  
  const [projectRes, postRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects`),
    fetch(new URL('/posts-meta.json', url))
  ]);

  if (!projectRes.ok || !postRes.ok) {
    throw new Response('Failed to fetch projects or posts', { status: 500 });
  }

  const [projects, posts] = await Promise.all([
    projectRes.json(),
    postRes.json()
  ]);

  return { projects, posts };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData;
  return (
    <>
      <FeatureProject projects={projects} count={2} />
      <AboutPreview />
      <LatestPosts posts={posts}/>
    </>
  );
};

export default HomePage;