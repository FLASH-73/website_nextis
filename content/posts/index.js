import { post as universalConstructor } from "./the-universal-constructor";

// Add new posts here. Newest first.
const posts = [universalConstructor];

export function getAllPosts() {
    return [...posts].sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );
}

export function getPostBySlug(slug) {
    return posts.find((p) => p.slug === slug) || null;
}
