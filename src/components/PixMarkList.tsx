import React, { forwardRef } from 'react';
import List from 'rc-virtual-list';
import { IPixMarkListEntry, IPixMarkList } from './types';

const AnnotationEntry = forwardRef<any, IPixMarkListEntry>((props, ref) => {
    const { text, boundingBox, onHover } = props;
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
            onMouseEnter={() => onHover(props)}
            onMouseLeave={() => onHover(undefined)}
        >
            {text} - {x0},{y0} - {x1},{y1}
        </span>
    );
});

const PixMarkList = ({ annotations, height, onHover }: IPixMarkList) => (
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
        {({ id, text, boundingBox }) => <AnnotationEntry id={id} text={text} boundingBox={boundingBox} onHover={onHover} />}
    </List>
);

export default PixMarkList;