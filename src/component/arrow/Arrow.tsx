import './arrow.scss';

import React, { FC } from 'react';

type Props = {
  side: "left" | "right";
  slideChanger: () => void;
};

export const Arrow: FC<Props> = ({ side, slideChanger }) => {
  return (
    <div className="arrow-wrapper">
    <button
      type="button"
      className={`arrow ${side === "left" ? "left" : "right"}`}
      onClick={slideChanger}
    >
      <span>➛</span>
    </button>
    </div>
  );
};
