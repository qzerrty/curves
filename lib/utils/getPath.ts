import { Point } from '../types';
import { PathProps } from './path.types';
import { reversePath } from './reversePath';

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

    const center: Point = [start.x + Math.abs(dx) / 2, start.y + dy / 2];

    const dots: Point[] = [
        [start.x, start.y],
        [start.x + offset, start.y],
        center,
        [end.x - offset, end.y],
        [end.x, end.y],
    ];

    let d = ['M', ...dots[0], 'C', ...dots[1], ...dots[2], ...dots[3]];

    if (isReversed) {
        d = reversePath(d);
    }

    return { center, d };
};
