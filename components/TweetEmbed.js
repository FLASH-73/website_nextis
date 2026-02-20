"use client";

import { useRef, useState, useEffect, useCallback } from "react";

// Module-level state shared across all TweetEmbed instances.
// Prevents loading widgets.js more than once.
let widgetsPromise = null;

function loadTwitterWidgets() {
  if (widgetsPromise) return widgetsPromise;

  widgetsPromise = new Promise((resolve, reject) => {
    if (window.twttr && window.twttr.widgets) {
      resolve(window.twttr);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";

    script.onload = () => {
      if (window.twttr && window.twttr.widgets) {
        resolve(window.twttr);
      } else {
        window.twttr.ready((twttr) => resolve(twttr));
      }
    };

    script.onerror = () => {
      widgetsPromise = null;
      reject(new Error("Failed to load Twitter widgets.js"));
    };

    document.head.appendChild(script);
  });

  return widgetsPromise;
}

function withTimeout(promise, ms) {
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error("Timeout")), ms);
    }),
  ]).finally(() => clearTimeout(timer));
}

export default function TweetEmbed({ tweetId, eager = false, onError }) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const hasTriggered = useRef(false);

  const embedTweet = useCallback(async () => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;
    setStatus("loading");

    try {
      const twttr = await withTimeout(loadTwitterWidgets(), 10000);

      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }

      const el = await withTimeout(
        twttr.widgets.createTweet(tweetId, containerRef.current, {
          theme: "light",
          dnt: true,
          width: 400,
          conversation: "none",
          cards: "visible",
        }),
        10000
      );

      if (el) {
        setStatus("loaded");
      } else {
        setStatus("error");
        onError?.();
      }
    } catch (err) {
      console.warn(`Tweet ${tweetId} unavailable:`, err.message);
      setStatus("error");
      onError?.();
      hasTriggered.current = false;
    }
  }, [tweetId, onError]);

  useEffect(() => {
    if (eager) {
      embedTweet();
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          embedTweet();
          observer.disconnect();
        }
      },
      { rootMargin: "500px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [eager, embedTweet]);

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
      {status !== "loaded" && status !== "error" && (
        <div className="w-full h-[300px] bg-gray-100 animate-pulse rounded-2xl" />
      )}

      {status === "error" && (
        <div className="w-full h-[200px] flex items-center justify-center text-gray-500 text-sm">
          Tweet unavailable
        </div>
      )}

      <div
        ref={containerRef}
        className={`transition-opacity duration-300 ${
          status === "loaded" ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
        }`}
      />
    </div>
  );
}
