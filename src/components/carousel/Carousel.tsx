import "./carousel.scss";

import React, { FC, ReactNodeArray, useEffect, useState } from "react";

import { Arrow } from "../arrow/Arrow";
import { Dots } from "../dots/Dots";

type Props = {
  children: ReactNodeArray;
};

export const Carousel: FC<Props> = ({ children }) => {
  const [currIndex, setCurrIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState<number[]>([]);
  const [touchDirection, setTouchDirection] = useState<number[]>([]);
  const [translate, setTranslate] = useState(0);

  const currPosition = (-100 / children.length) * currIndex;

  const moveForward = () => {
    setCurrIndex(currIndex + 1);
    if (currIndex >= children.length - 1) {
      setCurrIndex(0);
    }
  };
  const moveBackward = () => {
    setCurrIndex(currIndex - 1);
    if (currIndex <= 0) {
      setCurrIndex(children.length - 1);
    }
  };

  useEffect(() => {
    if (
      translate > 50 &&
      dragDirection.length === 2 &&
      dragDirection[0] > dragDirection[1]
    ) {
      moveForward();
    } else if (
      translate < -50 &&
      dragDirection.length === 2 &&
      dragDirection[0] < dragDirection[1]
    ) {
      moveBackward();
    }
  }, [dragDirection]);

  useEffect(() => {
    if (
      translate > 50 &&
      touchDirection.length === 2 &&
      touchDirection[0] > touchDirection[1]
    ) {
      moveForward();
    } else if (
      translate < -50 &&
      touchDirection.length === 2 &&
      touchDirection[0] < touchDirection[1]
    ) {
      moveBackward();
    }
  }, [touchDirection]);

  const mouseDownHandler = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragDirection([e.clientX]);
  };

  const mouseUpHandler = (e: React.MouseEvent) => {
    setIsDragging(false);
    setDragDirection([...dragDirection, e.clientX]);
  };

  const mouseMoveHandler = (e: React.MouseEvent) => {
    if (isDragging) {
      setTranslate(dragDirection[0] - e.clientX);
    }
  };

  const touchStartHandler = (e: React.TouchEvent) => {
    setIsDragging(true);
    setTouchDirection([e.changedTouches[0].clientX]);
  };

  const touchEndtHandler = (e: React.TouchEvent) => {
    setIsDragging(false);
    setTouchDirection([...touchDirection, e.changedTouches[0].clientX]);
  };

  const touchMoveHandler = (e: React.TouchEvent) => {
    if (isDragging) {
      setTranslate(touchDirection[0] - e.changedTouches[0].clientX);
    }
  };

  const onClickHandler = (i: number) => {
    setCurrIndex(i);
  };

  return (
    <div className="container">
      <div className="carousel">
        <Arrow position="left" handleOnClick={() => moveBackward()}>
          ➲
        </Arrow>
        <Arrow position="right" handleOnClick={() => moveForward()}>
          ➲
        </Arrow>
        <div
          onMouseDown={(e) => mouseDownHandler(e)}
          onMouseUp={(e) => mouseUpHandler(e)}
          onMouseMove={(e) => mouseMoveHandler(e)}
          onTouchStart={(e) => touchStartHandler(e)}
          onTouchEnd={(e) => touchEndtHandler(e)}
          onTouchMove={(e) => touchMoveHandler(e)}
          className="carousel__slides"
          style={{
            transform: `translateX(${currPosition}%)`,
            width: `${100 * children.length}%`,
            cursor: `${isDragging ? "grabbing" : "grab"}`,
          }}
        >
          {children.map((slide, i) => (
            <div
              key={i}
              className="carousel__slide"
              style={{
                flexBasis: `${100 / children.length}%`,
                transform: `${isDragging ? "scale(0.994)" : "scale(1)"}`,
              }}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
      <Dots onClickHandler={(i) => onClickHandler(i)} currIndex={currIndex}>
        {children}
      </Dots>
    </div>
  );
};
