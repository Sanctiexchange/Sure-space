import toast from "react-hot-toast";
import notificationSound from "../data/sounds/notification2.mp3";

const playSound = () => {
    const audio = new Audio(notificationSound)

    audio.currentTime = 0;
    audio.volume = 0.5;

    audio.play().catch((error) => {
        console.warn("audio playback failed:", error);
    });
};

export const toastWithSound = {
    success: (message) => {
        playSound();
        toast.success(message);
    },
    error: (message) => {
        playSound();
        toast.error(message);
    },
    info: (message) => {
        playSound();
        toast.info(message);
    },
    warning: (message) => {
        playSound();
        toast.warning(message)
    },
};


