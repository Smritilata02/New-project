import React, { useEffect, useRef } from 'react';
import './hero.css';

const Hero = () => {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const state1Ref = useRef(null);
    const targetRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || !videoRef.current || !targetRef.current || !state1Ref.current) return;

            const container = containerRef.current;
            const video = videoRef.current;

            const containerRect = container.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;

            const totalScrollDistance = containerRect.height - windowHeight;
            const scrolled = -containerRect.top;

            let progress = scrolled / totalScrollDistance;
            progress = Math.max(0, Math.min(1, progress));

            const state1Rect = state1Ref.current.getBoundingClientRect();
            const targetRect = targetRef.current.getBoundingClientRect();

            const fullScreenRect = {
                width: windowWidth,
                height: windowHeight,
                top: 0,
                left: 0
            };

            let currentWidth, currentHeight, currentTop, currentLeft;

            // Updated Phases:
            // 0.0 - 0.3: Grow (Quicker)
            // 0.3 - 0.7: Hold (Stay Full)
            // 0.7 - 1.0: Shrink

            const GROW_END = 0.3;
            const SHRINK_START = 0.7;

            if (progress < GROW_END) {
                // PHASE 1: GROW (State 1 -> Full)
                const phaseP = progress / GROW_END; // 0 to 1

                // Ease out cubic for snappier growth? 1 - Math.pow(1 - phaseP, 3)
                // Let's keep linear for predictability or simple ease
                const easeP = phaseP;

                currentWidth = state1Rect.width + (fullScreenRect.width - state1Rect.width) * easeP;
                currentHeight = state1Rect.height + (fullScreenRect.height - state1Rect.height) * easeP;
                currentTop = state1Rect.top + (fullScreenRect.top - state1Rect.top) * easeP;
                currentLeft = state1Rect.left + (fullScreenRect.left - state1Rect.left) * easeP;

            } else if (progress < SHRINK_START) {
                // PHASE 2: HOLD (Full Screen)
                currentWidth = fullScreenRect.width;
                currentHeight = fullScreenRect.height;
                currentTop = fullScreenRect.top;
                currentLeft = fullScreenRect.left;

            } else {
                // PHASE 3: SHRINK (Full -> Target)
                const phaseP = (progress - SHRINK_START) / (1 - SHRINK_START); // 0 to 1

                currentWidth = fullScreenRect.width + (targetRect.width - fullScreenRect.width) * phaseP;
                currentHeight = fullScreenRect.height + (targetRect.height - fullScreenRect.height) * phaseP;
                currentTop = fullScreenRect.top + (targetRect.top - fullScreenRect.top) * phaseP;
                currentLeft = fullScreenRect.left + (targetRect.left - fullScreenRect.left) * phaseP;
            }


            video.style.position = 'fixed';
            video.style.width = `${currentWidth}px`;
            video.style.height = `${currentHeight}px`;
            video.style.top = `${currentTop}px`;
            video.style.left = `${currentLeft}px`;
            video.style.zIndex = 10;
            video.style.transform = 'none';
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <div className="hero relative">
            <div className="site-max relative flex items-center justify-center s:h-almost-screen pt-140 s:pt-80">
                <div className="relative s:text-9 mh-m:text-10">
                    <h1
  className="text-64 s:text-[16em] leading-none font-disp uppercase"
  aria-label="Ideas worth rallying about"
