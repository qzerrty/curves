import { Point, PointObj, RequiredConfigType, Side, SVGProps } from '../types';
import { getType1 } from './getPath';
import { isType1 } from './whichPathType';

const c_bezier = (
    p1: Point,
    p2: Point,
    p3: Point,
    p4: Point,
    t: number
): Point => [
    (1 - t) ** 3 * p1[0] +
        3 * (1 - t) ** 2 * t * p2[0] +
        3 * (1 - t) * t ** 2 * p3[0] +
        t ** 3 * p4[0],
    (1 - t) ** 3 * p1[1] +
        3 * (1 - t) ** 2 * t * p2[1] +
        3 * (1 - t) * t ** 2 * p3[1] +
        t ** 3 * p4[1],
];

export const comparePointObjects = (a: PointObj, b: PointObj) =>
    a.x === b.x && a.y === b.y;

/*
    right, left = 0
    left, right = 1
    bottom, top = 2
    top, bottom = 3
*/

export const getSVGProps = (
    start: PointObj,
    end: PointObj,
    startSide: Side,
    endSide: Side,
    curviness: RequiredConfigType['curviness']
) => {
    let diffX = end.x - start.x;
    const diffY = end.y - start.y;

    const svgProps: SVGProps = {
        center: [0, 0],
        d: [],
    };

    // const isHorizontalStart = ['right', 'left'].includes(startSide);
    // const isVerticalStart = ['bottom', 'top'].includes(startSide);

    const type1 = isType1({
        start,
        end,
        startSide,
        endSide,
        dx: diffX,
        dy: diffY,
        curviness,
    });

    // dX > 0 and [right, left]
    // dx < 0 and [left, right]
    // dy > 0 and [bottom, top]
    // dy < 0 and [top, bottom]
    if (type1.isType) {
        /**
         * diffX > 0
         */

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
    } else if (diffY === 0 || Math.abs(diffX / diffY) > 4) {
        /**
         * start.y ~= end.y && diffX < 0
         */
        const offsetX = Math.log(Math.abs(diffX)) * 50 * curviness;
        const offsetY =
            (Math.abs(diffY) + 110) *
            (diffY === 0 ? -1 : Math.sign(diffY)) *
            curviness;

        const dots: [Point, Point, Point, Point] = [
            [start.x, start.y],
            [start.x + offsetX, start.y + offsetY],
            [end.x - offsetX, start.y + offsetY],
            [end.x, end.y],
        ];

        svgProps.center = c_bezier(...dots, 0.5);
        dots.push(svgProps.center);

        svgProps.d = ['M', ...dots[0], 'C', ...dots[1], ...dots[2], ...dots[3]];
    } else {
        /**
         * diffX < 0
         */

        if (diffX > -10) {
            diffX = -10;
        }

        const offsetX = Math.log(Math.abs(diffX)) * 40 * curviness;

        svgProps.center = [
            start.x - Math.abs(diffX) / 2,
            start.y + (Math.abs(diffY) / 2) * Math.sign(diffY),
        ];

        const dots: Point[] = [
            [start.x, start.y],
            [start.x + offsetX, start.y],
            svgProps.center,
            [end.x - offsetX, end.y],
            [end.x, end.y],
        ];

        svgProps.d = [
            'M',
            ...dots[0],
            'Q',
            ...dots[1],
            ...dots[2],
            'Q',
            ...dots[3],
            ...dots[4],
        ];
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
