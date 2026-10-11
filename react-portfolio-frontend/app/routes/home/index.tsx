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

function getImageUrl(image: any, baseUrl: string) {
  const url = image?.url || image?.data?.attributes?.url;
  if (!url) return '/images/no-image.png';
  return url.startsWith('http') ? url : `${baseUrl}${url}`;
}

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
  const baseUrl = import.meta.env.VITE_STRAPI_URL;

  const projectQuery = new URLSearchParams({
    "filters[featured][$eq]": "true",
    populate: "*",
    "pagination[pageSize]": "2",
  });
  const postQuery = new URLSearchParams({
    populate: "image",
    "sort[0]": "date:desc",
    "pagination[pageSize]": "3",
  });

  const fetchCollection = async (url: string, collection: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`Strapi ${collection} fetch failed: ${response.status}`);
        return [];
      }

      const json = await response.json();
      if (!Array.isArray(json.data)) {
        console.error(`Strapi ${collection} response did not contain a data array`);
        return [];
      }
      return json.data;
    } catch (error) {
      console.error(`Strapi ${collection} fetch failed`, error);
      return [];
    }
  };

  const [projectData, postData] = await Promise.all([
    fetchCollection(`${baseUrl}/api/projects?${projectQuery}`, "projects"),
    fetchCollection(`${baseUrl}/api/posts?${postQuery}`, "posts"),
  ]);

  const projects = projectData.map((item: any) => {
    const a = item.attributes ?? item;
    return {
      id: item.id,
      documentId: item.documentId,
      title: a.title,
      description: a.description,
      image: getImageUrl(a.image, baseUrl),
      url: a.url,
      date: a.date,
      category: a.category,
      techstack: a.techstack,
      featured: a.featured,
    };
  });

  const posts = postData.map((item: any) => {
    const a = item.attributes ?? item;
    return {
      id: item.id,
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      body: "",
      image: "/images/no-image.png",
      date: a.date,
    };
  });

  return { projects, posts };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData;
  return (
    <>
      <FeatureProject projects={projects} count={2} />
      <AboutPreview />
      <LatestPosts posts={posts} />
    </>
  );
};

export default HomePage;