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

  try {
    const projectQuery = new URLSearchParams({
      "filters[featured][$eq]": "true",
      populate: "image",
      "fields[0]": "title",
      "fields[1]": "description",
      "fields[2]": "url",
      "fields[3]": "date",
      "fields[4]": "category",
      "fields[5]": "techstack",
      "fields[6]": "featured",
      "pagination[pageSize]": "2",
    });
    const postQuery = new URLSearchParams({
      "sort[0]": "date:desc",
      "fields[0]": "title",
      "fields[1]": "slug",
      "fields[2]": "excerpt",
      "fields[3]": "date",
      "pagination[pageSize]": "3",
    });

    const [projectRes, postRes] = await Promise.all([
      fetch(`${baseUrl}/api/projects?${projectQuery}`),
      fetch(`${baseUrl}/api/posts?${postQuery}`),
    ]);

    if (!projectRes.ok || !postRes.ok) {
      console.error("Strapi fetch failed", projectRes.status, postRes.status);
      return { projects: [], posts: [] };
    }

    const [projectJson, postJson] = await Promise.all([
      projectRes.json(),
      postRes.json(),
    ]);

    const projectData = Array.isArray(projectJson.data) ? projectJson.data : [];
    const postData = Array.isArray(postJson.data) ? postJson.data : [];

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
        featured: a.featured
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
  } catch (e) {
    console.error(e);
    // NEVER throw here, just return empty so home page still renders
    return { projects: [], posts: [] };
  }
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