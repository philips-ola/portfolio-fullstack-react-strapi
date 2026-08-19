import ReactMarkdown from 'react-markdown';
import type { Route } from './+types/details';
import type { PostMeta, StrapiPost, StrapiResponse } from '~/types';
import { Link, useLoaderData } from 'react-router';

export async function loader({ params }: Route.LoaderArgs) {
    const { slug } = params;
    if (!slug) throw new Response('Missing slug', { status: 400 });

    const baseUrl = import.meta.env.VITE_STRAPI_URL;
    const url = `${baseUrl}/api/posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=image`;

    const res = await fetch(url);
    if (!res.ok) throw new Response('Failed to fetch post', { status: res.status });

    const json: StrapiResponse<StrapiPost> = await res.json();
    if (!json.data.length) throw new Response('Not found', { status: 404 });

    const item = json.data[0] as any; // use `any` check to handle v4/v5
    // Strapi v4: item.attributes, Strapi v5: item directly
    const attributes = item.attributes?? item;

    const imageUrl = attributes.image?.url
       ? attributes.image.url.startsWith('http')
           ? attributes.image.url
            : `${baseUrl}${attributes.image.url}`
        : '/images/no-image.png';

    const post: PostMeta = {
        id: item.id,
        slug: attributes.slug,
        excerpt: attributes.excerpt,
        title: attributes.title,
        date: attributes.date,
        body: attributes.body,
        image: imageUrl,
    };

    return { post };
}

const BlogPostdetailsPage = () => {
    const { post } = useLoaderData() as { post: PostMeta };

    return (
        <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold text-blue-400 mb-2">
                {post.title}
            </h1>
            <p className="text-sm text-gray-400 mb-6">
                {new Date(post.date).toDateString()}
            </p>

            {post.image && (
                <img src={post.image} alt={post.title} className="w-full rounded-lg mb-6 object-cover" />
            )}

            <article className="prose prose-invert max-w-none">
                <ReactMarkdown>{post.body}</ReactMarkdown>
            </article>

            <Link to={'/blog'} className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition mt-8">
                Back to Posts
            </Link>
        </div>
    );
};

export default BlogPostdetailsPage;