import { useRef } from "react";
import { locations, dockApps } from "@constants"
import { useGSAP } from "@gsap/react";
import useLocationStore from "@store/location";
import useWindowStore from "@store/window";
import clsx from "clsx";
import { Draggable } from "gsap/Draggable";

const projects = locations?.work?.children ?? [];
const homeScreenApps = dockApps.filter(app => !app.inIOSDock);

const Home = () => {
    const { setActiveLocation } = useLocationStore();
    const { openWindow } = useWindowStore();
    const containerRef = useRef(null);

    const handleOpenProjectFinder = (project) => {
        setActiveLocation(project);
        openWindow("finder");
    }

    const handleOpenApp = (app) => {
        if (!app.canOpen) return;
        openWindow(app.id);
    }

    useGSAP(() => {
        if (window.innerWidth <= 640) return;
        const draggables = Draggable.create(".folder", { type: "x,y" });
        return () => {
            draggables.forEach(d => d.kill());
        };
    }, { scope: containerRef })

    return (
        <section id="home" ref={containerRef}>
            <ul>
                {projects.map((project) => (
                    <li
                        key={project.id}
                        className={clsx("group folder", project.windowPosition)}
                        onClick={() => handleOpenProjectFinder(project)}
                    >
                        <img src="/images/folder.png" alt="home-folder" />
                        <p>{project.name}</p>
                    </li>
                ))}

                {/* Home screen apps (mobile only layout handled in CSS) */}
                {homeScreenApps.map((app) => (
                    <li
                        key={`HomeApp-${app.id}`}
                        className="group flex flex-col items-center sm:hidden"
                        onClick={() => handleOpenApp(app)}
                    >
                        <img src={`/images/${app.icon}`} alt={app.name} className={app.canOpen ? "" : "opacity-60"} />
                        <p>{app.name}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Home