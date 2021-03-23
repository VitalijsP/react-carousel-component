import './carousel.scss';

import React, { FC, ReactNodeArray, useEffect, useState } from 'react';

type Props = {
  visibleSlides?: number;
  children: ReactNodeArray;
};

export const Carousel: FC<Props> = ({ children, visibleSlides = 1 }) => {
  const [sources, setSources] = useState<ReactNodeArray>(children);
  const [dragDirection, setDragDirection] = useState<number[]>([]);
  const [touchDirection, setTouchDirection] = useState<number[]>([]);
  const [translate, setTtranslate] = useState(0);  

  // console.log(
  //   `%c 'children: ', ${children}`,
  //   "color: red; font-size:20px"
  //   )

  // console.log('children: ',children)

  const firstSlide = sources[0];
  const lastSlide = sources[sources.length - 1];

  const shiftLeft = () => {
    const changedOrderSources = [...sources];
    changedOrderSources.pop();
    changedOrderSources.unshift(lastSlide);
    setSources(changedOrderSources);
  };

  const shiftRight = () => {
    const changedOrderSources = [...sources];
    changedOrderSources.shift();
    changedOrderSources.push(firstSlide);
    setSources(changedOrderSources);
  };

  useEffect(() => {
    if (dragDirection.length === 2 && dragDirection[0] > dragDirection[1]) {
      shiftRight();
    } else if (
      dragDirection.length === 2 &&
      dragDirection[0] < dragDirection[1]
    ) {
      shiftLeft();
    }
  }, [dragDirection]);

  useEffect(() => {
    if (touchDirection.length === 2 && touchDirection[0] > touchDirection[1]) {
      shiftRight();
    } else if (
      touchDirection.length === 2 &&
      touchDirection[0] < touchDirection[1]
    ) {
      shiftLeft();
    }
  }, [touchDirection]);

  return (
    <div
      className="carousel"
      onMouseDown={(e) => setDragDirection([e.clientX])}
      onMouseUp={(e) => setDragDirection([...dragDirection, e.clientX])}
      onMouseMove={(e) => setTtranslate(e.clientX)}
      onTouchStart={(e) => setTouchDirection([e.changedTouches[0].clientX])}
      onTouchEnd={(e) => setTouchDirection([...touchDirection, e.changedTouches[0].clientX])
      }
    >
      {sources
        .filter((card, index) => index < visibleSlides)
        .map((slide, index) => {
          return (
            <div
              className="slide"
              // style={{
              //   transform: `translate(${translate - dragDirection[0]}px)`,
              // }}
              key={`${index}`}
            >
              {slide}
            </div>
          );
        })}
    </div>
  );
};
