import React, { useState, useEffect } from 'react'
import { PixMarkViewer } from './PixMarkViewer'
import PixMarkList from './PixMarkList'
import { IAnnotation, IPixMark } from './types'

const PixMark = ({ src, annotations, enableConfidenceFilter = true }: IPixMark) => {
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
  const [confidenceThreshold, setConfidenceThreshold] = useState(0)
  const filteredAnnotations = enableConfidenceFilter
    ? annotations.filter(a => a.confidence !== undefined && a.confidence > confidenceThreshold)
    : annotations
  const filteredSelected = enableConfidenceFilter
    ? selectedAnnotations.filter(
        a => a.confidence !== undefined && a.confidence > confidenceThreshold
      )
    : selectedAnnotations
  useEffect(() => {
    if (enableConfidenceFilter) {
      setSelectedAnnotations(prev =>
        prev.filter(a => a.confidence !== undefined && a.confidence > confidenceThreshold)
      )
    }
  }, [confidenceThreshold, enableConfidenceFilter])
  return (
    <div>
      {enableConfidenceFilter && (
        <div style={{ marginBottom: '10px' }}>
          <label>Confidence Threshold: {confidenceThreshold.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={confidenceThreshold}
            onChange={e => setConfidenceThreshold(parseFloat(e.target.value))}
          />
        </div>
      )}
      <div style={{ display: 'flex' }}>
        <PixMarkViewer
          src={src}
          selectedResults={filteredSelected}
          hoveringOverAnnotation={hoveringOverAnnotation}
          onHeightChange={onHeightChange}
          allAnnotations={filteredAnnotations}
          onHoveringOverAnnotation={onHoveringOverAnnotationFunction}
        />
        <PixMarkList
          annotations={filteredAnnotations}
          height={height}
          onHover={onHover}
          onSelectedAnnotationsChange={onSelectedAnnotationsChange}
          onHoveringOverAnnotation={onHoveringOverAnnotation}
        />
      </div>
    </div>
  )
}

export { PixMark }
