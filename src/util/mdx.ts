import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import matter from 'gray-matter';

const POSTS_PATH = path.join(process.cwd(), 'blog_vault/Blog/Posts');

export function getPostSlugs() {
  const result =  fs.readdirSync(POSTS_PATH, {
    recursive: true,
    withFileTypes: true
  }).filter((path) => /\.md?$/.test(path.name)).map((path) => (path.parentPath.slice(POSTS_PATH.length) + '/' + path.name));
  return result
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md?$/, '');
  const fullPath = path.join(POSTS_PATH, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const imagedContent = fileContents.replace(/!\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, (match, imageName) => {
    // 공백이나 경로 찌꺼기 정리
    const trimmedName = imageName.trim();
    return `\n![${trimmedName}](/api/blog/images/${encodeURI(trimmedName)})\n`;
  });

  const { data, content } = matter(imagedContent, {
    engines: {
      yaml: (str) => yaml.load(str) as object
    }
  });

  return { slug: realSlug, meta: data, content };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post_a, post_b) => {
      const date_a = new Date(post_a.meta.date)
      const date_b = new Date(post_b.meta.date)
      return date_b.getTime() - date_a.getTime()
    })
  return posts;
}
