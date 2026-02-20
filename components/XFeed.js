"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { featuredTweetIds, TWITTER_HANDLE } from "@/content/featured-tweets";
import TweetEmbed from "./TweetEmbed";

export default function XFeed() {
  const { t } = useLanguage();
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  const allFailed = errorCount >= featuredTweetIds.length;

  const handleTweetError = useCallback(() => {
    setErrorCount((c) => c + 1);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const children = Array.from(container.children);
    if (children.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = children.indexOf(entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        }
      },
      {
        root: container,
        threshold: 0.6,
      }
    );

    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  if (featuredTweetIds.length === 0) return null;

  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            className="font-light tracking-tight text-gray-900 mb-4"
            style={{ fontSize: "var(--text-section-title)" }}
          >
            {t.xfeed.title}
          </h2>
          <p
            className="text-gray-500 font-light max-w-xl mx-auto"
            style={{ fontSize: "var(--text-body)" }}
          >
            {t.xfeed.subtitle}
          </p>
        </div>

        {allFailed ? (
          <div className="text-center py-12">
            <a
              href={`https://x.com/${TWITTER_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
              style={{ fontSize: "var(--text-body)" }}
            >
              {t.xfeed.follow}
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        ) : (
          <>
            {/* Desktop/Tablet grid */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTweetIds.map((id, i) => (
                <TweetEmbed key={id} tweetId={id} eager={i < 3} onError={handleTweetError} />
              ))}
            </div>

            {/* Mobile horizontal carousel */}
            <div
              ref={scrollRef}
              className="sm:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {featuredTweetIds.map((id, i) => (
                <div
                  key={id}
                  className="snap-center shrink-0 w-[85vw] max-w-[350px]"
                >
                  <TweetEmbed tweetId={id} eager={i < 3} onError={handleTweetError} />
                </div>
              ))}
            </div>

            {/* Carousel dots — mobile only */}
            {featuredTweetIds.length > 1 && (
              <div className="sm:hidden flex justify-center gap-2 mt-4">
                {featuredTweetIds.map((id, i) => (
                  <button
                    key={id}
                    aria-label={`Go to tweet ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      i === activeIndex ? "bg-gray-900" : "bg-gray-300"
                    }`}
                    onClick={() => {
                      const container = scrollRef.current;
                      const target = container?.children[i];
                      if (target) {
                        target.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                          inline: "center",
                        });
                      }
                    }}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Follow link */}
        {!allFailed && (
          <div className="text-center mt-12">
            <a
              href={`https://x.com/${TWITTER_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-600 transition-colors duration-300 tracking-wide"
            >
              {t.xfeed.follow}
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
