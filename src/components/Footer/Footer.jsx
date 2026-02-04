import './Footer.css'

const Footer = () => {
    const companyLinks = [
        { href: '/', label: 'Home' },
        { href: '#work', label: 'Case Studies' },
        { href: '#services', label: 'Services' },
        { href: '#method', label: 'Method' },
        { href: '#about', label: 'About' },
        { href: '#blog', label: 'Articles' },
    ]

    const socialLinks = [
        { href: '#', label: 'Instagram' },
        { href: '#', label: 'Twitter' },
        { href: '#', label: 'LinkedIn' },
    ]

    return (
        <footer id="contact" className="footer bg-black overflow-hidden text-white">
            <div className="relative pt-24 s:pt-80 pb-40 s:pb-40">
                

                <div className="site-grid gap-y-40 s:gap-y-0 s:pt-50 pb-60 s:pb-80">
                    <div className="col-span-3 s:col-span-2">
                        <p className="small-title">Company</p>
                        <ul className="flex flex-col items-start mt-22 text-gray-2">
                            {companyLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="font-medium leading-[1.6] transition-color duration-300 ease-out hover:text-white"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-3 s:col-span-2">
                        <p className="small-title">Social</p>
                        <ul className="flex flex-col items-start mt-22 text-gray-2">
                            {socialLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="font-medium leading-[1.6] transition-color duration-300 ease-out hover:text-white"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-6 s:col-span-4">
                        <p className="small-title">Contact</p>
                        <div className="mt-22 text-gray-2">
                            <p className="mb-10">
                                <a
                                    href="mailto:hello@thoughtshop.com"
                                    className="font-medium leading-[1.6] transition-color duration-300 ease-out hover:text-white"
                                >
                                    hello@thoughtshop.com
                                </a>
                            </p>
                            <p className="text-sm opacity-70 mt-40">
                                Ideas Worth Rallying Around®
                            </p>
                        </div>
                    </div>

                    <div className="col-span-6 s:col-span-4">
                        <p className="small-title">Newsletter</p>
                        <form className="mt-22">
                            <div className="flex gap-10">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="footer__input flex-1 bg-transparent border-b border-gray-2 py-10 text-white placeholder:text-gray-2 focus:outline-none focus:border-white transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="footer__submit px-20 py-10 bg-white text-black rounded-full font-medium hover:bg-gray-2 transition-colors"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

               
            </div>
        </footer>
    )
}

export default Footer
