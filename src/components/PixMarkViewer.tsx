import React, { useRef, useState, useEffect } from "react";

interface IAnnotation {
  text: string;
  boundingBox: {
    x0: number; // top left
    y0: number;
    x1: number; // bottom right
    y1: number;
  };
}

interface IPixMarkViewer {
  src: string | undefined;
  selectedResults: IAnnotation[];
  hoveringOverAnnotation?: IAnnotation;
}

const PixMarkViewer: React.FC<IPixMarkViewer> = ({ src, selectedResults, hoveringOverAnnotation }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!src || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageObj = new Image();
    imageObj.onload = () => {
      const { width: imgWidth, height: imgHeight } = imageObj;
      const { clientWidth: canvasWidth, clientHeight: canvasHeight } = canvas;

      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;
      const calculatedScale = imgRatio > canvasRatio
        ? canvasWidth / imgWidth
        : canvasHeight / imgHeight;

      setScale(calculatedScale);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(imageObj, 0, 0, imgWidth * calculatedScale, imgHeight * calculatedScale);
    };

    imageObj.src = src;
  }, [src]);

  if (!src) return <div>Image Preview</div>;

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <canvas ref={canvasRef} width={900} height={900} />
      </div>
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="image-large" width="100%" height="100%">
          {selectedResults.map((box, i) => (
            <rect
              key={i}
              x={box.boundingBox.x0 * scale}
              y={box.boundingBox.y0 * scale}
              width={(box.boundingBox.x1 - box.boundingBox.x0) * scale}
              height={(box.boundingBox.y1 - box.boundingBox.y0) * scale}
              style={{ fill: "none", stroke: "lime", strokeWidth: 1 }}
            />
          ))}
          {hoveringOverAnnotation && (
            <rect
              x={hoveringOverAnnotation.boundingBox.x0 * scale}
              y={hoveringOverAnnotation.boundingBox.y0 * scale}
              width={(hoveringOverAnnotation.boundingBox.x1 - hoveringOverAnnotation.boundingBox.x0) * scale}
              height={(hoveringOverAnnotation.boundingBox.y1 - hoveringOverAnnotation.boundingBox.y0) * scale}
              style={{ fill: "none", stroke: "red", strokeWidth: 1 }}
            />
          )}
        </svg>
      </div>
    </div>
  );
};

export default PixMarkViewer;