import { useState } from 'react'
import './PressArticles.css'

const PressArticles = () => {
    const [activeTab, setActiveTab] = useState('press')

    const pressItems = [
        {
            label: 'Award',
            labelColor: '#9c98ef',
            title: 'Sunny Bonnell & Ashleigh Hansberger Named Thinkers50 Radar Award',
            image: 'https://media.wearemotto.com/wp-content/uploads/2024/01/01154718/MOT-Radar-Thinkers-r1-1.jpg',
            href: '#',
        },
        {
            label: 'Press',
            labelColor: '#beee98',
            title: 'Why brand is the new operating system',
            image: 'https://media.wearemotto.com/wp-content/uploads/2026/01/23182546/MOT-Fast-Company-Brand-OS-0.gif',
            href: '#',
        },
        {
            label: 'Event',
            labelColor: '#6980FF',
            title: 'Bloomberg with Sunny Bonnell on Visionary Leadership',
            image: 'https://media.wearemotto.com/wp-content/uploads/2024/03/11173031/MOT-Bloomberg-Post-r1.jpg',
            href: '#',
        },
    ]

    const articleItems = [
        {
            label: 'Vision',
            labelColor: '#c7cfd1',
            title: 'How vision, culture, and brand alignment shape success',
            image: 'https://media.wearemotto.com/wp-content/uploads/2024/01/25203135/FastTrack-09.jpg',
            href: '#',
        },
        {
            label: 'Brand',
            labelColor: '#d9d9d9',
            title: 'What makes a brand culturally relevant?',
            image: 'https://media.wearemotto.com/wp-content/uploads/2025/04/02173308/MOT-Seed-Stage-Brand-Qualities.jpg',
            href: '#',
        },
        {
            label: 'Culture',
            labelColor: '#d4cccc',
            title: 'Why every company needs a culture code',
            image: 'https://media.wearemotto.com/wp-content/uploads/2024/09/22193737/Culture-Code-1.jpg',
            href: '#',
        },
    ]

    const currentItems = activeTab === 'press' ? pressItems : articleItems

    return (
        <section className="mb-300 overflow-hidden">
            <div className="site-grid">
                <p className="col-span-6 s:col-span-5 indent-[5rem] s:indent-[8rem]">
                    Our thought leadership in the press and latest thinking on vision, leadership, culture, and brand.
                </p>
                <nav className="col-span-6 s:col-span-12 flex flex-col s:flex-row items-start s:items-end pt-30 -ml-5" aria-label="Navigation">
                    <h2
                        className={`h2 font-disp cursor-pointer uppercase font-medium transition-opacity duration-300 ease-out ${activeTab === 'press' ? '' : 'opacity-25'}`}
                        onClick={() => setActiveTab('press')}
                    >
                        PRESS
                    </h2>
                    <h2
                        className={`h2 font-disp cursor-pointer uppercase font-medium s:ml-60 transition-opacity duration-300 ease-out ${activeTab === 'articles' ? '' : 'opacity-25'}`}
                        onClick={() => setActiveTab('articles')}
                    >
                        ARTICLES
                    </h2>
                    <a href="#blog" className="!hidden s:!inline-flex uline-double mt-40 s:ml-auto s:mb-30" role="button">
                        Read all articles
                    </a>
                </nav>
            </div>

            <div className="relative mt-80">
                <div className="site-grid gap-y-30">
                    {currentItems.map((item, index) => (
                        <article key={index} className="col-span-6 s:col-span-4 relative press-article__item">
                            <a href={item.href} className="block relative">
                                <span
                                    className="absolute top-[3rem] left-[2rem] label uppercase flex items-center text-15 px-20 h-[3.6rem] rounded-full z-2"
                                    style={{ backgroundColor: item.labelColor }}
                                >
                                    {item.label}
                                </span>
                                <figure className="media-fill h-scale pt-[125%] relative press-article__figure" role="presentation">
                                    <img
                                        alt={item.title}
                                        draggable="false"
                                        className="press-article__image"
                                        src={item.image}
                                        loading="lazy"
                                    />
                                </figure>
                                <div className="flex justify-between pt-20 pr-60">
                                    <h3 className="font-sans text-26 leading-[1.26]">
                                        {item.title}
                                    </h3>
                                </div>
                            </a>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PressArticles
