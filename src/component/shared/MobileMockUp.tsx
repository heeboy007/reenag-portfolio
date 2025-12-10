'use client';

import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
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

    const [sliderRef] = useKeenSlider({
        loop: true,
        mode: "snap",
        slideChanged(slider) {},
    });

    const renderFiles = useCallback((filename: string) => {
        return <div key={filename} style={{ width: width - bezel_w, height: height - bezel_h }} className="keen-slider__slide rounded-[4rem] overflow-hidden">
            <Image 
                src={filename} 
                alt="file" 
                width={width - bezel_w}
                height={height - bezel_h}
                className="object-cover " />
        </div>
    }, [files]);

    return <div className="relative flex items-center justify-center overflow-hidden rounded-t-[4.6rem] rounded-b-[4rem]" style={{ 
        width, 
        height,
    }}>
        <div ref={sliderRef} className="keen-slider" style={{ width: width - bezel_w, height: height - bezel_h, marginTop: margin }}>
            {files.map(renderFiles)}
        </div>
        <Image 
            src="/shared/bezel_cut.png" 
            alt="bezel" 
            fill
            className={`absolute top-0 left-0 right-0 bottom-0 object-fill pointer-events-none`} />
    </div>
}

export {
    MobileMockUp
};