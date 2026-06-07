import { useLayoutEffect, useRef } from 'react'
import useWindowStore from '@store/window';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { ChevronLeft } from 'lucide-react';

const WindowWrapper = (Component, windowKey, mobileConfig = {}) => {
    const Wrapped = (props) => {
        const { focusWindow, closeWindow, windows } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey];
        const ref = useRef(null);

        useGSAP(() => {
            const el = ref.current;
            if (!el) return;
            const isMobile = window.innerWidth <= 640;

            if (isOpen) {
                el.style.display = "block";
                gsap.fromTo(
                    el,
                    { scale: isMobile ? 0.9 : 0.8, opacity: 0, y: isMobile ? 20 : 0 },
                    { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
                )
            } else {
                if (el.style.display === "block" || el.style.display === "") {
                    gsap.to(el, {
                        scale: isMobile ? 0.9 : 0.8,
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.in",
                        onComplete: () => {
                            el.style.display = "none";
                        }
                    })
                } else {
                    el.style.display = "none";
                }
            }
        }, [isOpen]);

        useGSAP(() => {
            const el = ref.current;
            if (!el) return;

            if (window.innerWidth <= 640) return;

            if (isOpen) {
                const [instance] = Draggable.create(el, {
                    onPress: () => focusWindow(windowKey)
                })

                return () => instance.kill();
            }
        }, [isOpen])

        return (
            <section id={windowKey} ref={ref} style={{ zIndex, display: 'none' }} className='absolute max-[640px]:!fixed max-[640px]:!inset-0 max-[640px]:!w-dvw max-[640px]:!h-dvh max-[640px]:!rounded-none max-[640px]:!bg-white max-[640px]:!shadow-none max-[640px]:!border-none max-[640px]:overflow-y-auto'>
                {/* Mobile iOS Top Bar */}
                <div id="mobile-header">
                    <div
                        className="left-action"
                        onClick={(e) => {
                            e.stopPropagation();
                            closeWindow(windowKey);
                        }}
                    >
                        {mobileConfig.hideBackIcon ? null : <ChevronLeft className="w-5 h-5 -ml-1.5" />}
                        <span>{mobileConfig.leftText || "Back"}</span>
                    </div>
                    <div className="center-title">
                        {mobileConfig.centerContent || mobileConfig.centerText || null}
                    </div>
                    <div className="right-action">
                        {mobileConfig.rightContent || null}
                    </div>
                </div>

                <Component {...props} />

                {/* Mobile iOS Home Bar - Extended clickable area */}
                <div
                    className="hidden max-[640px]:flex fixed bottom-0 left-0 w-full justify-center items-end pb-2 pt-4 z-[99999] cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        closeWindow(windowKey);
                    }}
                >
                    <div className="w-1/3 h-1.5 bg-black rounded-full opacity-80" />
                </div>
            </section>
        )
    }

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`

    return Wrapped;
}

export default WindowWrapper;