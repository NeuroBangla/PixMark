import React, { useState } from 'react';
import PixMarkViewer from './PixMarkViewer';
import PixMarkList from './PixMarkList';


const PixMark = () => {
    const annotations = [
        { text: "test", boundingBox: { x0: 0, y0: 0, x1: 100, y1: 100 }, color: "#ff0000", id: "1" },
        { text: "test 2", boundingBox: { x0: 100, y0: 100, x1: 200, y1: 200 }, id: "2" }
    ];
    const [height, setHeight] = useState(0);
    const onHeightChange = (height: number) => {
        setHeight(height);
    }
    return (
        <div style={{ display: "flex" }}>
            <PixMarkViewer
                src="http://localhost:3000/a.png"
                selectedResults={annotations}
                hoveringOverAnnotation={undefined}
                onHeightChange={onHeightChange}
            />
            <PixMarkList annotations={annotations} height={height} />
        </div>
    );
};

export default PixMark;