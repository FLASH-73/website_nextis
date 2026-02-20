import { getAllPosts } from "@/content/posts";

export default function sitemap() {
    const baseUrl = "https://website-nextis.vercel.app";

    const staticPages = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ];

    const blogPosts = getAllPosts().map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    return [...staticPages, ...blogPosts];
}
