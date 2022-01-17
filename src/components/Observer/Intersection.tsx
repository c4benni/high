import { useEffect, useRef, useState } from "react";

export type IntersectionConfig = {
    threshold?: number | number[];
    rootMargin?: string;
    root?: HTMLElement | null;
};

const defaultConfig: IntersectionConfig = {
    threshold: 0,
    rootMargin: "0px 0px 0px 0px",
    root: null,
};

type PropsType = {
    once?: boolean;
    options?: IntersectionConfig;
    disabled?: boolean;
    children: Function;
    onceIntercepted?: Function;
    onUpdate?: Function;
};

export type Ref<El> = React.LegacyRef<El> | undefined;

export type Entry = IntersectionObserverEntry

const Intersection = (props: PropsType) => {
    const intersectionRef = useRef(null);

    const { options = defaultConfig } = props;

    const [entry, $entry] = useState<IntersectionObserverEntry | null>(null);

    const callback = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;

        $entry(entry);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(callback, options);
        let target: HTMLElement;

        if (intersectionRef.current) {
            target = intersectionRef.current;
            observer.observe(target);
        }

        return () => {
            if (target) {
                observer.unobserve(target);
            }
        };
    }, [intersectionRef, options]);

    return props.children(intersectionRef, entry);
};

export default Intersection;
