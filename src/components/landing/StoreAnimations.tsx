"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function StoreAnimations() {
  const isSetup = useRef(false);

  useEffect(() => {
    if (isSetup.current) return;
    
    gsap.registerPlugin(ScrollTrigger);
    isSetup.current = true;

    // 1. Hero Animation
    gsap.fromTo(".store-hero-left", 
      { opacity: 0, x: -50 }, 
      { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );
    gsap.fromTo(".store-hero-img", 
      { opacity: 0, scale: 0.8, filter: "blur(10px)" }, 
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out", delay: 0.4 }
    );

    // 2. Ticker Animation (Continuous)
    gsap.to(".store-ticker-track", {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });

    // 3. Category Tabs Reveal
    gsap.fromTo(".store-tabs-wrap",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.6 }
    );

    // 4. Features Section Reveal on Scroll
    gsap.fromTo(".store-section-title",
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: {
          trigger: ".store-features-section",
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(".store-feature-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.15,
        scrollTrigger: {
          trigger: ".store-features",
          start: "top 85%",
        }
      }
    );

    // 5. Store Reviews Reveal
    gsap.fromTo(".store-reviews-container",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: {
          trigger: ".store-reviews-container",
          start: "top 85%",
        }
      }
    );
    
    // Add floating animation to hero image
    gsap.to(".store-hero-img", {
      y: -15,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.6
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
}
