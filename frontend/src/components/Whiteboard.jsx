import { useState, useEffect } from 'react'
import { Circle, Hand, Minus, Move, Pencil, Square, Type } from 'lucide-react'
import Tool from './Tool.jsx'
import { boardManager } from '../managers/boardManager.js';

function Whiteboard() {
  var svg, rc, s="", tsvg, tpath, tdot;
  let moved = false;
  const {addElement, setDrawing, setTool} = boardManager();

  const onMouseDown = (e) => {
    if (e.button !== 0) return;

    s = s + "M" + e.clientX.toString() + " " + e.clientY.toString();

    tdot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    tdot.setAttribute("cx", e.clientX);
    tdot.setAttribute("cy", e.clientY);
    tdot.setAttribute("r", 2.5);
    tdot.setAttribute("fill", "#F54927");
    svg.appendChild(tdot);

    setDrawing(true);
  }

  const onMouseMove = (e) => {
    if (e.button !== 0) return;

    if(boardManager.getState().drawing){
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

  const pencil = () => {
    setTool("pencil");
  }

  const move = () => {
    setTool("move");
  }

  const hand = () => {
    setTool("hand");
  }

  const minus = () => {
    setTool("minus");
  }

  const square = () => {
    setTool("square");
  }

  const circle = () => {
    setTool("circle");
  }

  const type = () => {
    setTool("type");
  }

  const onMouseUp = (e) => {
    if (e.button !== 0) return;
    
    setDrawing(false);

    if(moved){
      tdot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      tdot.setAttribute("cx", e.clientX);
      tdot.setAttribute("cy", e.clientY);
      tdot.setAttribute("r", 2.5);
      tdot.setAttribute("fill", "#F54927");
      svg.appendChild(tdot);
      
      moved = false;
    }

    addElement(s);
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
        <div className='w-full h-full border-8 border-transparent absolute pointer-events-none'>
            <div className='absolute top-0 w-full flex justify-center pointer-events-auto'>
                <div className='flex justify-center space-x-1'>

                    <Tool Icon={Hand} onClick={hand}/>
                    <Tool Icon={Move} onClick={move}/>
                    <Tool Icon={Pencil} onClick={pencil}/>
                    <Tool Icon={Minus} onClick={minus}/>
                    <Tool Icon={Square} onClick={square}/>
                    <Tool Icon={Circle} onClick={circle}/>
                    <Tool Icon={Type} onClick={type}/>

                </div>
            </div>
        </div>
      <svg id='svg' width="100%" height="100%"></svg>
    </div>
  )
}

export default Whiteboard
