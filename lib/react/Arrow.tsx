import {
    MouseEventHandler,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    comparePointObjects,
    computeHoverStrokeWidth,
    getSVGProps,
    reversePath,
    uniqueMarkerId,
    update,
} from '../utils';
import { createPortal } from 'react-dom';
import { useArrowsContext } from './ArrowsContext';
import { DefaultMarker, MarkerPropsType } from './Marker';
import React from 'react';
import {
    ConfigType,
    OffsetXY,
    PointObj,
    RequiredConfigType,
    Side,
    TargetPointer,
} from '../types';

type ArrowProps = {
    start: TargetPointer;
    end: TargetPointer;

    className?: string;
    onClick?: MouseEventHandler;
    onHover?: MouseEventHandler;
    label?: JSX.Element;

    startSide?: Side;
    endSide?: Side;

    Marker?: React.FC<MarkerPropsType>;
} & Pick<
    ConfigType,
    | 'scale'
    | 'color'
    | 'curviness'
    | 'strokeWidth'
    | 'useRegister'
    | 'withHead'
    | 'headSize'
    | 'headColor'
> &
    OffsetXY;

export const Arrow: React.FC<ArrowProps> = ({
    start,
    end,

    color,
    scale,
    curviness,
    className,
    strokeWidth,

    useRegister,

    offsetStartX,
    offsetStartY,
    offsetEndX,
    offsetEndY,

    label,
    Marker = DefaultMarker,

    withHead,
    headColor,
    headSize,

    startSide = 'right',
    endSide = 'left',

    onHover,
    onClick,
}) => {
    const {
        _defs,
        _g,
        _config,
        _container,
        _unstableState,
        _registerTarget,
        _removeTarget,
    } = useArrowsContext();

    const markerId = useRef(uniqueMarkerId());

    const withMarker =
        withHead ??
        _config.withHead ??
        Boolean(headColor || headSize || _config.headColor || _config.headSize);

    const _color = color ?? _config.color ?? 'black';
    const _curviness = curviness ?? _config.curviness ?? 1;
    const _strokeWidth = strokeWidth ?? _config.strokeWidth ?? 1;
    const _scale = scale?.current ?? _config.scale?.current ?? 1;

    const _headSize = headSize ?? _config.headSize;
    const _headColor = headColor ?? _config.headColor ?? _color;

    const offset = useMemo<RequiredConfigType['offset']>(
        () => ({
            start: [
                offsetStartX ?? _config.offset?.start?.[0] ?? 0,
                offsetStartY ?? _config.offset?.start?.[1] ?? 0,
            ],
            end: [
                offsetEndX ?? _config.offset?.end?.[0] ?? 0,
                offsetEndY ?? _config.offset?.end?.[1] ?? 0,
            ],
        }),
        [offsetStartX, offsetStartY, offsetEndX, offsetEndY, _config.offset]
    );

    const hoverStrokeWidth = _strokeWidth
        ? computeHoverStrokeWidth(_strokeWidth, _scale)
        : undefined;

    const shouldCreateHoverPath =
        hoverStrokeWidth && hoverStrokeWidth > 0 && Boolean(onHover || onClick);

    const lastXY = useRef([] as PointObj[]);
    const arrowRef = useRef<SVGPathElement>(null);
    const hoverPathRef = useRef<SVGPathElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);

    const [unstableLocalState, updateState] = useState<unknown>();
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        const startElement =
            typeof start === 'string'
                ? document.getElementById(start)
                : start.current;
        const endElement =
            typeof end === 'string'
                ? document.getElementById(end)
                : end.current;

        if (!_container || !startElement || !endElement || !offset) return;

        const [startXY, endXY] = update(
            startElement,
            endElement,
            _container,
            offset,
            startSide,
            endSide,
            _scale
        );

        if (
            lastXY.current?.length &&
            comparePointObjects(startXY, lastXY.current[0]) &&
            comparePointObjects(endXY, lastXY.current[1])
        ) {
            return;
        }

        lastXY.current = [startXY, endXY];

        const svgProps = getSVGProps(
            startXY,
            endXY,
            startSide,
            endSide,
            _curviness
        );
        const d = svgProps.d.join(' ');
        const hoverD = d + reversePath(svgProps.d).join(' ');

        requestAnimationFrame(() => {
            if (arrowRef.current) {
                arrowRef.current.setAttribute('d', d);
            }
            if (hoverPathRef.current) {
                hoverPathRef.current.setAttribute('d', hoverD);
            }
            if (labelRef.current) {
                labelRef.current.style.left = `${svgProps.center[0]}px`;
                labelRef.current.style.top = `${svgProps.center[1]}px`;
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        start,
        end,
        offset,
        _container,
        _curviness,
        shouldCreateHoverPath,
        _unstableState,
        unstableLocalState,
    ]);

    const shouldRegister = useRegister ?? _config.useRegister;

    useEffect(() => {
        if (shouldRegister) {
            _removeTarget(start, forceUpdate);
            _removeTarget(end, forceUpdate);

            _registerTarget(start, forceUpdate);
            _registerTarget(end, forceUpdate);
        }
        return () => {
            _removeTarget(start, forceUpdate);
            _removeTarget(end, forceUpdate);
        };
    }, [
        start,
        end,
        _removeTarget,
        _registerTarget,
        shouldRegister,
        forceUpdate,
    ]);

    return (
        <>
            {_defs
                ? createPortal(
                      <>
                          {withMarker && (
                              <Marker
                                  id={markerId.current}
                                  color={_headColor}
                                  size={_headSize}
                              />
                          )}
                      </>,
                      _defs
                  )
                : null}
            {_g
                ? createPortal(
                      <>
                          <path
                              className={className}
                              stroke={_color}
                              strokeWidth={_strokeWidth}
                              fill="none"
                              markerEnd={
                                  withMarker ? `url(#${markerId.current}` : ''
                              }
                              ref={arrowRef}
                          />
                          {shouldCreateHoverPath && (
                              <path
                                  stroke="none"
                                  fill="none"
                                  className="baana__interactive-path"
                                  strokeWidth={hoverStrokeWidth}
                                  onMouseOver={onHover}
                                  onClick={onClick}
                                  ref={hoverPathRef}
                              />
                          )}
                      </>,
                      _g
                  )
                : null}
            {_container && label
                ? createPortal(
                      <div className="baana__line-label" ref={labelRef}>
                          {label}
                      </div>,
                      _container
                  )
                : null}
        </>
    );
};
