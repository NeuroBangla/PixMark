import React, { useState, useEffect } from 'react'
import { IDimension, IPixMarkViewer, IImageInfo } from './types'

const PixMarkViewer: React.FC<IPixMarkViewer> = ({
  src,
  selectedResults,
  hoveringOverAnnotation,
  dimensions,
  onHeightChange,
  allAnnotations,
  onHoveringOverAnnotation,
}) => {
  const [imageInfo, setImageInfo] = useState<IImageInfo>({
    width: 0,
    height: 0,
    base64encoded: '',
  })

  const getImageDimensions = (blob: Blob): Promise<{ width: number; height: number }> => {
    const img = new Image()

    return new Promise((resolve, reject) => {
      img.onload = () => {
        resolve({ width: img.width, height: img.height })
      }
      img.onerror = () => {
        reject(new Error('Failed to load image from blob.'))
      }

      img.src = URL.createObjectURL(blob)
    })
  }

  const blobToBase64 = (blob: Blob): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

  const getImageDimensionsAndBase64 = (
    url: string
  ): Promise<{ width: number; height: number; base64: string }> => {
    return new Promise((resolve, reject) => {
      fetch(url).then(response => {
        response.blob().then(blob => {
          const imageDimensionPromise = getImageDimensions(blob)
          const base64Promise = blobToBase64(blob)
          Promise.allSettled([imageDimensionPromise, base64Promise]).then(results => {
            const dimensions =
              results[0].status === 'fulfilled' ? results[0].value : { width: 0, height: 0 }
            const base64 = results[1].status === 'fulfilled' ? results[1].value : ''
            if (results[0].status === 'rejected' || results[1].status === 'rejected') {
              reject('Failed to get image dimensions or base64')
            }
            const { width, height } = dimensions
            onHeightChange(height)
            resolve({
              width,
              height,
              base64: base64 as string,
            })
          })
        })
      })
    })
  }

  useEffect(() => {
    getImageDimensionsAndBase64(src).then(res => {
      setImageInfo({
        width: res.width,
        height: res.height,
        base64encoded: res.base64,
      })
    })
  }, [src])

  const { width: imgWidth, height: imgHeight, base64encoded: imageBase64 } = imageInfo

  const calculateDimensionsAndScrollStyle = (dimensions?: IDimension) => {
    if (!dimensions) {
      return {}
    } else {
      return {
        width: dimensions.width,
        height: dimensions.height,
        overflow: 'auto',
      }
    }
  }

  return (
    <div
      style={{
        ...calculateDimensionsAndScrollStyle(dimensions),
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="image-large"
        width={imgWidth}
        height={imgHeight}
      >
        <image
          href={imageBase64}
          x="0"
          y="0"
          width={imgWidth}
          height={imgHeight}
          style={{ border: 'red 1px dotted' }}
        />
        {selectedResults.map((box, i) => (
          <rect
            key={i}
            x={box.boundingBox.x_top_left}
            y={box.boundingBox.y_top_left}
            width={box.boundingBox.x_bottom_right - box.boundingBox.x_top_left}
            height={box.boundingBox.y_bottom_right - box.boundingBox.y_top_left}
            style={{
              fill: 'none',
              stroke: box.color || 'lime',
              strokeWidth: 1,
            }}
          />
        ))}
        {hoveringOverAnnotation && (
          <rect
            x={hoveringOverAnnotation.boundingBox.x_top_left}
            y={hoveringOverAnnotation.boundingBox.y_top_left}
            width={hoveringOverAnnotation.boundingBox.x_bottom_right - hoveringOverAnnotation.boundingBox.x_top_left}
            height={hoveringOverAnnotation.boundingBox.y_bottom_right - hoveringOverAnnotation.boundingBox.y_top_left}
            style={{ fill: 'none', stroke: 'red', strokeWidth: 1 }}
          />
        )}
        {allAnnotations.map((box, i) => (
          <rect
            onMouseEnter={() => {
              onHoveringOverAnnotation(box)
            }}
            onMouseLeave={() => {
              onHoveringOverAnnotation(undefined)
            }}
            key={i}
            x={box.boundingBox.x_top_left}
            y={box.boundingBox.y_top_left}
            width={box.boundingBox.x_bottom_right - box.boundingBox.x_top_left}
            height={box.boundingBox.y_bottom_right - box.boundingBox.y_top_left}
            style={{ fill: 'solid', opacity: 0 }}
          />
        ))}
      </svg>
    </div>
  )
}

export { PixMarkViewer }
