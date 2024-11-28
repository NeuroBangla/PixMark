import React, { useState, useEffect } from "react";

type IHexColor = string;

interface IAnnotation {
  text: string;
  boundingBox: {
    x0: number; // top left
    y0: number;
    x1: number; // bottom right
    y1: number;
  };
  color?: IHexColor;
}

interface IPixMarkViewer {
  src: string | undefined;
  selectedResults: IAnnotation[];
  hoveringOverAnnotation?: IAnnotation;
}

const PixMarkViewer: React.FC<IPixMarkViewer> = ({ src, selectedResults, hoveringOverAnnotation }) => {

  const urlToBase64 = (url: string): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve) => {
      fetch(url).then((response) => {
        response.blob().then((blob) => {
          blobToBase64(blob).then((res) => {
            resolve(res);
          });
        });
      });
    });
  };

  const blobToBase64 = (blob: Blob): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };


  if (!src) return <div>Image Preview</div>;

  const [imageBase64, setImageBase64] = useState<string>('');

  useEffect(() => {
    urlToBase64(src).then((res) => {
      setImageBase64(res as string);
    });
  }, [src]);

  const parentRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // print the parent div size
    if (parentRef.current) {
      console.log(parentRef.current.offsetWidth, parentRef.current.offsetHeight);
    }else{
      console.log('parentRef is null');
    }
  }, [parentRef]);


  return (
    <div ref={parentRef} style={{ position: "absolute", width: "100%", height: "100%" }}>
      <svg xmlns="http://www.w3.org/2000/svg" className="image-large" width="100%" height="100%">
        <image href={imageBase64} x="0" y="0" width="900" height="900" />
        {selectedResults.map((box, i) => (
          <rect
            key={i}
            x={box.boundingBox.x0}
            y={box.boundingBox.y0}
            width={box.boundingBox.x1 - box.boundingBox.x0}
            height={box.boundingBox.y1 - box.boundingBox.y0}
            style={{ fill: "none", stroke: box.color || "lime", strokeWidth: 1 }}
          />
        ))}
        {hoveringOverAnnotation && (
          <rect
            x={hoveringOverAnnotation.boundingBox.x0}
            y={hoveringOverAnnotation.boundingBox.y0}
            width={hoveringOverAnnotation.boundingBox.x1 - hoveringOverAnnotation.boundingBox.x0}
            height={hoveringOverAnnotation.boundingBox.y1 - hoveringOverAnnotation.boundingBox.y0}
            style={{ fill: "none", stroke: "red", strokeWidth: 1 }}
          />
        )}
      </svg>
    </div>
  );
};

export default PixMarkViewer;