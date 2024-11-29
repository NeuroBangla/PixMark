import React, { forwardRef } from 'react';
import List from 'rc-virtual-list';
import { IAnnotation, IPixMarkList } from './types';

const ForwardMyItem = forwardRef<any, IAnnotation>(({ text, boundingBox }, ref) => {
    const { x0, y0, x1, y1 } = boundingBox;
    return (
        <span
            ref={ref}
            style={{
                border: '1px solid gray',
                padding: '0 16px',
                lineHeight: '30px',
                boxSizing: 'border-box',
                display: 'inline-block',
            }}
        >
            {text} - {x0},{y0} - {x1},{y1}
        </span>
    );
});

const PixMarkList = ({ annotations, height }: IPixMarkList) => (
    <List
        data={annotations}
        itemHeight={30}
        height={height}
        itemKey="id"
        style={{
            border: '1px solid red',
            boxSizing: 'border-box',
            width: 200,
        }}
    >
        {({ id, text, boundingBox }) => <ForwardMyItem id={id} text={text} boundingBox={boundingBox} />}
    </List>
);

export default PixMarkList;