import './FeaturedWorks.css'

const FeaturedWorks = () => {
    const works = [
        {
            title: 'Nomina',
            description: 'Onchain infrastructure',
            category: 'Crypto',
            videoUrl: 'https://player.vimeo.com/progressive_redirect/playback/1118348583/rendition/1440p/file.mp4?loc=external&log_user=0&signature=e3da956b016cce94a36099116cb1076af571b20df7126cda660a70be633140fa',
            href: '#',
        },
        {
            title: 'Impel',
            description: 'Automotive intelligence',
            category: 'AI',
            imageUrl: 'https://media.wearemotto.com/wp-content/uploads/2025/09/26105318/01-IMP-Hero.webp',
            href: '#',
        },
        {
            title: 'Klaviyo',
            description: 'Marketing data platform',
            category: 'Tech',
            imageUrl: 'https://media.wearemotto.com/wp-content/uploads/2025/07/22182754/KLA-Flag-Cover.webp',
            href: '#',
        },
        {
            title: 'Cresta',
            description: 'Enterprise Gen AI',
            category: 'AI',
            imageUrl: 'https://media.wearemotto.com/wp-content/uploads/2025/08/01181049/Cresta-hero.jpg',
            href: '#',
        },
    ]

    return (
        <section id="work" className="relative bg-gray-bg mb-200 s:mb-300">
            <div className="site-max s:flex justify-between s:items-end s:flex-row">
                <h2 className="h2 smax:text-50 uppercase max-w-[100rem] bg-yellow-bg">
                    Selected<br />work
                </h2>
                <a href="#work" className="uline-double mt-40 s:mt-0" role="button">
                    See all case studies →
                </a>
            </div>

            <div className="gutter grid s:grid-cols-2 gap-x-24 gap-y-50 s:gap-y-70 mt-60 s:mt-70">
                {works.map((work, index) => (
                    <article key={index} className="col-span-1 relative featured-work__item">
                        <a href={work.href} className="block">
                            <figure className="media-fill relative pt-[100%] featured-work__figure">
                                {work.videoUrl ? (
                                    <video
                                        src={work.videoUrl}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="auto"
                                        className="featured-work__media"
                                    />
                                ) : (
                                    <img
                                        src={work.imageUrl}
                                        alt={work.title}
                                        draggable="false"
                                        className="featured-work__media"
                                        loading="lazy"
                                    />
                                )}
                                <div className="featured-work__hover-indicator hidden s:block absolute top-0 left-0 z-3 pointer-events-none opacity-0">
                                    <div className="font-sans relative w-[13.8rem] aspect-square bg-white rounded-full flex items-center justify-center text-black text-50">
                                        →
                                    </div>
                                </div>
                            </figure>
                            <div className="flex justify-between pt-20">
                                <h3 className="small-title flex flex-col items-start font-medium">
                                    <span>{work.title}</span>
                                    <p>{work.description}</p>
                                </h3>
                                <span className="uppercase font-medium hidden s:block">
                                    ({work.category})
                                </span>
                            </div>
                        </a>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default FeaturedWorks
