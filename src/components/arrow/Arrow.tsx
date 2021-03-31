import "./arrow.scss";

import React, { FC } from "react";

type Props = {
  position: "left" | "right";
  handleOnClick: () => void;
};

export const Arrow: FC<Props> = ({ children, position, handleOnClick }) => (
  <div onClick={handleOnClick} className={`arrow ${position}`}>
    {children}
  </div>
);
