
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useAppContext } from "../context/AppContext";

const BackgroundParticles = () => {
    const { theme } = useAppContext();
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options = useMemo(
        () => ({
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "bubble", // 3D-like interaction
                    },
                },
                modes: {
                    bubble: {
                        distance: 200,
                        duration: 2,
                        size: 3,
                        opacity: 1,
                        color: theme === 'dark' ? "#a855f7" : "#4f46e5"
                    },
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: theme === 'dark' ? ["#ffffff", "#a855f7", "#ec4899"] : ["#4f46e5", "#db2777", "#000000"],
                },
                links: {
                    color: theme === 'dark' ? "#ffffff" : "#000000",
                    distance: 150,
                    enable: true,
                    opacity: theme === 'dark' ? 0.2 : 0.1,
                    width: 1,
                    triangles: {
                        enable: true,
                        opacity: 0.05,
                    },
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 1, // Slow float
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 80,
                },
                opacity: {
                    value: theme === 'dark' ? 0.5 : 0.6,
                    animation: {
                        enable: true,
                        speed: 1,
                        minimumValue: 0.1,
                        sync: false
                    }
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 2 },
                    animation: {
                        enable: true,
                        speed: 2,
                        minimumValue: 0.5,
                        sync: false
                    }
                },
            },
            detectRetina: true,
        }),
        [theme],
    );

    if (init) {
        return (
            <Particles
                id="tsparticles"
                options={options}
                className="absolute inset-0 -z-0 pointer-events-none"
            />
        );
    }

    return <></>;
};

export default BackgroundParticles;
