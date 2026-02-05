import "../../App.css";

const items = [
    { text: "National Award for Creative Excellence", img: "/img1.png" },
    { text: "Three Times Winner of President’s Award", img: "/img2.png" },
    { text: "Most Coveted Calcutta Agency of the Year", img: "/img3.png" },
    { text: "Best public service campaign from advertising club", img: "/img4.png" },
];

export default function Marquee() {
    return (
        <div className="marquee-container">
            <div className="marquee-track">
                {[...items, ...items].map((item, index) => (
                    <div className="marquee-item" key={index}>
                        <img src={item.img} alt="icon" />
                        <span>{item.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
