import React, { ReactNode } from 'react';
import { useArrowsContext } from './ArrowsContext';

export const ArrowsContainer: React.FC<
    { children: ReactNode; className?: string } & Record<string, unknown>
> = ({ children, className, ...others }) => {
    const { _containerRef, _svgRef, _defsRef, _gRef } = useArrowsContext();

    return (
        <div
            ref={_containerRef}
            className={`${className} baana__container`}
            {...others}
        >
            <svg ref={_svgRef} className="baana__svg">
                <defs ref={_defsRef}></defs>
                <g
                    ref={_gRef}
                    buffered-rendering="dynamic"
                    colorRendering="optimizeSpeed"
                ></g>
            </svg>
            {children}
        </div>
    );
};
