export type Point = [number, number];
export type PointObj = { x: number; y: number };
export type Side = 'left' | 'right' | 'top' | 'bottom';

export type TargetPointer = React.RefObject<HTMLElement> | string;

export type OffsetXY = {
    offsetStartX?: number;
    offsetStartY?: number;
    offsetEndX?: number;
    offsetEndY?: number;
};

export type ConfigType = {
    color?: string;

    useRegister?: boolean;

    withHead?: boolean;
    headColor?: string;
    headSize?: number;

    scale?: React.RefObject<number>;
    offset?: {
        start: Point;
        end: Point;
    };
    curviness?: number;
    strokeWidth?: number;
};

export type RequiredConfigType = Required<ConfigType>;

export type ArrowsContextType = {
    update(target?: HTMLElement): void;

    _registerTarget(target: TargetPointer, handler: () => void): void;
    _removeTarget(target: TargetPointer, handler: () => void): void;

    _container: HTMLElement | null;
    _svg: SVGSVGElement | null;
    _defs: SVGDefsElement | null;
    _g: SVGGElement | null;

    _config: ConfigType;

    _unstableState: unknown;

    _containerRef: React.RefObject<HTMLDivElement>;
    _svgRef: React.RefObject<SVGSVGElement>;
    _defsRef: React.RefObject<SVGDefsElement>;
    _gRef: React.RefObject<SVGDefsElement>;
};

export type SVGProps = {
    center: Point;
    d: (string | number)[];
};
