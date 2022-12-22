import Image from 'next/image';

import classes from './hero.module.css';

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/site/subash.jpg'
          alt='An image showing Subash'
          width={300}
          height={300}
          priority
        />
      </div>
      <h1>Hi, I&apos;m Subash</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore in
        error doloribus ex ipsa. Repellendus!
      </p>
    </section>
  );
};

export default Hero;
