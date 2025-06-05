import React, {useRef, useState} from 'react';
import {ReactSketchCanvas} from 'react-sketch-canvas';



export default function Whiteboard() {
  const canvasRef = useRef(null);
  const [isEraser, setIsEraser] = useState(false);
  const [strokeColor, setStrokeColor] = useState('black');

  const toggleMode = () => {
    const newMode = !isEraser;
    setIsEraser(newMode);
    canvasRef.current?.eraseMode(newMode);
  };

  const clearCanvas = () => {
    canvasRef.current?.clearCanvas();
  };

  return (
    <div className="text-center">
      <h3>Whiteboard</h3>
      
      <div className="mb-3">
        <button onClick={toggleMode} className="btn btn-primary">
          {isEraser ? 'Switch to Draw Mode' : 'Switch to Erase Mode'}
        </button>
        <button onClick={clearCanvas} className="btn btn-secondary ms-2">
          Clear Canvas
        </button>

        <button className ="btn btn-secondary ms-2">
          Choose Your NoteWorthy Color!
          {!isEraser && (
            <input
              type="color"
              value={strokeColor}
              onChange={(e) => setStrokeColor(e.target.value)}
              title="Choose your NoteWorthy color"
            />
          )}
        </button>
      </div>

      <div style={{ border: '2px solid black', height: '500px' }}>
        <ReactSketchCanvas
          ref={canvasRef}
          strokeWidth={4}
          strokeColor={strokeColor}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}