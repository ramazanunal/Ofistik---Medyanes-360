import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaRedo, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const VideoPlayer = ({ url, index, handleLiked, isVideoMuted, setIsVideoMuted }) => {
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [lastClickTime, setLastClickTime] = useState(0);
    const [showVolumeControls, setShowVolumeControls] = useState(false);
    const videoRef = useRef(null);
    const progressRef = useRef(null);
    const volumeRef = useRef(null);
    const volumeControlsRef = useRef(null);
    const THRESHOLD = 300; // milisaniye

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleDoubleClick = () => {
        const currentTime = Date.now();
        const timeDiff = currentTime - lastClickTime;

        if (timeDiff < THRESHOLD) {
            handleLiked(index);
        }
        setLastClickTime(currentTime);
    };

    const handlePlayPause = () => {
        const video = videoRef.current;

        if (video.paused) {
            video.play();
            setPlaying(true);
        } else {
            video.pause();
            setPlaying(false);
        }
    };

    const handleRestart = () => {
        const video = videoRef.current;
        video.currentTime = 0;
        setCurrentTime(0);
        setPlaying(true);
        video.play();
    };

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        setCurrentTime(video.currentTime);
    };

    const handleSeek = (e) => {
        const video = videoRef.current;
        const seekTime = (e.nativeEvent.offsetX / progressRef.current.offsetWidth) * video.duration;
        video.currentTime = seekTime;
    };

    const handleVolumeChange = () => {
        const video = videoRef.current;
        setVolume(volumeRef.current.value);
        video.volume = volumeRef.current.value;
    };

    const handleVolumeControlsHover = (hovered) => {
        if (hovered) {
            setShowVolumeControls(true);
        } else {
            // Küçük bir gecikme ekleyerek kullanıcının kontrol paneline gitmesine izin veriyoruz
            setTimeout(() => setShowVolumeControls(false), 2500);
        }
    };

    useEffect(() => {
        if (volume == 0) {
            setIsVideoMuted(true)
        } else {
            setIsVideoMuted(false)
        }
    }, [volume])

    useEffect(() => {
        const video = videoRef?.current;
        setDuration(video.duration ? video.duration : 0);
    }, [videoRef?.current?.duration]);

    const handleIntersection = (entries) => {
        entries.forEach((entry) => {
            setIsVisible(entry.isIntersecting);
            if (videoRef.current.src == "") {
                entry.isIntersecting && (videoRef.current.src = url);
            }

            if (entry.isIntersecting) {
                setPlaying(true)
                videoRef.current && videoRef.current.play()
            } else {
                setPlaying(false)
                videoRef.current && videoRef.current.pause()
            }
        });
    };

    // loading lazy video and play when visible
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5, // Or any other threshold you prefer
        };

        const observer = new IntersectionObserver(handleIntersection, options);
        observer.observe(videoRef.current);

        return () => {
            observer.disconnect();
        };
    }, [videoRef, url]);

    useEffect(() => {
        if (!isVisible) {
            videoRef.current.pause();
        }
    }, [isVisible]);

    return (
        <div className="relative rounded-lg object-cover w-full h-full overflow-hidden shadow-lg " onClick={handleDoubleClick}>
            <video
                className="w-full h-full object-cover cursor-pointer"
                id={`video-${index}`}
                ref={videoRef}
                onEnded={() => setPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                muted={isVideoMuted}
                onClick={handlePlayPause}
                playsInline={true}
            > <source src="" type="video/webm" />
                Your browser does not support the video tag.
            </video>
            {(currentTime == 0 || currentTime !== duration) && (
                <div className="absolute bottom-5 left-2 right-0 " onClick={handlePlayPause}>
                    {playing ? (
                        <FaPause className="text-white text-4xl cursor-pointer drop-shadow-sm" />
                    ) : (
                        <FaPlay className="text-white text-4xl cursor-pointer drop-shadow-sm" />
                    )}
                </div>
            )}
            {url && (
                <div className="absolute bottom-0  left-0 right-0 h-3 bg-gray-300" onClick={handleSeek} ref={progressRef}>
                    <div
                        className="h-full bg-gray-500"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                </div>
            )}
            {url && (
                <div className="absolute bottom-5 right-2 flex items-center space-x-2 drop-shadow-sm">
                    <span className="text-white text-sm drop-shadow-sm">{currentTime != NaN && formatTime(currentTime)}</span>
                    <span className="text-white text-sm drop-shadow-sm">/</span>
                    <span className="text-white text-sm drop-shadow-sm">{duration != NaN && formatTime(duration)}</span>
                    <div
                        className=" flex flex-col items-center "
                        onMouseEnter={() => handleVolumeControlsHover(true)}
                        onMouseLeave={() => handleVolumeControlsHover(false)}
                        ref={volumeControlsRef}
                    >
                        <input
                            className={`hidden ${showVolumeControls ? "md:block" : "hidden"} absolute    -top-12 rotate-[270deg] w-20 h-2`}
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            ref={volumeRef}
                            onChange={handleVolumeChange}
                        />
                        {isVideoMuted ? <FaVolumeMute
                            className="text-white text-2xl cursor-pointer"
                            onClick={() => {
                                setIsVideoMuted(false)
                                setVolume(1)
                            }} />
                            : <FaVolumeUp onClick={() => {
                                setIsVideoMuted(true)
                                setVolume(0)
                            }} className="text-white text-2xl  cursor-pointer" />}


                    </div>
                </div>
            )}
            {(currentTime === duration && currentTime != 0) && (
                <div className="absolute bottom-5 left-2 drop-shadow-sm">
                    <div
                        className="cursor-pointer drop-shadow-2xl"
                        onClick={handleRestart}
                    >
                        <FaRedo className="text-white text-2xl drop-shadow-sm" />
                    </div>
                </div>
            )}

        </div>
    );
};

export default VideoPlayer;
