'use client';

import { Box, chakra, Image } from "@chakra-ui/react";
import "@/public/svg-style.css";

const CustomSvg = chakra('svg', {
    base: {
        width: "800px",
        height: "650px",
    }
});

export default function Hitbox(
    props: {
        onClick?: (id: number) => void;
    }
) {

    const handleClick = (event: any) => {
        // 获取被点击的元素
        const target = event.target;
        if(event.type === "mousedown") {
            // 检查被点击的元素是否具有特定的类名或属性
            if (target.matches('.button')) {
                console.log('Clickable element clicked:', target.id);
                // send button id to parent component
                props.onClick?.(Number(target.id.replace("btn-", "")));
            }
        // mouse up event, reset input key
        } else if(event.type === "mouseup") {
            props.onClick?.(-1);
        }
    };

    return (
        <CustomSvg>
            <svg  xmlns="http://www.w3.org/2000/svg" onMouseDown={handleClick} onMouseUp={handleClick}  >
                <title>hitbox</title>
                <rect className="frame-path" x="0.36" y="0.36" width="787.82" height="507.1" rx="10" />
                

                <path className="cls-path" d="M328.23,220.98a10,10,0,0,0-4.27-8" />
                <path className="cls-path" d="M323.97,212.95a10,10,0,0,0-9-1.26" />
                <path className="cls-path" d="M276.83,195.89a31.22,31.22,0,0,0,38.31,15.87" />
                <path className="cls-path" d="M276.83,195.89a10,10,0,0,0-7.25-5.48" />
                <path className="cls-path" d="M269.59,190.24a9.94,9.94,0,0,0-8.7,2.66" />
                <path className="cls-path" d="M267.32,157.1a31.23,31.23,0,1,0-6.36,36.06" />
                <path className="cls-path" d="M267.31,157.09a10,10,0,0,0,7.26,5.48" />
                <path className="cls-path" d="M274.55,162.57a10,10,0,0,0,8.7-2.66" />
                <path className="cls-path" d="M297.69,151.87a31.28,31.28,0,0,0-14.51,8" />
                <path className="cls-path" d="M297.7,152.01a10,10,0,0,0,6.91-5.9" />
                <path className="cls-path" d="M304.61,146.13a10,10,0,0,0-.72-9.07" />
                <path className="cls-path" d="M337.53,151.07a31.22,31.22,0,1,0-33.83-14" />
                <path className="cls-path" d="M337.53,150.93a10,10,0,0,0-6.92,5.9" />
                <path className="cls-path" d="M330.62,156.81a10,10,0,0,0,.71,9.08" />
                <path className="cls-path" d="M336.15,181.77a31.32,31.32,0,0,0-4.63-15.89" />
                <path className="cls-path" d="M335.97,181.67a10,10,0,0,0,4.26,8" />
                <path className="cls-path" d="M340.22,189.67a10,10,0,0,0,9,1.26" />
                <path className="cls-path" d="M328.24,220.89a31.23,31.23,0,1,0,21-30" />

                <circle className="cls-path" cx="452.88" cy="352.04" r="31.23" />
                <circle className="cls-path" cx="376.2" cy="379.58" r="38.25" />
                <circle className="cls-path" cx="630.36" cy="155.67" r="31.23" />
                <circle className="cls-path" cx="559.8" cy="161.96" r="31.23" />
                <circle className="cls-path" cx="493.2" cy="186.08" r="31.23" />
                <circle className="cls-path" cx="599.94" cy="92.12" r="31.23" />
                <circle className="cls-path" cx="404.82" cy="163.22" r="31.23" />
                <circle className="cls-path" cx="462.78" cy="122.54" r="31.23" />
                <circle className="cls-path" cx="398.52" cy="92.67" r="31.23" />
                <circle className="cls-path" cx="435.24" cy="226.76" r="31.23" />
                <circle className="cls-path" cx="529.43" cy="98.24" r="31.23" />
                <circle className="cls-path" cx="299.52" cy="352.04" r="31.23" />

                <circle id="btn-1" className="cls-path button" cx="376.2" cy="379.8" r="36" />
                <circle id="btn-2" className="cls-path button" cx="299.52" cy="352.44" r="28.63" />
                <circle id="btn-3" className="cls-path button" cx="452.88" cy="352.44" r="28.63" />
                <circle id="btn-4" className="cls-path button" cx="304.97" cy="182.0" r="28.63" />
                <circle id="btn-5" className="cls-path button" cx="239.31" cy="170.56" r="28.63" />
                <circle id="btn-6" className="cls-path button" cx="359.52" cy="220.35" r="28.63" />
                <circle id="btn-7" className="cls-path button" cx="330.43" cy="120.46" r="28.63" />
                <circle id="btn-8" className="cls-path button" cx="435.24" cy="227.16" r="28.63" />
                <circle id="btn-9" className="cls-path button" cx="404.82" cy="163.67" r="28.63" />
                <circle id="btn-10" className="cls-path button" cx="398.52" cy="93.06" r="28.63" />
                <circle id="btn-11" className="cls-path button" cx="493.2" cy="186.48" r="28.63" />
                <circle id="btn-12" className="cls-path button" cx="462.78" cy="122.94" r="28.63" />
                <circle id="btn-13" className="cls-path button" cx="559.8" cy="162.36" r="28.63" />
                <circle id="btn-14" className="cls-path button" cx="529.43" cy="98.67" r="28.63" />
                <circle id="btn-15" className="cls-path button" cx="630.36" cy="156.06" r="28.63" />
                <circle id="btn-16" className="cls-path button" cx="599.94" cy="92.52" r="28.63" />

                <circle id="btn-17" className="cls-path button" cx="51.99" cy="46.03" r="11.37" />
                <circle id="btn-18" className="cls-path button" cx="96.01" cy="46.03" r="11.37" />
                <circle id="btn-19" className="cls-path button" cx="140.02" cy="46.03" r="11.37" />
                <circle id="btn-20" className="cls-path button" cx="184.03" cy="46.03" r="11.37" />

                <text x="373" y="385" > 1 </text>
                <text x="296" y="358" > 2 </text>
                <text x="450" y="358" > 3 </text>
                <text x="302" y="188" > 4 </text>
                <text x="236" y="177" > 5 </text>
                <text x="357" y="226" > 6 </text>
                <text x="328" y="127" > 7 </text>
                <text x="432" y="232" > 8 </text>

                <text x="401" y="168" > 9 </text>
                <text x="390" y="98" > 10 </text>
                <text x="485" y="191" > 11 </text>
                <text x="454" y="127" > 12 </text>
                <text x="552" y="167" > 13 </text>
                <text x="521" y="103" > 14 </text>
                <text x="622" y="160" > 15 </text>
                <text x="591" y="97" > 16 </text>
                <text x="42" y="78" > 17 </text>
                <text x="88" y="78" > 18 </text>
                <text x="130" y="78" > 19 </text>
                <text x="174" y="78" > 20 </text>

            </svg>
            
        </CustomSvg>
    )
}