import {useEffect, useState, useLayoutEffect} from 'react';
import rough from 'roughjs';

const roughGenerator = rough.generator();

const WhiteBoard = ({canvasRef, ctxRef, elements, setElements}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctxRef.current = ctx;
  }, []);

  useLayoutEffect(() => {
    const roughtCanvas = rough.canvas(canvasRef.current);
    elements.forEach(element => {
      roughtCanvas.linearPath(element.path);
    });
  }, [elements]);

  const handleMouseDown = e => {
    const {offsetX, offsetY} = e.nativeEvent;
    setElements(prevElemts => [
      ...prevElemts,
      {
        type: 'pencil',
        offsetX,
        offsetY,
        path: [[offsetX, offsetY]],
        stroke: '#000000',
      },
    ]);
    setIsDrawing(true);
  };

  const handleMouseMove = e => {
    const {offsetX, offsetY} = e.nativeEvent;
    if (isDrawing) {
      const {path} = elements[elements.length - 1];
      const newPath = [...path, [offsetX, offsetY]];

      setElements(prevElements =>
        prevElements.map((ele, index) => {
          if (index === elements.length - 1) {
            return {
              ...ele,
              path: newPath,
            };
          } else {
            return ele;
          }
        }),
      );
    }
  };

  const handleMouseUp = e => {
    setIsDrawing(false);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="border border-dark border-3 h-100 w-100"></canvas>
    </>
  );
};

export default WhiteBoard;
