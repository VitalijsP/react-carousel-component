// import './carousel.css';

// import React, { FC, ReactNodeArray, useEffect, useRef, useState } from 'react';

// type Props = {
//   children: ReactNodeArray;
// };

// const Carousel: FC<Props> = ({ children }) => {
//   const [initialX, setInitialX] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [currentX, setCurrentX] = useState(0);
//   const [transform, setTransform] = useState(0);

//   const slider = useRef<HTMLDivElement>(null);
//   console.log("slider: ", slider);
//   const animation = () => {
//     if (isDragging) requestAnimationFrame(animation);
//   };

//   const handleMouseStart = (
//     e: React.MouseEvent<HTMLDivElement, MouseEvent>
//   ) => {
//     setInitialX(e.pageX);
//     setIsDragging(true);
//     if (slider.current) {
//       const transformMetric = window
//         .getComputedStyle(slider.current)
//         .getPropertyValue("transform");
//         if (transformMetric !== 'none') {
//       setTransform(parseInt(transformMetric.split(",")[4].trim()));
//       }
//       console.log("transform: ", transform);
//       console.log("transformMetric: ", transformMetric);
//     }
//   };

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     if (isDragging) {
//       setCurrentX(e.pageX);
//       if (slider.current) {
//         slider.current.style.backgroundColor = 'red';
//         // slider.current.style.transform = `translateX(900px)`;
//       }
//     }
//   };

//   const handleMouseEnd = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     setInitialX(e.pageX);
//     setIsDragging(false);
//   };

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const prevIndex = currentIndex === 0 ? children.length - 1 : currentIndex - 1;
//   const nextIndex = currentIndex >= children.length - 1 ? 0 : currentIndex + 1;

//   const slides = [
//     children[prevIndex],
//     children[currentIndex],
//     children[nextIndex],
//   ];

//   /* Disable context menu */
//   window.oncontextmenu = (e: MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     return false;
//   };

//   // const touchStart = (e: React.TouchEvent<HTMLDivElement>) => {
//   //   // setCurrentIndex(index);
//   //   let positionX = e.touches[0].pageX;
//   //   setStartPosition(positionX);
//   //   setIsDragging(true);
//   // };

//   // useEffect(() => {
//   //   const next = (current + 1) % slides.length;
//   //   const id = setTimeout(() => setCurrent(next), 3000);
//   //   return () => clearTimeout(id);
//   // }, [current]);
//   /* The number of slides is determined by slides.length. 
//   Due to the modulo operation, we ensure that the current slide is always 
//   between 0 (inclusive) and the number of slides (exclusive). */

//   return (
//     <div
//       className="carousel"
//       onDragStart={(e) => e.preventDefault()}
//       onMouseDown={(e) => handleMouseStart(e)} //index
//       onMouseMove={(e) => handleMouseMove(e)}
//       onMouseUp={(e) => handleMouseEnd(e)}
//       // onMouseLeave={(e) => mouseEnd(e)}
//       // onTouchStart={(e) => touchStart(e)} //index
//       // onTouchEnd={() => touchEnd()}
//       // onTouchMove={() => touchMove()}
//     >
//       {slides.map((slide, index) => {
//         return (
//           <div ref={slider} key={`${index}`}>
//             {slide}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Carousel;
