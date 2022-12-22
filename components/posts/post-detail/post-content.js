import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import classes from './post-content.module.css';
import PostHeader from './post-header';

const PostContent = ({ post }) => {
  const custom = {
    p(para) {
      const { node } = para;
      if (node.children[0].tagName === 'img') {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${image.properties.src}`}
              alt={image.properties.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{para.children}</p>;
    },
    code(code) {
      return (
        <SyntaxHighlighter
          language={code.className.split('-')[1]}
          style={atomDark}>
          {code.children}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={`/images/posts/${post.image}`} />
      <ReactMarkdown components={custom}>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
