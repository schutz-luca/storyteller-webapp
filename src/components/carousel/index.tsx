import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.scss";

export const Carousel = ({ items, timeout = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, timeout);

        return () => clearInterval(interval);
    }, [items.length, timeout]);

    // const handleNext = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    // };

    // const handlePrev = () => {
    //     setCurrentIndex((prevIndex) =>
    //         prevIndex === 0 ? items.length - 1 : prevIndex - 1
    //     );
    // };

    return (
        <div className="carousel-container">
            <div className="carousel">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        className="item"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {items[currentIndex]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
