import { useEffect, useState, useRef } from "react";
import "./AnimatedBanner.css";

export default function AnimatedBanner({
    texts = [],
    typingSpeed = 120,
    erasingSpeed = 60,
    delayBeforeErase = 1000,
    delayBeforeNext = 500,
    loop = true
}) {
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [fade, setFade] = useState(false);

    const timers = useRef([]);

    function addTimer(fn, time) {
        const id = setTimeout(fn, time);
        timers.current.push(id);
    }

    useEffect(() => {
        const currentWord = texts[index] || "";

        // Typing Letters
        if (isTyping) {
            if (displayText.length < currentWord.length) {
                addTimer(() => {
                    setDisplayText(currentWord.slice(0, displayText.length + 1));
                }, typingSpeed);
            } else {
                // Word fully typed, wait before erasing
                addTimer(() => {
                    setIsTyping(false);
                }, delayBeforeErase);
            }
        }

        // Erasing Letters
        if (!isTyping) {
            if (displayText.length > 0) {
                addTimer(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, erasingSpeed);
            } else {
                // Fade out effect then move to next word
                setFade(true);
                addTimer(() => {
                    setFade(false);
                    const nextIndex = index + 1;

                    if (nextIndex < texts.length) setIndex(nextIndex);
                    else if (loop) setIndex(0);

                    setIsTyping(true);
                }, delayBeforeNext);
            }
        }

        return () => {
            timers.current.forEach((id) => clearTimeout(id));
            timers.current = [];
        };
    }, [displayText, isTyping, index, texts]);

    return (
        <div className="banner-wrapper">
            <span
                aria-live="polite"
                className={`banner-text ${fade ? "fade" : ""}`}
            >
                {displayText}
            </span>
            <span className="cursor">|</span>
        </div>
    );
}
