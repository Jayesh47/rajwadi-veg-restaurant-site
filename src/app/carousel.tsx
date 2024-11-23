import React from 'react';
export default function Carousel({ banner }: { banner: any }) {
    return (
        <section className='h-screen'>
            <style jsx>{`
                div {
                    position: relative;
                    width: 100%;
                    height: 95vh;
                    overflow: hidden;
                }
                .slide {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    opacity: 0;
                    animation: slide-animation 12s linear infinite;
                }
                @keyframes slide-animation {
                    0% { transform: translateX(100%); opacity: 0; }
                    10% { transform: translateX(0); opacity: 1; }
                    20% { opacity: 1; }
                    50% { transform: translateX(0); opacity: 1; }
                    75% { transform: translateX(-100%); opacity: 0; }
                    100% { transform: translateX(-100%); opacity: 0; }
                }
                .slide:nth-child(1) { background-image: url('/uploads/${banner[0]}'); animation-delay: 0s; }
                .slide:nth-child(2) { background-image: url('/uploads/${banner[1]}'); animation-delay: 3s; }
                .slide:nth-child(3) { background-image: url('/uploads/${banner[2]}'); animation-delay: 6s; }
                .slide:nth-child(4) { background-image: url('/uploads/${banner[3]}'); animation-delay: 9s; }
            `}</style>
            <div>
                <div className="slide" key={1}></div>
                <div className="slide" key={2}></div>
                <div className="slide" key={3}></div>
                <div className="slide" key={4}></div>
            </div>
        </section>
    )
}
