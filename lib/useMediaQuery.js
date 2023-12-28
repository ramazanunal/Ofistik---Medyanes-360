"use client";
import {useMediaQuery} from "@uidotdev/usehooks";

export const useDevice = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    return {isMobile};
};

export default useDevice;
