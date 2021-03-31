import "./app.scss";

import React, { FC } from "react";

import { Carousel } from "./components/carousel/Carousel";
import { slideData } from "./data/slideData";

// const slideDataTest = [
//   "string: index zero",
//   <h1>H1 tag: index one</h1>,
//   <h2>H2 tag: index two</h2>,
//   <h3>H3 tag: index three</h3>,
//   <p>p tag: index Four</p>,
//   <span>Span tag: index five</span>,
//   <img draggable="false" src="https://picsum.photos/300/200" title="image" alt="image"/>
// ];

export const App: FC = () => {
  return (
    <>
      <h1 className="heading__title">Infinite circular Carousel</h1>
      {/* <Carousel>
        {slideDataTest.map((slide, index) => (
          <div key={index}>{slide}</div>
        ))}
      </Carousel> */}
      <Carousel>
        {slideData.map(({ url, title, body }, index) => (
          <div className="slide" key={index}>
            <h1>{title}</h1>
            <p>{body}</p>
            <figure className="img-wrapper">
              <img draggable={false} src={url} alt="image" title={title} />
            </figure>
            <a className="button" href="#">
              Read more...
            </a>
          </div>
        ))}
      </Carousel>
    </>
  );
};
