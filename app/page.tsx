"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Lenis from 'lenis'

export default function Home() {
  const holdersRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    const tl = gsap.timeline();

    tl
      .fromTo(
        holdersRef.current,
        { yPercent: 100, scale: 0.8 },
        { duration: 0.8, yPercent: 0, scale: 1, stagger: 0.1 }
      )
      .fromTo(
        holdersRef.current.map(holder => holder.querySelector('img')),
        { yPercent: -100, scale: 0.8 },
        { duration: 0.8, yPercent: 0, scale: 1, stagger: 0.1 },
        "<" // Runs in parallel
      )
      // Remove the delay and animate all elements simultaneously
      .to(
        [holdersRef.current[0], holdersRef.current[2]], // First and third containers
        { 
          duration: 1.2, 
          width: 0, 
          opacity: 0,
          ease: "power2.inOut",
          padding: 0,
          margin: 0
        },
        ">" // Start immediately after previous animation
      )
      .to(
        containerRef.current, // Container div
        {
          duration: 1.2,
          height: '100vh',
          ease: "power2.inOut"
        },
        "<" // Start at the same time as the disappearing animation
      )
      .to(
        ".holder", // All holder elements
        {
          duration: 1.2,
          margin: 0,
          ease: "power2.inOut"
        },
        "<" // Start at the same time as the other animations
      )
      .to(
        holdersRef.current[1], // Middle image container
        { 
          duration: 1.2, 
          width: '100vw', 
          height: '100vh', 
          ease: "power2.inOut"
        },
        "<" // Start at the same time as the disappearing animation
      )
      .to(
        holdersRef.current[1].querySelector('img'), // Middle image
        { 
          duration: 1.2, 
          scale: 1.2, 
          objectFit: 'cover', 
          ease: "power2.inOut"
        },
        "<" // Start at the same time as container expansion
      );
  }, []);

  return (
    <main>
    <div className="relative flex justify-center items-center h-screen">
      <div ref={containerRef} className="flex flex-row w-auto h-[600px] overflow-hidden relative space-x-4">
        <div ref={el => { if (el) holdersRef.current[0] = el }} className="holder overflow-hidden w-[400px] mx-2">
          <img src="/photo.jpg" alt="" className="block object-cover w-full h-full" />
        </div>
        <div ref={el => { if (el) holdersRef.current[1] = el }} className="holder overflow-hidden w-[400px]">
          <img src="/photo.jpg" alt="" className="block object-cover w-full h-full" />
        </div>
        <div ref={el => { if (el) holdersRef.current[2] = el }} className="holder overflow-hidden w-[400px] mx-2">
          <img src="/photo.jpg" alt="" className="block object-cover w-full h-full" />
        </div>
      </div>
    </div>
    <div className="relative flex justify-center items-center h-screen">2</div>
    </main>
  );
}