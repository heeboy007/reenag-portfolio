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
  console.log(result)
  return result
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md?$/, '');
  const fullPath = path.join(POSTS_PATH, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents, {
    engines: {
      yaml: (str) => yaml.load(str) as object
    }
  });

  return { slug: realSlug, meta: data, content };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug));
  // 날짜 순 정렬 등의 로직 추가 가능
  return posts;
}