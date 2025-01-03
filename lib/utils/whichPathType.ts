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
    const isRotated90 =
        (startSide === 'top' && endSide === 'bottom') ||
        (startSide === 'bottom' && endSide === 'top');
    const isReversed =
        (startSide === 'left' && endSide === 'right') ||
        (startSide === 'top' && endSide === 'bottom');

    return {
        isType: true,
        isRotated90,
        isReversed,
    };

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