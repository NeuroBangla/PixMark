import React, { forwardRef, useEffect, useMemo, useState } from "react";
import List from "rc-virtual-list";
import { IPixMarkListEntry, IPixMarkList, IAnnotation } from "./types";

const AnnotationEntry = forwardRef<any, IPixMarkListEntry>((props, ref) => {
  const {
    text,
    boundingBox,
    onHover,
    onMark,
    onUnMark,
    onHoveringOverAnnotation,
  } = props;
  const { x0, y0, x1, y1 } = boundingBox;
  const [clicked, setClicked] = useState(false);
  const onClick = () => {
    if (clicked) {
      onUnMark(props);
    } else {
      onMark(props);
    }
    setClicked(!clicked);
  };
  const borderColor = useMemo<string>(() => {
    const isHovering =
      onHoveringOverAnnotation && onHoveringOverAnnotation.id === props.id;
    return isHovering ? "blue" : "red";
  }, [onHoveringOverAnnotation, props]);
  return (
    <span
      ref={ref}
      style={{
        border: `1px solid ${borderColor}`,
        padding: "0 16px",
        lineHeight: "30px",
        boxSizing: "border-box",
        display: "inline-block",
      }}
      onMouseEnter={() => onHover(props)}
      onMouseLeave={() => onHover(undefined)}
      onClick={onClick}
    >
      {text} - {x0},{y0} - {x1},{y1}
    </span>
  );
});

const PixMarkList = ({
  annotations,
  height,
  onHover,
  onSelectedAnnotationsChange,
  onHoveringOverAnnotation,
}: IPixMarkList) => {
  const [selectedAnnotations, setSelectedAnnotations] = useState<IAnnotation[]>(
    [],
  );
  const onMark = (annotation: IAnnotation) => {
    setSelectedAnnotations([...selectedAnnotations, annotation]);
  };
  const onUnMark = (annotation: IAnnotation) => {
    setSelectedAnnotations(
      selectedAnnotations.filter((a) => a.id !== annotation.id),
    );
  };

  useEffect(() => {
    onSelectedAnnotationsChange(selectedAnnotations);
  }, [selectedAnnotations]);

  return (
    <List
      data={annotations}
      itemHeight={30}
      height={height}
      itemKey="id"
      style={{
        border: "1px solid red",
        boxSizing: "border-box",
        width: 200,
      }}
    >
      {({ id, text, boundingBox }) => (
        <AnnotationEntry
          id={id}
          text={text}
          boundingBox={boundingBox}
          onHover={onHover}
          onMark={onMark}
          onUnMark={onUnMark}
          onHoveringOverAnnotation={onHoveringOverAnnotation}
        />
      )}
    </List>
  );
};

export default PixMarkList;
