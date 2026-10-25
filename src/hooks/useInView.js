import { useEffect, useState } from "react";

const useInView = (ref, { rootMargin = "0px", once = false } = {}) => {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setInView(entry.isIntersecting);
            if (once && entry.isIntersecting) observer.disconnect();
        }, { rootMargin });

        observer.observe(element);
        return () => observer.disconnect();
    }, [ref, rootMargin, once]);

    return inView;
};

export default useInView;
