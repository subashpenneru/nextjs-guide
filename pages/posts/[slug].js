import Head from 'next/head';

import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '../../utils/posts';

const PostDetailPage = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name='description' content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  );
};

export async function getStaticProps(ctx) {
  const {
    params: { slug },
  } = ctx;
  const data = getPostData(slug);

  return {
    props: {
      post: data,
    },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  const files = getPostsFiles();

  return {
    paths: files
      .map((file) => file.replace(/\.md$/, ''))
      .map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export default PostDetailPage;
