import { getAllPosts, getPostBySlug } from "@/content/posts";
import PostContent from "./PostContent";
import { notFound } from "next/navigation";

export function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return {};
    return {
        title: `${post.en.title} \u2014 Nextis`,
        description: post.en.description,
        openGraph: {
            title: `${post.en.title} \u2014 Nextis`,
            description: post.en.description,
        },
    };
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();
    return <PostContent slug={slug} />;
}
