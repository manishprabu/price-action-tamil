import { useState, useEffect, useRef } from 'react';

const Counter = ({ target, duration = 2000, suffix = "", prefix = "" }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const startTimeRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // Target can be a string like "13.1" or "135" or "20475"
    const targetValue = parseFloat(target.toString().replace(/[^0-9.]/g, ''));

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => {
            if (countRef.current) {
                observer.unobserve(countRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let animationFrame;

        const animate = (timestamp) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const progress = timestamp - startTimeRef.current;
            const percentage = Math.min(progress / duration, 1);

            // Easing function (easeOutExpo)
            const easedPercentage = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);

            const currentCount = easedPercentage * targetValue;

            // Format naturally based on whether target has decimals
            if (targetValue % 1 === 0) {
                setCount(Math.floor(currentCount));
            } else {
                setCount(currentCount.toFixed(1));
            }

            if (percentage < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [isVisible, targetValue, duration]);

    // Format for telegram: 20 475
    const formatValue = (val) => {
        if (target.toString().includes(' ')) {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
        return val;
    };

    return (
        <span ref={countRef}>
            {prefix}{formatValue(count)}{suffix}
        </span>
    );
};

export default Counter;
