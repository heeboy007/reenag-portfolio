'use client';

import { toy_generation_tablet, toy_generation_mobile } from "@/sheets/const";
import ToyingItem from "./ToyingItem";
import { useBreakpoint } from "@/hook/useMedia";

// toying section, for fabulous three.js scenes
function ToyingSection() {
    const breakpoint = useBreakpoint();
    const toy_generation = breakpoint === 'mobile' ? toy_generation_mobile : toy_generation_tablet;
    const toy_items = Array.from({ length: toy_generation }, (_, index) => {
        return <ToyingItem key={index} randomizeBgColor={true} />;
    });

    return (
        <div className="flex flex-wrap justify-center items-center">
            <ToyingItem />
            {toy_items}
        </div>
    )
}

export default ToyingSection;