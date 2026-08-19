import { useState } from "react";
import type { Route } from "./+types/index";
import type { PostMeta, StrapiPost, StrapiResponse } from "~/types";
import PostCard from "~/components/PostCard";
import Pagination from "~/components/Pagination";
import PostFilter from "~/components/PostFilter";

// Using loader to fetch data instead of useEffect
export async function loader({ request }: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

  //console.log("FETCHING FROM:", `${STRAPI_URL}/api/posts`); // check your terminal

  const res = await fetch(`${STRAPI_URL}/api/posts?populate=image&sort=date:desc`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Strapi failed: ${res.status}`);

  const json: StrapiResponse<StrapiPost> = await res.json();
  
  // If this log shows your old markdown titles, your Strapi DB still has markdown data
  //console.log("STRAPI DATA:", json.data.map((d: any) => d.title));

  const posts = json.data.map((item: any) => {
    const imgUrl = item.image?.url || item.image?.data?.attributes?.url;
    return {
      id: String(item.id),
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      date: item.date,
      body: item.body,
      image: imgUrl ? `${STRAPI_URL}${imgUrl}` : '/images/no-image.png',
    };
  });

  return { posts };
}
const BlogPage = ({loaderData}:Route.ComponentProps) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4
    
    const {posts} = loaderData;
    
    const filterPosts = posts.filter((post) => {
        const query = searchQuery.toLowerCase();
        return(
            post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query)
        )
        })


    const totalPages = Math.ceil(filterPosts.length/postsPerPage);
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = filterPosts.slice(indexOfFirst, indexOfLast);

    // console.log(posts);
    return(
        <div className="max-w-3xl mx-auto mt-10 px-6 py-10 bg-gray-900">
        <h2 className="text-3xl font-bold mb-8 text-center">
                My Blog
        </h2>
        <PostFilter searchQuery={searchQuery} onSearchChange={(query) => {setSearchQuery(query); setCurrentPage(1);}} />
        
        <div className="space-y-8">
            {currentPosts.length === 0 ? (
                <p className="text-gray-400 text-center">
                    No post found
                </p>
            ): (currentPosts.map((post) =>(
            <PostCard  key={post.slug} post={post} />
        )))}
        </div>
        


        {
            totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
            )
        }
        </div>
    )
}
export default BlogPage;