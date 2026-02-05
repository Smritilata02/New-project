import './Contentblock.css';
import SlidingImage from './SlidingImage';

const ContentBlock = () => {
    const links = [
        { href: '#services', label: 'Explore our services →' },
        { href: '#work', label: 'See our case studies →' },
        { href: '#method', label: 'Discover our methodology →' },
    ];

    return (
        <div className="contentblock-container">
            <div className="contentblock-left">
                <SlidingImage />
            </div>
            <div className="contentblock-main">
                <h2 className="contentblock-title">
                    Great brands are more than famous names, they're Ideas Worth Rallying Around®.
                </h2>
                <div className="contentblock-desc">
                    Thoughtshop® partners with innovative companies to create impactful, future-ready brands. We collaborate with visionary teams and design-led companies that require support in company positioning, category definition, and brand expression to unify their team, drive growth, and amplify brand influence in modern culture.
                </div>
                <div className="contentblock-purpose">
                    (CHOOSE YOUR PURPOSE)
                </div>
                <div className="contentblock-links">
                    {links.map((link, index) => (
                        <a key={index} href={link.href} className="contentblock-link">
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ContentBlock;