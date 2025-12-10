'use client';

import { useEffect, useState } from "react";
import ThreeScene from "./ThreeScene";

import { main_color } from "@/sheets/const";
import { randomPastel } from "@/util/random";

function ToyingItem({ randomizeBgColor }: { randomizeBgColor?: boolean }) {
    const [ bgColor, setBgColor ] = useState(main_color);

    useEffect(() => {
        if (randomizeBgColor) {
            setBgColor(randomPastel());
        }
    }, [randomizeBgColor]);

    return (
        <div
            style={{ backgroundColor: bgColor }}
            className="desktop:w-[25vh] desktop:h-[25vh] w-[20vh] h-[20vh] rounded-2xl relative m-4">
            <ThreeScene />
        </div>
    )
}

export default ToyingItem;