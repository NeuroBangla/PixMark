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
    id: string;
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
    onHeightChange: (height: number) => void;
    allAnnotations: IAnnotation[];
    onHoveringOverAnnotation: (annotation?: IAnnotation) => void;
}

interface IPixMarkList {
    annotations: IAnnotation[];
    height: number;
    onHover: (annotation?: IAnnotation) => void;
    onSelectedAnnotationsChange: (annotations: IAnnotation[]) => void;
    onHoveringOverAnnotation?: IAnnotation;
}

interface IPixMarkListEntry extends IAnnotation {
    onHover: (annotation?: IAnnotation) => void;
    onMark: (annotation: IAnnotation) => void;
    onUnMark: (annotation: IAnnotation) => void;
    onHoveringOverAnnotation?: IAnnotation;
}

interface IPixMark{
    annotations: IAnnotation[];
}

export type { IImageInfo, IDimension, IPixMarkViewer, IAnnotation, IPixMarkList, IPixMarkListEntry, IPixMark };