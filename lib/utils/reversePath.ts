import { SVGProps } from '../types';

export const reversePath = (d: SVGProps['d']) => {
    const opQueue = [];
    const pStack = [];

    let i = 0;
    for (const el of d) {
        if (typeof el === 'string') {
            opQueue.push(el);
        } else {
            if (i % 2 === 0) {
                pStack.push([el]);
            } else {
                pStack[pStack.length - 1].push(el);
            }
            i++;
        }
    }

    const expectedPointsCount: Record<string, number> = {
        M: 1,
        C: 3,
        Q: 2,
    };

    const result: SVGProps['d'] = [];

    i = pStack.length - 1;
    for (const cmd of opQueue) {
        result.push(cmd);
        for (let j = 0; j < expectedPointsCount[cmd]; j++) {
            result.push(...pStack[i--]);
        }
    }

    return result;
};
