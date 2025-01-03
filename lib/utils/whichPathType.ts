import { PathTypeDetectProps } from './path.types';

export const isType1 = ({
    dx,
    dy,
    startSide,
    endSide,
}: PathTypeDetectProps) => {
    const isRotated90 =
        (startSide === 'top' && endSide === 'bottom') ||
        (startSide === 'bottom' && endSide === 'top');
    const isReversed =
        (startSide === 'left' && endSide === 'right') ||
        (startSide === 'top' && endSide === 'bottom');

    if (startSide === 'right' && endSide === 'left') {
        return {
            isType: dx > 0,
            isRotated90,
            isReversed,
        };
    }
    if (startSide === 'left' && endSide === 'right') {
        return {
            isType: dx < 0,
            isRotated90,
            isReversed,
        };
    }
    if (startSide === 'top' && endSide === 'bottom') {
        return {
            isType: dy < 0,
            isRotated90,
            isReversed,
        };
    }
    if (startSide === 'bottom' && endSide === 'top') {
        return {
            isType: dy > 0,
            isRotated90,
            isReversed,
        };
    }
    return {
        isType: false,
        isRotated90,
        isReversed,
    };
};

export const isType2 = ({
    dx,
    dy,
    startSide,
    endSide,
}: PathTypeDetectProps) => {
    const isRotated90 =
        (startSide === 'top' && endSide === 'bottom') ||
        (startSide === 'bottom' && endSide === 'top');
    const isReversed =
        (startSide === 'left' && endSide === 'right') ||
        (startSide === 'top' && endSide === 'bottom');

    if (startSide === 'right' && endSide === 'left') {
        return {
            isType: dy === 0 || Math.abs(dx / dy) > 2,
            isRotated90,
            isReversed,
        };
    }
    if (startSide === 'left' && endSide === 'right') {
        return {
            isType: dy === 0 || Math.abs(dx / dy) > 2,
            isRotated90,
            isReversed,
        };
    }
    if (startSide === 'top' && endSide === 'bottom') {
        return {
            isType: dx === 0 || Math.abs(dy / dx) > 2,
            isRotated90,
            isReversed,
        };
    }
    if (startSide === 'bottom' && endSide === 'top') {
        return {
            isType: dx === 0 || Math.abs(dy / dx) > 2,
            isRotated90,
            isReversed,
        };
    }
    return {
        isType: false,
        isRotated90,
        isReversed,
    };
};

export const isType3 = ({
    dx,
    dy,
    startSide,
    endSide,
}: PathTypeDetectProps) => {
    const isRotated90 =
        (startSide === 'top' && endSide === 'bottom') ||
        (startSide === 'bottom' && endSide === 'top');
    const isReversed =
        (startSide === 'left' && endSide === 'right') ||
        (startSide === 'top' && endSide === 'bottom');

    if (startSide === 'right' && endSide === 'left') {
        return {
            isType: dx < 0,
            isRotated90,
            isReversed,
        };
    }
    if (startSide === 'left' && endSide === 'right') {
        return {
            isType: dx > 0,
            isRotated90,
            isReversed,
        };
    }
    if (startSide === 'top' && endSide === 'bottom') {
        return {
            isType: dy > 0,
            isRotated90,
            isReversed,
        };
    }
    if (startSide === 'bottom' && endSide === 'top') {
        return {
            isType: dy < 0,
            isRotated90,
            isReversed,
        };
    }
    return {
        isType: false,
        isRotated90,
        isReversed,
    };
};

export const isType4 = ({
    dx,
    dy,
    startSide,
    endSide,
}: PathTypeDetectProps) => {
    const absdxdy = Math.abs(dx / dy);

    if (startSide === 'right' && endSide === 'top') {
        return {
            isType:
                (dy <= 0 && absdxdy > 0.7) || (dy > 0 && dx > 0 && absdxdy > 0),
        };
    }
    if (startSide === 'right' && endSide === 'bottom') {
        return {
            isType:
                (dy >= 0 && absdxdy > 0.7) || (dy < 0 && dx > 0 && absdxdy > 0),
            isPaired: true,
        };
    }
    if (startSide === 'top' && endSide === 'right') {
        return {
            isType:
                (dy >= 0 && absdxdy > 0.7) || (dy < 0 && dx < 0 && absdxdy > 0),
            isReversed: true,
        };
    }
    if (startSide === 'bottom' && endSide === 'right') {
        return {
            isType:
                (dy <= 0 && absdxdy > 0.7) || (dy > 0 && dx < 0 && absdxdy > 0),
            isPaired: true,
            isReversed: true,
        };
    }

    if (startSide === 'left' && endSide === 'top') {
        return {
            isType:
                (dy <= 0 && absdxdy > 0.7) || (dy > 0 && dx < 0 && absdxdy > 0),
            isRotated90: true,
        };
    }
    if (startSide === 'left' && endSide === 'bottom') {
        return {
            isType:
                (dy >= 0 && absdxdy > 0.7) || (dy < 0 && dx < 0 && absdxdy > 0),
            isPaired: true,
            isRotated90: true,
        };
    }
    if (startSide === 'top' && endSide === 'left') {
        return {
            isType:
                (dy >= 0 && absdxdy > 0.7) || (dy < 0 && dx > 0 && absdxdy > 0),
            isReversed: true,
            isRotated90: true,
        };
    }
    if (startSide === 'bottom' && endSide === 'left') {
        return {
            isType:
                (dy <= 0 && absdxdy > 0.7) || (dy > 0 && dx > 0 && absdxdy > 0),
            isPaired: true,
            isReversed: true,
            isRotated90: true,
        };
    }

    return {
        isType: false,
    };
};
