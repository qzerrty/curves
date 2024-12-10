import { useCallback, useState } from 'react';
import { debounce } from '../utils';

export const useReducedGraphics = (delay: number = 400) => {
    const [isReduced, setIsReduced] = useState(false);

    const increaseSVG = () => setIsReduced(false);
    const reduceSVG = () => setIsReduced(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const increaseSVGWithDebounce = useCallback(
        debounce(increaseSVG, delay),
        [delay]
    );

    const reduceSVGWithAutoIncrease = () => {
        setIsReduced(true);

        increaseSVGWithDebounce();
    };


    return {
        isReduced,
        increaseSVG,
        reduceSVG,
        reduceSVGWithAutoIncrease,
        reducedClassName: isReduced ? 'baana__reduced-svg' : '',
    };
};
