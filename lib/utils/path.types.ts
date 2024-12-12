import { PointObj, RequiredConfigType, Side } from '../types';

export type PathProps = {
    start: PointObj;
    end: PointObj;
    curviness: RequiredConfigType['curviness'];
    dx: number;
    dy: number;
    isRotated90?: boolean;
    isReversed?: boolean;
};

export type PathTypeDetectProps = PathProps & {
    startSide: Side;
    endSide: Side;
};
