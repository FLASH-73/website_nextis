"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const VIDEO_SRC =
    process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/videos/aira-demo.mp4";

const POSTER_SRC = "/images/hardware/aira-hero-poster.webp";

export default function HeroVideo() {
    const videoRef = useRef(null);
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const p = video.play();
        if (p !== undefined) {
            p.catch(() => {
                // Autoplay blocked — poster image remains visible.
            });
        }
    }, []);

    if (hasError) {
        return (
            <Image
                src={POSTER_SRC}
                alt="AIRA Teleop Kit in action"
                width={1920}
                height={1080}
                className="w-full rounded-lg"
                sizes="(max-width: 768px) 100vw, 1024px"
                priority
            />
        );
    }

    return (
        <div className="relative w-full rounded-lg overflow-hidden">
            {!isLoaded && (
                <Image
                    src={POSTER_SRC}
                    alt="AIRA Teleop Kit in action"
                    width={1920}
                    height={1080}
                    className="absolute inset-0 w-full h-full object-cover"
                    sizes="(max-width: 768px) 100vw, 1024px"
                    priority
                />
            )}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                poster={POSTER_SRC}
                aria-label="AIRA Teleop Kit demonstration video"
                className="w-full rounded-lg block"
                style={{ aspectRatio: "16 / 9" }}
                onLoadedData={() => setIsLoaded(true)}
                onError={() => {
                    console.warn("HeroVideo: failed to load video from", VIDEO_SRC);
                    setHasError(true);
                }}
            >
                <source src={VIDEO_SRC} type="video/mp4" />
            </video>
        </div>
    );
}
