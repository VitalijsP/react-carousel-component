import "./dots.scss";

import React, { FC, ReactNodeArray } from "react";

type Props = {
  children: ReactNodeArray;
  currIndex: number;
  onClickHandler: (i: number) => void;
};

export const Dots: FC<Props> = ({ children, currIndex, onClickHandler }) => (
  <div className="carousel__dots">
    {children.map((_dot, i) => (
      <div
        key={i}
        className={`
            carousel__dot 
            ${currIndex === i && "active"}
          `}
        onClick={() => onClickHandler(i)}
      >
        {""}
      </div>
    ))}
  </div>
);
