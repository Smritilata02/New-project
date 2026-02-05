import './hero.css'

const Hero = () => {
    return (
        <div className="hero relative">
            <div className="site-max relative flex items-center justify-center s:h-almost-screen pt-180 s:pt-120">
                <div className="relative s:text-9 mh-m:text-10">
                    <h1 className="text-64 s:text-[16em] leading-none font-disp uppercase" aria-label="Ideas worth rallying around">
                        <div className="overflow-hidden">
                            <div className="js-t-title-line home-title">Ideas Worth</div>
                        </div>
                        <div className="overflow-hidden mr-[-.25em]">
                            <div className="s:text-right js-t-title-line">
                                Rallying
                            </div>
                        </div>
                        <div className="flex justify-between justify-center align-middle overflow-hidden s:-ml-40">
                            <div className="w-[10rem] h-[15rem] hidden s:block js-t-title-line">
                                <svg className="size-full" viewBox="0 0 90 112" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                        <g transform="translate(-87.000000, -582.000000)" fill="#000000" fillRule="nonzero">
                                            <g transform="translate(87.400000, 582.840000)">
                                                <polygon points="89.28 69.28 80.32 59.68 51.2 87.2 51.2 0 38.08 0 38.08 87.2 8.96 59.68 0 69.28 44.64 110.56"></polygon>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div className="s:text-center js-t-title-line home-hero-tm">Around</div>
                            <div className="hidden s:block"></div>
                        </div>
                    </h1>
                    <p className="relative space-letter s:absolute s:top-1/2 s:left-[-2em] s:-translate-y-1/3 text-20 s:text-[2.1em] font-sans s:w-[21em] s:pb-[3em] mt-50 s:mt-0 js-t-lines">
                        Thoughtshop is the leading creative branding agency for positioning, scaling, and reinventing companies in the tech and innovation space.
                    </p>
                </div>
            </div>

            <div className="site-max relative flex flex-col s:flex-row justify-between items-start mt-50 s:mt-0 s:h-[10rem] z-5">
                <a href="#services" className="uline-double" role="button">
                    Discover our engagements
                </a>
                <span className="hidden s:inline-flex uppercase font-medium">(Scroll)</span>
            </div>

            <div className="s:h-[300vh] relative s:-mt-150 hero__video-section">
                <div className="relative s:sticky top-0 left-0 w-full relative">
                    <div className="relative s:absolute s:top-0 s:left-0 w-full s:h-full-screen flex">
                        <div className="site-max --extended flex flex-col items-center relative pt-50">
                            <figure className="flex-1 w-full relative media-fill z-2 js-hh">
                                <div className="pt-[75%] block s:hidden"></div>
                                <div className="hidden s:block absolute top-0 left-0 s:left-[40rem] w-full s:w-[65rem] z-2" style={{ aspectRatio: '658 / 384' }}></div>
                                <video
                                    src="https://player.vimeo.com/progressive_redirect/playback/1151223324/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=1673321e0ff298970b5406ebc910089e59f04c859b30e59995c89b5dddbe2637"
                                    preload="metadata"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="hero__video"
                                ></video>
                            </figure>
                            <p className="relative h-auto text-center uppercase pt-30 s:pb-50 w-3/4 s:w-2/3 font-medium z-1">
                                Business Strategy • Brand Positioning • Category Definition • Brand Design • Brand Transformation
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="site-max flex items-end pb-90 s:pb-175 pt-200 s:pt-0 s:h-full-screen">
                <h2 className="text-64 s:text-[14.5rem] uppercase !leading-[1.1] w-full font-disp font-medium">
                    <span className="w-full s:w-auto">
                        LET'S
                    </span>
                    <figure className="hidden s:inline-flex relative h-[14.6rem] w-[22rem] s:w-[34rem] my-15 s:my-0">
                        <div className="!absolute top-0 s:top-1/2 left-0 s:left-[2.6rem] right-0 s:right-[2.6rem] s:-translate-y-1/2 media-fill" style={{ aspectRatio: '16/9' }}></div>
                    </figure>
                    <span className="w-full s:w-auto">BRAND YOUR BIG IDEA</span>
                </h2>
            </div>
        </div>
    )
}

export default Hero
