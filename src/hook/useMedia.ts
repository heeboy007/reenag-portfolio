'use client';

import { useEffect, useState } from 'react';

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

function getBreakpointFromWidth(width: number): Breakpoint {
    // 40rem, 80rem 기준 (기본 font-size 16px 기준: 640px, 1280px)
    if (width >= 1280) return 'desktop';
    if (width >= 640) return 'tablet';
    return 'mobile';
}

function useBreakpoint(): Breakpoint {
    const [bp, setBp] = useState<Breakpoint>('mobile'); // SSR에서도 안전한 기본값

    useEffect(() => {
        const update = () => {
            const width = window.innerWidth;
            setBp(getBreakpointFromWidth(width));
        };

        update(); // 초기값 세팅
        window.addEventListener('resize', update);

        return () => {
            window.removeEventListener('resize', update);
        };
    }, []);

    return bp;
}

export { useBreakpoint };