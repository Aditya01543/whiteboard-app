import { useState, useEffect } from 'react'
import './App.css'

function App() {
  var svg, rc, s="", tsvg, tpath, tdot;
  let drawing = false, moved = false;
  let elements = [];

  const onMouseDown = (e) => {
    s = s + "M" + e.clientX.toString() + " " + e.clientY.toString();

    tdot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    tdot.setAttribute("cx", e.clientX);
    tdot.setAttribute("cy", e.clientY);
    tdot.setAttribute("r", 2.5);
    tdot.setAttribute("fill", "#F54927");
    svg.appendChild(tdot);

    drawing = true;
  }

  const onMouseMove = (e) => {
    if(drawing){
      s = s + " " + "L" + e.clientX.toString() + " " + e.clientY.toString();

      if(!moved){
        tpath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        tpath.setAttribute("stroke", "#F54927");
        tpath.setAttribute("stroke-width", "5");
        tpath.setAttribute("fill", "none");
        svg.appendChild(tpath);
        moved = true;
      }

      tpath.setAttribute("d", s);
    }
  }

  const onMouseUp = (e) => {
    drawing = false;

    if(moved){
      tdot = document.createElementNS("http://www.w3.org/2000/svg", "#F54927");
      tdot.setAttribute("cx", e.clientX);
      tdot.setAttribute("cy", e.clientY);
      tdot.setAttribute("r", 2.5);
      tdot.setAttribute("fill", "black");
      svg.appendChild(tdot);
      
      moved = false;
    }

    elements.push(s);
    s = "";
  }

  useEffect(() => {
    svg = document.getElementById('svg');
    // rc = rough.svg(svg);
    if (svg) {
      svg.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }

    return () => {
      svg.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }
  }, []);

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <svg id='svg' width="100%" height="100%"></svg>
    </div>
  )
}

export default App
