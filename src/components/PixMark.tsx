import React, { useState } from 'react';
import PixMarkViewer from './PixMarkViewer';
import PixMarkList from './PixMarkList';
import { IAnnotation } from './types';

const PixMark = () => {
    const annotations = [
        { text: "test", boundingBox: { x0: 0, y0: 0, x1: 100, y1: 100 }, color: "#ff0000", id: "1" },
        { text: "test 2", boundingBox: { x0: 100, y0: 100, x1: 200, y1: 200 }, id: "2" }
    ];
    const [height, setHeight] = useState(0);
    const onHeightChange = (height: number) => {
        setHeight(height);
    }
    const [hoveringOverAnnotation, setHoveringOverAnnotation] = useState<IAnnotation | undefined>(undefined);
    const onHover = (annotation?: IAnnotation) => {
        setHoveringOverAnnotation(annotation);
    }
    const [selectedAnnotations, setSelectedAnnotations] = useState<IAnnotation[]>([]);
    const onSelectedAnnotationsChange = (annotations: IAnnotation[]) => {
        setSelectedAnnotations(annotations);
    }
    const [onHoveringOverAnnotation, setOnHoveringOverAnnotation] = useState<IAnnotation | undefined>(undefined);
    const onHoveringOverAnnotationFunction = (annotation?: IAnnotation) => {
        setOnHoveringOverAnnotation(annotation);
    }
    return (
        <div style={{ display: "flex" }}>
            <PixMarkViewer
                src="http://localhost:3000/a.png"
                selectedResults={selectedAnnotations}
                hoveringOverAnnotation={hoveringOverAnnotation}
                onHeightChange={onHeightChange}
                allAnnotations={annotations}
                onHoveringOverAnnotation={onHoveringOverAnnotationFunction}
            />
            <PixMarkList
                annotations={annotations}
                height={height}
                onHover={onHover}
                onSelectedAnnotationsChange={onSelectedAnnotationsChange}
                onHoveringOverAnnotation={onHoveringOverAnnotation}
            />
        </div>
    );
};

export default PixMark;