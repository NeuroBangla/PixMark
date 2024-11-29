// type IHexColor =
//   | `#${string & { length: 3 }}`
//   | `#${string & { length: 6 }}`;

interface IImageInfo {
    width: number;
    height: number;
    base64encoded: string;
}

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

interface IDimension {
    width: number;
    height: number;
}

interface IPixMarkViewer {
    src: string;
    selectedResults: IAnnotation[];
    hoveringOverAnnotation?: IAnnotation;
    dimensions?: IDimension;
}

interface IIAnnotationWithId extends IAnnotation {
    id: string;
}

interface IPixMarkList {
    annotations: IIAnnotationWithId[];
}

export type { IImageInfo, IDimension, IPixMarkViewer, IAnnotation, IIAnnotationWithId, IPixMarkList };