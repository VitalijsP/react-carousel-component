import './carousel.scss';

import React, { FC, useState } from 'react';

import { CardData, cardsData } from '../../data/cardsData';
import { Arrow } from '../arrow/Arrow';

const createSlides = 1;

export const Carousel: FC = () => {
  const [sources, setSources] = useState<CardData[]>(cardsData);
  const [initialX, setInitialX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  console.log(sources);

  const firstCard = sources[0];
  const lastCard = sources[sources.length - 1];

  const shiftLeft = () => {
    const changedOrderSources = [...sources];
    changedOrderSources.pop();
    changedOrderSources.unshift(lastCard);

    setSources(changedOrderSources);
  };

  const shiftRight = () => {
    const changedOrderSources = [...sources];
    changedOrderSources.shift();
    changedOrderSources.push(firstCard);
    setSources(changedOrderSources);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setInitialX(e.pageX);
    setIsDragging(true);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDragging) {
      setCurrentX(e.pageX);
    }

  };

  return (
    <div
      className="carousel"
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseUp={(e) => handleMouseUp(e)}
      onMouseMove={(e) => handleMouseMove(e)}
      onDragStart={(e) => e.preventDefault()}
    >
      <Arrow side="left" slideChanger={shiftLeft} />
      {sources
        .filter((card, index) => index < createSlides)
        .map(({ url, urlTest, title, body }) => (
          <div className={`slide ${isDragging && "grabbing"}`} key={title}>
            <h1>{title}</h1>
            <h3>{body}</h3>
            <div className="img-wrapper">
            <img src={urlTest} alt="image" title={title} />
            </div>
            <a className="button" href="#ReadMore">
              Read more...
            </a>
          </div>
        ))}
      <Arrow side="right" slideChanger={shiftRight} />
    </div>
  );
};
