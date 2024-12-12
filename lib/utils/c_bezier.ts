import { Point } from '../types';

export const c_bezier = (
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
