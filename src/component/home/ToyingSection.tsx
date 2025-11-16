'use client';

import { toy_generation } from "@/sheets/const";
import ToyingItem from "./ToyingItem";

// toying section, for fabulous three.js scenes
function ToyingSection() {
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