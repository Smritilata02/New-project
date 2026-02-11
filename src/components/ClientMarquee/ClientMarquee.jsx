import './ClientMarquee.css'

const ClientMarquee = () => {
    const clients = [
        { name: 'Google', image: 'https://media.wearemotto.com/wp-content/uploads/2026/01/02164638/Google-logo-blk.jpg' },
        { name: 'Disney', image: 'https://media.wearemotto.com/wp-content/uploads/2026/01/02164641/Disney-logo-blk.jpg' },
        { name: 'Aptos', image: 'https://media.wearemotto.com/wp-content/uploads/2026/01/02122809/Aptos-logo-blk.jpg' },
        { name: 'Andela', image: 'https://media.wearemotto.com/wp-content/uploads/2026/01/02164802/Andela-logo-blk-1.jpg' },
        { name: 'Mastercard', image: 'https://media.wearemotto.com/wp-content/uploads/2026/01/01150446/Mastercard-bw.jpg' },
        { name: 'Klaviyo', image: 'https://media.wearemotto.com/wp-content/uploads/2026/01/01150100/Klav-blk.jpg' },
        { name: 'Microsoft', image: 'https://media.wearemotto.com/wp-content/uploads/2026/01/02165012/Microsoft-logo-blk.jpg' },
        { name: 'Artnet', image: 'https://media.wearemotto.com/wp-content/uploads/2026/01/02135044/Artnet-logo-blk.jpg' },
    ]

    return (
        <div className="relative bg-gray-bg mb-160 s:mb-250 overflow-hidden">
            <div className="site-max font-medium uppercase">
                (Trusted By)
            </div>
            <div className="client-marquee__container flex items-center mt-50">
                <div className="client-marquee__track">
                    {/* First set of logos */}
                    {clients.map((client, index) => (
                        <div key={`first-${index}`} className="client-marquee__item">
                            <div className="pt-[66%] w-[17.5rem] s:w-[25rem] relative media-fill">
                                <img
                                    alt={client.name}
                                    draggable="false"
                                    className="object-contain object-left image-size-fix"
                                    src={client.image}
                                    width="450"
                                    height="300"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {clients.map((client, index) => (
                        <div key={`second-${index}`} className="client-marquee__item">
                            <div className="pt-[66%] w-[17.5rem] s:w-[25rem] relative media-fill">
                                <img
                                    alt={client.name}
                                    draggable="false"
                                    className="object-contain object-left image-size-fix"
                                    src={client.image}
                                    width="450"
                                    height="300"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ClientMarquee
