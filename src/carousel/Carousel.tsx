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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [translate, setTranslate] = useState(0);

  // console.log(
  //   `%c 'children: ', ${children}`,
  //   "color: red; font-size:20px"
  //   )

  // console.log('children: ',children)

  const firstSlide = sources[0];
  const lastSlide = sources[sources.length - 1];

  const shiftLeft = () => {
    setCurrentIndex(currentIndex - 1);
    if (currentIndex <= 0) {
      setCurrentIndex(sources.length - 1);
    }
    const changedOrderSources = [...sources];
    changedOrderSources.pop();
    changedOrderSources.unshift(lastSlide);
    setSources(changedOrderSources);
  };

  const shiftRight = () => {
    setCurrentIndex(currentIndex + 1);
    if (currentIndex >= sources.length - 1) {
      setCurrentIndex(0);
    }
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

  const mouseDownHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // setTranslate([...translate, ])
    setDragDirection([e.clientX]);
    setIsDragging(true);
  };

  const mouseUpHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDragDirection([...dragDirection, e.clientX]);
    setIsDragging(false);
  };

  const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDragging) {
      setTranslate(e.clientX)
    }
  }

  return (
    <div
      className="carousel"
      onMouseDown={(e) => mouseDownHandler(e)}
      onMouseUp={(e) => mouseUpHandler(e)}
      onMouseMove={(e) => mouseMoveHandler(e)}
      onTouchStart={(e) => setTouchDirection([e.changedTouches[0].clientX])}
      onTouchEnd={(e) =>
        setTouchDirection([...touchDirection, e.changedTouches[0].clientX])
      }
    >
      {sources
        .filter((card, index) => index < visibleSlides)
        .map((slide, index) => {
          return (
            <div
              key={`${index}`}
              className="slide"
              style={{ transform: `translate(${translate - dragDirection[0]}px)`}}
            >
              {slide}
            </div>
          );
        })}
    </div>
  );
};
