import "./carousel.scss";
import React, { FC, useEffect, useState } from "react";
import { CardData, cardsData } from "../data/cardsData";

export const Carousel: FC = () => {
  const [sources, setSources] = useState<CardData[]>(cardsData);
  const [dragDirection, setDragDirection] = useState<number[]>([]);
  const [touchDirection, setTouchDirection] = useState<number[]>([]);

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
    <div className="carousel">
      {sources
        .filter((card, index) => index < 3)
        .map(({ url, urlTest, title, body }) => (
          <div
            onMouseDown={(e) => setDragDirection([e.clientX])}
            onMouseUp={(e) => setDragDirection([...dragDirection, e.clientX])}
            onTouchStart={(e) =>
              setTouchDirection([e.changedTouches[0].clientX])
            }
            onTouchEnd={(e) =>
              setTouchDirection([
                ...touchDirection,
                e.changedTouches[0].clientX,
              ])
            }
            className={`slide grabbing`}
            key={title}
          >
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
    </div>
  );
};
