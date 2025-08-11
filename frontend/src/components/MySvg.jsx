import React from 'react'
import { boardManager } from '../managers/boardManager.js';

const cursorMap = {
  grab: "cursor-grab",
  move: "cursor-move",
  crosshair: "cursor-crosshair",
  text: "cursor-text",
  circle: "cursor-circle" // custom shape, if you define it
};

const MySvg = () => {
  const cursor = boardManager(state => state.cursor);
  return (
    <svg 
      id="svg" 
      width="100%" 
      height="100%" 
      className={cursorMap[cursor] || "cursor-default"}
    ></svg>
  );
};

export default MySvg;