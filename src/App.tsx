import './app.scss';

import React, { FC } from 'react';

import { Carousel } from './carousel/Carousel';
import { slideData } from './data/slideData';

export const App: FC = () => {
  return (
    <>
      <Carousel visibleSlides={3}>
        {slideData.map(({ url, urlTest, title, body }, index) => (
          <div className="slide" key={`${title.slice(0, 2)}${index}`}>
            <h1>{title}</h1>
            <h3>{body}</h3>
            <div className="img-wrapper">
              <img draggable={false} src={urlTest} alt="image" title={title} />
            </div>
            <a className="button" href="#">
              Read more...
            </a>
          </div>
        ))}
      </Carousel>
    </>
  );
};
