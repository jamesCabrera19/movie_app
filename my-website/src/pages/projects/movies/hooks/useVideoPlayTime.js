import { useEffect, useState } from "react";

export default () => {
    const [playTime, setPlayTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isPlaying) {
            interval = setInterval(() => {
                setPlayTime((prevPlayTime) => prevPlayTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handlePause = (currentTime) => {
        setIsPlaying(false);
        setPlayTime(currentTime);
    };

    function handleStop() {
        setIsPlaying(false);
        setPlayTime(0);
    }

    return [playTime, handlePlay, handlePause, handleStop];
};
