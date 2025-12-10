'use client';

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { useCallback } from "react";

const ratio = 812 / 380;
const bezel_w_ratio = 19 / 380;
const bezel_h_ratio = 27 / 812;
const margin_ratio = 5 / 812;

function MobileMockUp({ width, files }: { 
    width: number, 
    files: string[] 
}) {
    const height = width * ratio;
    const bezel_w = width * bezel_w_ratio;
    const bezel_h = height * bezel_h_ratio;
    const margin = height * margin_ratio;
    const rounded_top = 4.6 * 16 / 812;
    const rounded_bottom = 4 * 16 / 812;

    const [sliderRef] = useKeenSlider({
        loop: true,
        mode: "snap",
        slideChanged(slider) {},
    });

    const renderFiles = useCallback((filename: string) => {
        return <img 
            key={filename} 
            src={filename} 
            alt="file" 
            width={width - bezel_w}
            height={height - bezel_h}
            className="keen-slider__slide object-cover rounded-[4rem]" />
    }, [files]);

    return <div className="relative flex items-center justify-center overflow-hidden rounded-t-[4.6rem] rounded-b-[4rem]" style={{ 
        width, 
        height,
    }}>
        <div ref={sliderRef} className="keen-slider" style={{ width: width - bezel_w, height: height - bezel_h, marginTop: margin }}>
            {files.map(renderFiles)}
        </div>
        <img 
            src="/shared/bezel_cut.png" 
            alt="bezel" 
            width={width}
            height={height}
            style={{ width: width, height: height }}
            className={`absolute top-0 left-0 object-fill pointer-events-none`} />
    </div>
}

export {
    MobileMockUp
};