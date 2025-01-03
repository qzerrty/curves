import { PointObj, RequiredConfigType, Side, SVGProps } from '../types';
import { getType1, getType2, getType3, getType4 } from './getPath';
import { isType1, isType2, isType3, isType4 } from './whichPathType';

export const comparePointObjects = (a: PointObj, b: PointObj) =>
    a.x === b.x && a.y === b.y;

export const getSVGProps = (
    start: PointObj,
    end: PointObj,
    startSide: Side,
    endSide: Side,
    curviness: RequiredConfigType['curviness']
) => {
    const diffX = end.x - start.x;
    const diffY = end.y - start.y;

    const svgProps: SVGProps = {
        center: [0, 0],
        d: [],
    };

    const type1 = isType1({
        start,
        end,
        startSide,
        endSide,
        dx: diffX,
        dy: diffY,
        curviness,
    });

    if (type1.isType) {
        const { center, d } = getType1({
            start,
            end,
            dx: diffX,
            dy: diffY,
            curviness,
            ...type1,
        });

        svgProps.center = center;
        svgProps.d = d;
        return svgProps;
    }

    const type2 = isType2({
        start,
        end,
        startSide,
        endSide,
        dx: diffX,
        dy: diffY,
        curviness,
    });

    if (type2.isType) {
        const { center, d } = getType2({
            start,
            end,
            dx: diffX,
            dy: diffY,
            curviness,
            ...type2,
        });

        svgProps.center = center;
        svgProps.d = d;
        return svgProps;
    }

    const type3 = isType3({
        start,
        end,
        startSide,
        endSide,
        dx: diffX,
        dy: diffY,
        curviness,
    });

    if (type3.isType) {
        const { center, d } = getType3({
            start,
            end,
            dx: diffX,
            dy: diffY,
            curviness,
            ...type3,
        });

        svgProps.center = center;
        svgProps.d = d;
        return svgProps;
    }

    const type4 = isType4({
        start,
        end,
        startSide,
        endSide,
        dx: diffX,
        dy: diffY,
        curviness,
    });

    if (type4.isType) {
        const { center, d } = getType4({
            start,
            end,
            dx: diffX,
            dy: diffY,
            curviness,
            ...type4,
        });

        svgProps.center = center;
        svgProps.d = d;
        return svgProps;
    }

    return svgProps;
};

const uniqueIdGeneratorFactory = (prefix: string) => {
    let i = 0;
    return () => `${prefix}-${i++}`;
};

export const uniqueMarkerId = uniqueIdGeneratorFactory('marker');

const DEFAULT_HOVER_SIZE = 20;

export const computeHoverStrokeWidth = (
    strokeWidth: number,
    scale: number = 1,
    hoverSize = DEFAULT_HOVER_SIZE
) => {
    if (strokeWidth === 0) return 0;
    if (scale < 1) return hoverSize;
    return strokeWidth * scale > hoverSize ? strokeWidth : hoverSize / scale;
};

export const update = (
    startRef: HTMLElement,
    endRef: HTMLElement,
    parent: HTMLElement,
    offset: RequiredConfigType['offset'],
    startSide: Side,
    endSide: Side,
    scale: number
) => {
    const rect1 = startRef.getBoundingClientRect();
    const rect2 = endRef.getBoundingClientRect();

    const containerRect = parent.getBoundingClientRect();

    const getCoordsBySide = (rect: DOMRect, side: Side) => ({
        x:
            (rect.x +
                (side === 'right'
                    ? rect.width
                    : ['top', 'bottom'].includes(side)
                    ? rect.width / 2
                    : 0) +
                offset.start[0] -
                containerRect.x) /
            scale,
        y:
            (rect.y +
                (side === 'bottom'
                    ? rect.height
                    : ['right', 'left'].includes(side)
                    ? rect.height / 2
                    : 0) +
                offset.start[1] -
                containerRect.y) /
            scale,
    });

    const start = getCoordsBySide(rect1, startSide);
    const end = getCoordsBySide(rect2, endSide);

    return [start, end];
};

export { reversePath } from './reversePath';
export { debounce } from './debounce';
