import { Point } from '../types';
import { c_bezier } from './c_bezier';
import { clamp } from './clamp';
import { PathProps } from './path.types';

export const getType1 = ({
    start,
    end,
    dx,
    dy,
    isRotated90,
    isReversed,
    curviness,
}: PathProps) => {
    const offset = (Math.abs(isRotated90 ? dy : dx) / 2) * curviness;

    const center: Point = [start.x + dx / 2, start.y + dy / 2];

    const offsetX = offset * (isReversed ? -1 : 1) * (isRotated90 ? 0 : 1);
    const offsetY = offset * (isReversed ? -1 : 1) * (isRotated90 ? 1 : 0);

    const dots: Point[] = [
        [start.x, start.y],
        [start.x + offsetX, start.y + offsetY],
        [end.x - offsetX, end.y - offsetY],
        [end.x, end.y],
    ];

    const d = ['M', ...dots[0], 'C', ...dots[1], ...dots[2], ...dots[3]];

    return { center, d };
};

export const getType2 = ({
    start,
    end,
    dx,
    dy,
    isRotated90,
    isReversed,
    curviness,
}: PathProps) => {
    const getOffset1 = (d: number) => Math.log(Math.abs(d)) * 50 * curviness;
    const getOffset2 = (d: number) =>
        (Math.abs(d) + 110) * (Math.sign(d) || -1) * curviness;

    const offsetX =
        (isRotated90 ? getOffset2(dx) : getOffset1(dx)) * (isReversed ? -1 : 1);
    const offsetY =
        (isRotated90 ? getOffset1(dy) : getOffset2(dy)) * (isReversed ? 1 : -1);

    const dots: [Point, Point, Point, Point] = [
        [start.x, start.y],
        [start.x + offsetX, start.y + offsetY * (isRotated90 ? -1 : 1)],
        [
            isRotated90 ? start.x + offsetX : end.x - offsetX,
            (isRotated90 ? end.y : start.y) + offsetY,
        ],
        [end.x, end.y],
    ];

    const center = c_bezier(...dots, 0.5);

    const d = ['M', ...dots[0], 'C', ...dots[1], ...dots[2], ...dots[3]];

    return { center, d };
};

export const getType3 = ({
    start,
    end,
    dx: dX,
    dy: dY,
    isRotated90,
    isReversed,
    curviness,
}: PathProps) => {
    const dx = !isRotated90 && (isReversed ? dX < -10 : dX > -10) ? -10 : dX;
    const dy = isRotated90 && (isReversed ? dY < -10 : dY > -10) ? -10 : dY;

    const offset = Math.log(Math.abs(isRotated90 ? dy : dx)) * 40 * curviness;

    const offsetX = offset * (isReversed ? -1 : 1) * (isRotated90 ? 0 : 1);
    const offsetY = offset * (isReversed ? -1 : 1) * (isRotated90 ? 1 : 0);

    const center: Point = [start.x + dx / 2, start.y + dy / 2];

    const dots: Point[] = [
        [start.x, start.y],
        [start.x + offsetX, start.y + offsetY],
        center,
        [
            end.x - offsetX * (isRotated90 ? -1 : 1),
            end.y + offsetY * (isRotated90 ? -1 : 1),
        ],
        [end.x, end.y],
    ];

    const d = [
        'M',
        ...dots[0],
        'Q',
        ...dots[1],
        ...dots[2],
        'Q',
        ...dots[3],
        ...dots[4],
    ];

    return { center, d };
};

export const getType4 = ({ start, end, dx, dy, curviness }: PathProps) => {
    const offsetX = (Math.abs(dx) / 2) * curviness;
    const offsetY = (Math.abs(dy) / 2) * curviness;

    const dots: [Point, Point, Point, Point] = [
        [start.x, start.y],
        [start.x + offsetX, start.y],
        [end.x - offsetX / 3, end.y - 100 - offsetY],
        [end.x, end.y],
    ];

    const dydxrelation = clamp(dy / dx / 2, -0.2, 0.2);
    const center = c_bezier(...dots, 0.5 + dydxrelation);

    const d = ['M', ...dots[0], 'C', ...dots[1], ...dots[2], ...dots[3]];

    return { center, d };
};
