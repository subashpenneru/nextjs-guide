import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export const getPostsFiles = () => {
  return fs.readdirSync(postsDirectory);
};

export const getPostData = (postIdentifier) => {
  const slug = postIdentifier.replace(/\.md$/, '');
  const fileContent = fs.readFileSync(
    path.join(postsDirectory, `${slug}.md`),
    'utf-8'
  );
  const { data, content } = matter(fileContent);
  const postData = {
    slug,
    ...data,
    content,
  };

  return postData;
};

export const getAllPosts = () => {
  const postFiles = getPostsFiles();

  return postFiles
    .map((file) => getPostData(file))
    .sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
};

export const getFeaturedPosts = () => {
  return getAllPosts().filter((post) => post.isFeatured);
};
