import React, { useState } from 'react'
import { PixMarkViewer } from './PixMarkViewer'
import PixMarkList from './PixMarkList'
import { IAnnotation, IPixMark } from './types'

const PixMark = ({ src, annotations }: IPixMark) => {
  const [height, setHeight] = useState(0)
  const onHeightChange = (height: number) => {
    setHeight(height)
  }
  const [hoveringOverAnnotation, setHoveringOverAnnotation] = useState<IAnnotation | undefined>(
    undefined
  )
  const onHover = (annotation?: IAnnotation) => {
    setHoveringOverAnnotation(annotation)
  }
  const [selectedAnnotations, setSelectedAnnotations] = useState<IAnnotation[]>([])
  const onSelectedAnnotationsChange = (annotations: IAnnotation[]) => {
    setSelectedAnnotations(annotations)
  }
  const [onHoveringOverAnnotation, setOnHoveringOverAnnotation] = useState<IAnnotation | undefined>(
    undefined
  )
  const onHoveringOverAnnotationFunction = (annotation?: IAnnotation) => {
    setOnHoveringOverAnnotation(annotation)
  }
  return (
    <div style={{ display: 'flex' }}>
      <PixMarkViewer
        src={src}
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
  )
}

export { PixMark }
