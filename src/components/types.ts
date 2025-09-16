// type IHexColor =
//   | `#${string & { length: 3 }}`
//   | `#${string & { length: 6 }}`;

interface IImageInfo {
  width: number
  height: number
  base64encoded: string
}

type IHexColor = string

interface IBoundingBoxTwoPoints {
    x_top_left: number
    y_top_left: number
    x_bottom_right: number
    y_bottom_right: number
}

interface IBoundingBoxFourPoints extends IBoundingBoxTwoPoints {
    x_top_right: number
    y_top_right: number
    x_bottom_left: number
    y_bottom_left: number
}

interface IAnnotation {
  id: string
  text: string
  boundingBox: IBoundingBoxTwoPoints | IBoundingBoxFourPoints
  color?: IHexColor
  confidence?: number
}

interface IDimension {
  width: number
  height: number
}

interface IPixMarkViewer {
  src: string
  selectedResults: IAnnotation[]
  hoveringOverAnnotation?: IAnnotation | undefined
  dimensions?: IDimension | undefined
  onHeightChange: (height: number) => void
  allAnnotations: IAnnotation[]
  onHoveringOverAnnotation: (annotation?: IAnnotation | undefined) => void
}

interface IPixMarkList {
  annotations: IAnnotation[]
  height: number
  onHover: (annotation?: IAnnotation | undefined) => void
  onSelectedAnnotationsChange: (annotations: IAnnotation[]) => void
  onHoveringOverAnnotation?: IAnnotation | undefined
}

interface IPixMarkListEntry extends IAnnotation {
  onHover: (annotation?: IAnnotation | undefined) => void
  onMark: (annotation: IAnnotation) => void
  onUnMark: (annotation: IAnnotation) => void
  onHoveringOverAnnotation?: IAnnotation | undefined
}

interface IPixMark {
  src: string
  annotations: IAnnotation[]
}

export type {
  IImageInfo,
  IDimension,
  IPixMarkViewer,
  IAnnotation,
  IPixMarkList,
  IPixMarkListEntry,
  IPixMark,
}
