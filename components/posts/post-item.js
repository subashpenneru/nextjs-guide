import Image from 'next/image';
import Link from 'next/link';

import classes from './post-item.module.css';
import { getFormattedDate } from '../../utils';

const PostItem = ({ post: { title, image, excerpt, date, slug } }) => {
  const imagePath = `/images/posts/${image}`;

  return (
    <li className={classes.post}>
      <Link href={`/posts/${slug}`}>
        <div className={classes.image}>
          <Image src={imagePath} alt={title} width={300} height={200} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <time>{getFormattedDate(date)}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
};

export default PostItem;
