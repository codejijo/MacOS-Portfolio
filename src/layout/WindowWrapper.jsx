import { useGSAP } from '@gsap/react';
import useWindowStore from '@store/window';
import gsap from 'gsap';
import { Scale } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react'

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey];
        const ref = useRef(null);

        useGSAP(() => {
            const el = ref.current
            if (!el || !isOpen) return;

            el.style.display = "block"

            gsap.fromTo(el, {scale: 0.8, opacity:0, y:40}, )
        }, [isOpen]);

        useLayoutEffect(() => {
            const el = ref.current
            if (!el) return;
            el.style.display = isOpen ? "block" : "none"
        }, [isOpen])

        return (
            <section id={windowKey} ref={ref} style={{ zIndex }} className='absolute'>
                <Component {...props} />
            </section>
        )
    }

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`

    return Wrapped;
}

export default WindowWrapper;