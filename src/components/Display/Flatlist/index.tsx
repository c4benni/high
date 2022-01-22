import React, { Fragment, memo, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DynamicObject } from '../../utils/types';
import { className as classes, ClassName } from '../../utils/main';
import './main.css'
import { nextTick } from '../../../utils/main';

type RenderArgs = {
    style?: DynamicObject<string>;
    data: DynamicObject<any>;
    key?: string | number
}

type Props = {
    tag?: string;

    // itemSize can be a number or array of numbers;
    // if it's array, reduce to get the length;
    // array is meant for dynamic size list;
    itemSize: number | number[];
    className?: ClassName;
    data: DynamicObject<any>[];
    render: (args: RenderArgs) => ReactNode;
    style?: DynamicObject<string>;
    scrollingElement: string | HTMLElement;
    bench?: number;
    eagerIndexes?: number[];
    gap?: number;
}

type Range = [number, number]

type GroupedSize = {
    size: number
    count: number;
}

function Items({ data, eagerIndexes, render, range }: {
    data: DynamicObject<any>[];
    eagerIndexes?: number[];
    render: (args: RenderArgs) => ReactNode;
    range: Range
}) {
    return <>
        {
            data.map((item, key) => {
                const eagerItem = eagerIndexes ? eagerIndexes.includes(key) : false;

                return ((key >= range[0] && key <= range[1]) || eagerItem) ? render({
                    data: item,
                    key,
                    style: {
                        'gridRowStart': `${key + 1}`
                    }
                }) : null
            })
        }
    </>
}

function FlatList(props: Props) {
    const rootRef = useRef<HTMLElement | null>(null);

    const [range, setRange] = useState<Range>([-1, -1])

    const {
        tag, className, render,
        data, itemSize, scrollingElement,
        bench = 1, eagerIndexes, gap
    } = props;

    const MemoizedItems = memo(Items, (prev, next) => {
        return prev.data.length !== next.data.length
    })

    const heightArray = useMemo(() => {
        if (Array.isArray(itemSize)) {
            return itemSize
        }
        return Array.from({
            length: data.length
        }, () => itemSize)
    }, [data, itemSize])

    const getHeight = useMemo(() => {
        const heightAsArray = Array.isArray(itemSize);

        const reducedHeight = () => {
            const height = heightAsArray ?
                itemSize.reduce((a, b) => a + b, 0)
                : itemSize;

            const gapHeight = gap ?
                gap * (data.length)
                : 0

            return `${(height * data.length) + gapHeight}px`
        }

        return {
            reduced: reducedHeight(),
            array: heightArray,
        }
    }, [itemSize, data, gap, heightArray])

    const scroller = useCallback((): HTMLElement | null => {
        if (typeof scrollingElement == 'string') {
            return rootRef.current ? rootRef.current.closest(scrollingElement) : null
        }
        else if (scrollingElement instanceof HTMLElement) {
            return scrollingElement
        }
        return null
    }, [scrollingElement])

    const scrollCallback = useCallback(async (evt: Event) => {

        const scrollEl = evt.target as HTMLElement;

        const scrollElHeight = scrollEl.clientHeight

        await nextTick();

        if (scrollEl && rootRef.current) {
            // minRange is the first element that can be rendered
            // use the scrollTop - the root's offsetTop to assume 
            // the root is matching with the scrollEl's top;
            // minus that by previous `bench<number>` list El's height
            // divide by the top list el's height

            const benchedAbove =
                typeof itemSize == 'number' ?
                    itemSize * bench
                    : getHeight.array
                        .slice(range[0] - bench, range[0])
                        .reduce((a, b) => a + b, 0)

            const topListEl = getHeight.array[
                Math.floor(
                    Math.max(range[0] - bench, 0)
                )
            ];

            // distance between scrollEl's scrollTop &
            // root's offsetTop;
            const topDifference = scrollEl.scrollTop
                - rootRef.current.offsetTop

            const minRange = Math.floor(
                Math.max(
                    (topDifference - benchedAbove), 0
                ) / topListEl
            );

            // how many elem can be rendered to fill the scrollEl's height
            // if number, divide by the scrollEl's height
            // 
            const elToRender = typeof itemSize == 'number' ?
                Math.ceil(scrollElHeight / itemSize)
                : 20;

            // `maxRange` is the last el that can be rendered
            const maxRange = minRange + (
                elToRender * (topDifference > 0 ? 2 : 1)
            ) + (topDifference > 0 ? bench : 0)

            const newRange: Range = [
                minRange,
                maxRange
            ]

            setRange(newRange)
        }
    }, [itemSize, bench, range, getHeight])

    const gridTemplateRows = useMemo(() => {
        if (Array.isArray(itemSize)) {
            const groupedSize: GroupedSize[] = [];

            for (const size of itemSize) {
                const lastIndex = groupedSize.length - 1;
                const lastItem = groupedSize[lastIndex];
                // create an object to store
                // size, count values if not exist;
                if (!lastItem) {
                    groupedSize.push({
                        size,
                        count: 1
                    })
                } else {
                    if (lastItem.size === size) {
                        lastItem.count += 1
                    } else {
                        groupedSize.push({
                            size,
                            count: 1
                        })
                    }
                }
            }

            return groupedSize.map(val => `repeat(${val.count}, ${val.size}px)`).join(' ')
        } return `repeat(${data.length}, ${itemSize}px)`
    }, [data, itemSize])

    useEffect(() => {
        const scrollTarget = scroller();

        if (scrollTarget instanceof HTMLElement) {
            if (range.reduce((a, b) => a + b, 0) < 0) {
                scrollCallback({
                    target: scrollTarget
                } as unknown as Event);
            }

            scrollTarget
                .addEventListener(
                    'scroll', scrollCallback, { passive: true }
                )
        }
        return () => {
            if (scrollTarget instanceof HTMLElement) {
                scrollTarget
                    .removeEventListener(
                        'scroll', scrollCallback, { passive: true } as EventListenerOptions
                    )
            }
        }
    }, [scroller, scrollCallback, range])

    return React.createElement(tag || 'ul', {
        ref: rootRef,
        className: classes([
            'FlatList',
            className
        ]),
        style: {
            ...(props?.style || {}),
            height: `${getHeight.reduced}`,
            gridTemplateRows,
            rowGap: gap ? `${gap}px` : undefined
        }
    }, [
        <Fragment
            key={'root-frag'}
        >{
                <MemoizedItems
                    render={render}
                    eagerIndexes={eagerIndexes}
                    data={data}
                    range={range}
                />
            }</Fragment>
    ])
}

export default FlatList;
