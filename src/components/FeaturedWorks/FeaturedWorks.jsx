import { useEffect, useRef } from 'react'
import './FeaturedWorks.css'

const FeaturedWorks = () => {
    // 🔵 Cursor refs
    const cursorRef = useRef(null)
    const mouse = useRef({ x: 0, y: 0 })
    const pos = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const cursor = cursorRef.current
        if (!cursor) return

        const speed = 0.12 // lower = smoother (Motto-like)

        const animate = () => {
            pos.current.x += (mouse.current.x - pos.current.x) * speed
            pos.current.y += (mouse.current.y - pos.current.y) * speed

            cursor.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
            requestAnimationFrame(animate)
        }

        animate()

        const move = (e) => {
            mouse.current.x = e.clientX - 55
            mouse.current.y = e.clientY - 55
        }

        window.addEventListener('mousemove', move)

        // 🟡 Show / hide cursor on hover
        const items = document.querySelectorAll('.featured-work__item')

        const showCursor = () => (cursor.style.opacity = '1')
        const hideCursor = () => (cursor.style.opacity = '0')

        items.forEach((item) => {
            item.addEventListener('mouseenter', showCursor)
            item.addEventListener('mouseleave', hideCursor)
        })

        // 🟣 Hide cursor on scroll (Motto behavior)
        const onScroll = () => hideCursor()
        window.addEventListener('scroll', onScroll)

        return () => {
            window.removeEventListener('mousemove', move)
            window.removeEventListener('scroll', onScroll)
            items.forEach((item) => {
                item.removeEventListener('mouseenter', showCursor)
                item.removeEventListener('mouseleave', hideCursor)
            })
        }
    }, [])

    // 🔵 Works data
    const works = [
        {
            title: 'Nomina',
            description: 'Onchain infrastructure',
            category: 'Crypto',
            videoUrl:
                'https://player.vimeo.com/progressive_redirect/playback/1118348583/rendition/1440p/file.mp4?loc=external&log_user=0&signature=e3da956b016cce94a36099116cb1076af571b20df7126cda660a70be633140fa',
            href: '#',
        },
        {
            title: 'Impel',
            description: 'Automotive intelligence',
            category: 'AI',
            imageUrl:
                'https://media.wearemotto.com/wp-content/uploads/2025/09/26105318/01-IMP-Hero.webp',
            href: '#',
        },
        {
            title: 'Klaviyo',
            description: 'Marketing data platform',
            category: 'Tech',
            imageUrl:
                'https://media.wearemotto.com/wp-content/uploads/2025/07/22182754/KLA-Flag-Cover.webp',
            href: '#',
        },
        {
            title: 'Cresta',
            description: 'Enterprise Gen AI',
            category: 'AI',
            imageUrl:
                'https://media.wearemotto.com/wp-content/uploads/2025/08/01181049/Cresta-hero.jpg',
            href: '#',
        },
    ]

    return (
        <section id="work" className="relative bg-black mb-200 s:mb-300">
            <div className="site-max s:flex justify-between s:items-end s:flex-row">
                <h2 className="h2 smax:text-50 uppercase max-w-[100rem]">
                    <span style={{ color: '#FFD700' }}>Selec<img src="src/assets/T.png" alt="T" className="logo-t" />ed</span>
                    <br />
                    <span style={{ color: '#800080' }}>work</span>
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

            {/* 🔴 GLOBAL SMOOTH CURSOR */}
            <div ref={cursorRef} className="featured-work__hover-indicator">
                →
            </div>
        </section>
    )
}

export default FeaturedWorks
