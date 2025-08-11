import { useState, useEffect } from 'react'
import { Circle, Eraser, Hand, Minus, Move, Pencil, Square, Type } from 'lucide-react'
import Tool from './Tool.jsx'
import MySvg from './MySvg.jsx'
import { boardManager } from '../managers/boardManager.js';

function Whiteboard() {
  var svg, s="", tpath, tdot, startX, startY, r;
  let moved = false;
  const {addElement, setDrawing, setTool, setCursor} = boardManager();
  const svgNS = "http://www.w3.org/2000/svg", color = "#F54927", radius = 2.5, fill = "none";

  const onMouseDown = (e) => {
    if (e.button !== 0) return;

    moved = false;

    setDrawing(true);

    startX = e.clientX;
    startY = e.clientY;

    if(boardManager.getState().currentTool === "pencil"){
      s = s + "M" + e.clientX.toString() + " " + e.clientY.toString();

      tdot = document.createElementNS(svgNS, "circle");
      tdot.setAttribute("cx", startX);
      tdot.setAttribute("cy", startY);
      tdot.setAttribute("r", radius);
      tdot.setAttribute("fill", color);
      svg.appendChild(tdot);

    }else if(boardManager.getState().currentTool === "line"){

      tdot = document.createElementNS(svgNS, "circle");
      tdot.setAttribute("cx", startX);
      tdot.setAttribute("cy", startY);
      tdot.setAttribute("r", radius);
      tdot.setAttribute("fill", color);
      svg.appendChild(tdot);
      
    }else if(boardManager.getState().currentTool === "rect"){

      tdot = document.createElementNS(svgNS, "circle");
      tdot.setAttribute("cx", startX);
      tdot.setAttribute("cy", startY);
      tdot.setAttribute("r", radius);
      tdot.setAttribute("fill", color);
      svg.appendChild(tdot);

    }else if(boardManager.getState().currentTool === "circle"){

      tdot = document.createElementNS(svgNS, "circle");
      tdot.setAttribute("cx", startX);
      tdot.setAttribute("cy", startY);
      tdot.setAttribute("r", radius);
      tdot.setAttribute("fill", color);
      svg.appendChild(tdot);
      
    }
  }

  const onMouseMove = (e) => {
    if (e.button !== 0) return;

    if(boardManager.getState().drawing){

      if(boardManager.getState().currentTool === "pencil"){

        s = s + " " + "L" + e.clientX.toString() + " " + e.clientY.toString();

        if(!moved){
          tpath = document.createElementNS(svgNS, "path");
          tpath.setAttribute("stroke", color);
          tpath.setAttribute("stroke-width", (radius * 2).toString());
          tpath.setAttribute("fill", fill);
          svg.appendChild(tpath);
          moved = true;
        }

        tpath.setAttribute("d", s);

      }else if(boardManager.getState().currentTool === "line"){

        if(!moved){

          tpath = document.createElementNS(svgNS, "line");
          tpath.setAttribute("x1", startX);
          tpath.setAttribute("y1", startY);
          tpath.setAttribute("stroke", color);
          tpath.setAttribute("stroke-width", radius*2);
          moved = true;
          svg.removeChild(tdot);

        }
        tpath.setAttribute("x2", e.clientX);
        tpath.setAttribute("y2", e.clientY);
        svg.appendChild(tpath);

      }else if(boardManager.getState().currentTool === "rect"){

        if(!moved){
          tpath = document.createElementNS(svgNS, "rect");
          tpath.setAttribute("stroke", color);
          tpath.setAttribute("stroke-width", radius * 2);
          tpath.setAttribute("fill", "transparent");
          moved = true;
          svg.removeChild(tdot);
        }

        if(e.clientX >= startX && e.clientY >= startY){

          tpath.setAttribute("x", startX);
          tpath.setAttribute("y", startY);
          tpath.setAttribute("width", e.clientX - startX);
          tpath.setAttribute("height", e.clientY - startY);
        
        }else if(e.clientX < startX && e.clientY >= startY){

          tpath.setAttribute("x", e.clientX);
          tpath.setAttribute("y", startY);
          tpath.setAttribute("width", startX - e.clientX);
          tpath.setAttribute("height", e.clientY - startY);

        }else if(e.clientX >= startX && e.clientY < startY){

          tpath.setAttribute("x", startX);
          tpath.setAttribute("y", e.clientY);
          tpath.setAttribute("width", e.clientX - startX);
          tpath.setAttribute("height", startY - e.clientY);

        }else if(e.clientX < startX && e.clientY < startY){

          tpath.setAttribute("x", e.clientX);
          tpath.setAttribute("y", e.clientY);
          tpath.setAttribute("width", startX - e.clientX);
          tpath.setAttribute("height", startY - e.clientY);

        }
        svg.appendChild(tpath);
        
      }else if(boardManager.getState().currentTool === "circle"){

        if(!moved){
          tpath = document.createElementNS(svgNS, "circle");
          tpath.setAttribute("stroke", color);
          tpath.setAttribute("fill", "transparent");
          tpath.setAttribute("stroke-width", radius * 2);
          moved = true;
          svg.appendChild(tpath);
          svg.removeChild(tdot);
        }

        if(e.clientX >= startX && e.clientY >= startY){

          tpath.setAttribute("cx", startX);
          tpath.setAttribute("cy", startY);
          r = Math.sqrt(Math.pow(e.clientX - startX, 2) + Math.pow(e.clientY - startY, 2));
          tpath.setAttribute("r", r);
        
        }else if(e.clientX < startX && e.clientY >= startY){

          tpath.setAttribute("cx", startX);
          tpath.setAttribute("cy", startY);
          r = Math.sqrt(Math.pow(startX - e.clientX, 2) + Math.pow(e.clientY - startY, 2));
          tpath.setAttribute("r", r);

        }else if(e.clientX >= startX && e.clientY < startY){

          tpath.setAttribute("cx", startX);
          tpath.setAttribute("cy", startY);
          r = Math.sqrt(Math.pow(e.clientX - startX, 2) + Math.pow(startY - e.clientY, 2));
          tpath.setAttribute("r", r);

        }else if(e.clientX < startX && e.clientY < startY){

          tpath.setAttribute("cx", startX);
          tpath.setAttribute("cy", startY);
          r = Math.sqrt(Math.pow(startX - e.clientX, 2) + Math.pow(startY - e.clientY, 2));
          tpath.setAttribute("r", r);

        }

      }
    }
  }

  const onMouseUp = (e) => {
    if (e.button !== 0) return;
    
    setDrawing(false);

    if(boardManager.getState().currentTool === "pencil"){

      if(moved){
        tdot = document.createElementNS(svgNS, "circle");
        tdot.setAttribute("cx", e.clientX);
        tdot.setAttribute("cy", e.clientY);
        tdot.setAttribute("r", radius);
        tdot.setAttribute("fill", color);
        svg.appendChild(tdot);
        moved = false;
      }

      addElement(s);
      s = "";

    }else if(boardManager.getState().currentTool === "line"){

      if(!moved && tdot && svg.contains(tdot)){
        svg.removeChild(tdot);
      }
      moved = false;
      addElement(tpath);

    }else if(boardManager.getState().currentTool === "rect"){

      if(!moved && tdot && svg.contains(tdot)){
        svg.removeChild(tdot);
      }
      moved = false;
      addElement(tpath);
      
    }else if(boardManager.getState().currentTool === "circle"){

      if(!moved && tdot && svg.contains(tdot)){
        svg.removeChild(tdot);
      }
      moved = false;
      addElement(tpath);
      
    }
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

                    <Tool Icon={Hand} onClick={() => {setTool("hand"); setCursor("grab")}} toolName={"hand"}/>
                    <Tool Icon={Move} onClick={() => {setTool("move"); setCursor("move")}} toolName={"move"}/>
                    <Tool Icon={Pencil} onClick={() => {setTool("pencil"); setCursor("crosshair")}} toolName={"pencil"}/>
                    <Tool Icon={Minus} onClick={() => {setTool("line"); setCursor("crosshair")}} toolName={"line"}/>
                    <Tool Icon={Square} onClick={() => {setTool("rect"); setCursor("crosshair")}} toolName={"rect"}/>
                    <Tool Icon={Circle} onClick={() => {setTool("circle"); setCursor("crosshair")}} toolName={"circle"}/>
                    <Tool Icon={Eraser} onClick={() => {setTool("eraser"); setCursor("circle")}} toolName={"eraser"}/>
                    <Tool Icon={Type} onClick={() => {setTool("type"); setCursor("text")}} toolName={"type"}/>

                </div>
            </div>
        </div>
      <MySvg/>
    </div>
  )
}

export default Whiteboard
