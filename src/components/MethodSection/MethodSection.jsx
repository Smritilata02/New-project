import './MethodSection.css'

const MethodSection = () => {
    const StarIcon = () => (
        <svg
            className="method-section__star w-[5.5rem] h-[5.5rem] s:w-[11.2rem] s:h-[11.2rem] mb-[0.05em] mx-[0.15em] s:mx-[0.25em]"
            viewBox="0 0 112 112"
            xmlns="http://www.w3.org/2000/svg"
            role="presentation"
            aria-hidden="true"
        >
            <path
                className="fill-current"
                d="m111.547 59.968-50.391-1.406 36.64 34.531-5.155 5.157L58.11 61.61 59.516 112h-7.188l1.407-50.39-34.532 36.64-5.156-5.157 36.64-34.53-50.39 1.405v-7.187l50.39 1.641-36.64-34.61 5.156-5.078 34.532 36.641L52.328.985h7.188l-1.406 50.39 34.53-36.64 5.157 5.077-36.641 34.61 50.39-1.407z"
                fillRule="nonzero"
            />
        </svg>
    )

    return (
        <section id="method" className="pb-200 s:pb-300 overflow-hidden relative bg-gray-bg">
            <div className="h1 uppercase">
                {/* First marquee row - right direction */}
                <div className="method-section__marquee method-section__marquee--right">
                    <div className="method-section__marquee-track">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex justify-start items-center">
                                <p className="whitespace-nowrap">METHOD</p>
                                <StarIcon />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Second marquee row - left direction */}
                <div className="method-section__marquee method-section__marquee--left">
                    <div className="method-section__marquee-track">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex justify-start items-center">
                                <p className="whitespace-nowrap">METHOD</p>
                                <StarIcon />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative site-grid items-center mt-90 s:-mt-85 z-2">
                <figure
                    className="s:col-start-7 col-start-1 col-span-6 relative media-fill bg-gray mt-100 s:mt-0 method-section__video-container"
                    style={{ aspectRatio: 0.75 }}
                >
                    <video
                        src="https://player.vimeo.com/progressive_redirect/playback/1057683172/rendition/1080p/file.mp4?loc=external&log_user=0&signature=1f6a2bb87a40793afeff33dd2d4b98025e97b58ebca988673f65652f25028e23&user_id=2020385"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="w-full h-full overflow-hidden object-cover"
                    />
                </figure>

                <div className="s:col-start-2 s:col-span-4 order-first col-start-1 col-span-6 smax:order-first s:pt-25">
                    <h2 className="h3 mb-40 s:mb-50">
                        Turning bold vision into brand impact.
                    </h2>
                    <div className="txt --less-margin s:pr-100">
                        <p>
                            Brand transformations fall short because they stop at the surface—logos, taglines, campaigns.
                            We go deeper, aligning your business around an Idea Worth Rallying Around®. The result?
                            A brand your people will champion and your audience will love.
                        </p>
                    </div>
                    <a href="#method" className="uline-double mt-70" role="button">
                        Learn the Thoughtshop® method
                    </a>
                </div>
            </div>
        </section>
    )
}

export default MethodSection