>
  {/* Line 1 */}
  <div className="overflow-hidden">
    <div className="flex items-center js-t-title-line">

      {/* Camera instead of spokes */}
      <div className="w-[10rem] h-[10rem] flex items-center justify-center mr-10">
        <svg
          className="w-[6rem] h-[6rem]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M23 19V7a2 2 0 0 0-2-2h-3l-2-2H8L6 5H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
      </div>

      {/* IDEAS WORTH */}
      <div className="home-title">
        Ideas Wor<img src="src/assets/T.png" alt="T" className="logo-t" />h
      </div>

    </div>
  </div>

  {/* Line 2 */}
  <div className="overflow-hidden mr-[-.25em]">
    <div className="s:text-right js-t-title-line">
      Rallying
    </div>
  </div>

  {/* Line 3 */}
  <div className="flex justify-between justify-center align-middle overflow-hidden s:-ml-40">
    <div className="w-[10rem] h-[15rem] hidden s:block js-t-title-line">
      <svg className="size-full" viewBox="0 0 90 112" version="1.1">
        <polygon
          points="89.28 69.28 80.32 59.68 51.2 87.2 51.2 0 38.08 0 38.08 87.2 8.96 59.68 0 69.28 44.64 110.56"
          fill="currentColor"
        />
      </svg>
    </div>

    <div className="s:text-center js-t-title-line home-hero-tm">
      Around
    </div>

    <div className="hidden s:block"></div>
  </div>
</h1>

                    <p
                        className="relative space-letter s:absolute s:top-1/2 s:left-[-2em] s:-translate-y-1/3 text-20 s:text-[2.1em] font-sans s:w-[21em] s:pb-[3em] mt-50 s:mt-0 js-t-lines">
                        <img src="src/assets/T.png" alt="T" className="logo-t" />houghtshop is the leading global branding agency for positioning, scaling, and reinventing companies
                        in the tech and innovation space.
                    </p>
                </div>
            </div>

            <div
                className="site-max relative flex flex-col s:flex-row justify-between items-start mt-50 s:mt-0 s:h-[10rem] z-5">
                <a href="https://wearemotto.com/programs" className="uline-double" role="button">
                    Discover our engagements
                </a>
                <span className="hidden s:inline-flex uppercase font-medium">(Scroll)</span>
            </div>

            <div className="s:h-[300vh] relative s:-mt-150" data-component="HomeHero" ref={containerRef}>
                <div className="relative s:sticky top-0 left-0 w-full relative">
                    <div className="relative s:absolute s:top-0 s:left-0 w-full s:h-full-screen flex" style={{ height: '100vh' }}>
                        <div className="site-max --extended flex flex-col items-center relative pt-50">
                            <figure className="flex-1 w-full relative media-fill z-2 js-hh">
                                <div className="pt-[75%] block s:hidden"></div>
                                <div
                                    ref={state1Ref}
                                    className="hidden s:block absolute top-0 left-0 s:left-[40rem] w-full s:w-[65rem] z-2 js-hh-state-1"
                                    style={{ aspectRatio: '658 / 384', visibility: 'hidden' }}></div>
                                <video
                                    ref={videoRef}
                                    src="https://player.vimeo.com/progressive_redirect/playback/1151223324/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=1673321e0ff298970b5406ebc910089e59f04c859b30e59995c89b5dddbe2637"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    preload="metadata" autoPlay loop muted playsInline></video>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>

            <div className="site-max flex items-end pb-90 s:pb-175 pt-200 s:pt-0 s:h-full-screen js-hh-end">
                <h2 className="text-64 s:text-[14.5rem] uppercase !leading-[1.1] w-full font-disp font-medium">
                    <span className="w-full s:w-auto js-hh-offset-ref">
                        LE <img src="src/assets/T.png" alt="T" className="logo-t" />'S
                    </span>
                    <figure className="hidden s:inline-flex relative h-[14.6rem] w-[22rem] s:w-[34rem] my-15 s:my-0">
                        <div
                            ref={targetRef}
                            className="!absolute top-0 s:top-1/2 left-0 s:left-[2.6rem] right-0 s:right-[2.6rem] s:-translate-y-1/2 media-fill js-hh-state-2"
                            style={{ aspectRatio: '16/9' }}></div>
                    </figure>
                    <span className="w-full s:w-auto">BRAND YOUR BIG IDEA</span>
                </h2>
            </div>
        </div>
    );
};

export default Hero;





