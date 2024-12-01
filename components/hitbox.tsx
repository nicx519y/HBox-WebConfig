'use client';

import styled, { keyframes, css } from 'styled-components';
import { useEffect, useMemo, useState, useRef } from "react";
import { LEDS_ANIMATION_CYCLE, LEDS_COLOR_DEFAULT, LedsEffectStyle } from "@/types/gamepad-config";
import { Color, parseColor } from '@chakra-ui/react';

const StyledSvg = styled.svg`
  width: 800px;
  height: 650px;
  position: relative;
`;

// 创建一个动态的 keyframes 生成函数
const createBreathingAnimation = (color1: string, color2: string) => keyframes`
  0% { fill: ${color1}; }
  50% { fill: ${color2}; }
  100% { fill: ${color1}; }
`;

/**
 * StyledCircle
 * @param props 
 *  $color: string - 颜色
 *  $opacity: number - 透明度
 *  $interactive: boolean - 是否可交互  
 * @returns 
 */
const StyledCircle = styled.circle<{
  $color?: string;
  $opacity?: number;
  $interactive?: boolean;
  $highlight?: boolean;
}>`
  stroke: #fff;
  stroke-width: 1px;
//   stroke-dasharray: ${props => props.$highlight ? '8,6' : 'none'};
  cursor: ${props => props.$interactive ? 'pointer' : 'default'};
  pointer-events: ${props => props.$interactive ? 'auto' : 'none'};
  opacity: ${props => props.$opacity};
  fill: ${props => props.$color};
  stroke: ${props => props.$highlight ? 'yellowgreen' : '#fff'};
  stroke-width: ${props => props.$highlight ? '4px' : '1px'};

  &:hover {
    stroke-width: ${props => props.$interactive ? '4px' : '1px'};
    stroke: ${props => props.$interactive ? 'green' : '#fff'};
    // stroke-dasharray: ${props => props.$interactive ? '8,6' : 'none'};
  }

  &:active {
    stroke-width: ${props => props.$interactive ? '4px' : '1px'};
    stroke: ${props => props.$interactive ? 'yellowgreen' : '#fff'};
    // stroke-dasharray: ${props => props.$interactive ? '8,6' : 'none'};
  }
`;

const StyledPath = styled.path`
  fill: none;
  stroke: #fff;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1px;
`;

const StyledFrame = styled.rect`
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
`;

/**
 * StyledText
 *  text-align: center;
 *  font-family: "Helvetica", cursive;
 *  fill: #ccc;
 *  font-size: .9rem;
 *  cursor: default;
 *  pointer-events: none;
 *  stroke: #000;
 * @returns 
 */
const StyledText = styled.text`
  text-align: center;
  font-family: "Helvetica", cursive;
  fill: #ccc;
  font-size: .9rem;
  cursor: default;
  pointer-events: none;
  stroke: #000;
  stroke-width: 1.8px;
  paint-order: stroke fill;
`;

const btnPosList = [
    { x: 376.2, y: 379.8, r: 36 },
    { x: 299.52, y: 352.44, r: 28.63 },
    { x: 452.88, y: 352.44, r: 28.63 },
    { x: 304.97, y: 182.0, r: 28.63 },
    { x: 239.31, y: 170.56, r: 28.63 },
    { x: 359.52, y: 220.35, r: 28.63 },
    { x: 330.43, y: 120.46, r: 28.63 },
    { x: 435.24, y: 226.76, r: 28.63 },
    { x: 404.82, y: 163.22, r: 28.63 },
    { x: 398.52, y: 92.67, r: 28.63 },
    { x: 493.2, y: 186.48, r: 28.63 },
    { x: 462.78, y: 122.94, r: 28.63 },
    { x: 559.8, y: 162.36, r: 28.63 },
    { x: 529.43, y: 98.67, r: 28.63 },
    { x: 630.36, y: 156.06, r: 28.63 },
    { x: 599.94, y: 92.52, r: 28.63 },
    { x: 184.03, y: 46.03, r: 11.37 },
    { x: 140.02, y: 46.03, r: 11.37 },
    { x: 96.01, y: 46.03, r: 11.37 },
    { x: 51.99, y: 46.03, r: 11.37 },
];

const btnLen = btnPosList.length;

const lerpColor = (color1: Color, color2: Color, t: number) => {

    const r = Math.round(color1.getChannelValue('red') + (color2.getChannelValue('red') - color1.getChannelValue('red')) * t);
    const g = Math.round(color1.getChannelValue('green') + (color2.getChannelValue('green') - color1.getChannelValue('green')) * t);
    const b = Math.round(color1.getChannelValue('blue') + (color2.getChannelValue('blue') - color1.getChannelValue('blue')) * t);
    
    return parseColor(`rgb(${r}, ${g}, ${b})`);

};

/**
 * Hitbox
 * @param props 
 * onClick: (id: number) => void - 点击事件
 * colorEnabled: boolean - 是否用颜色
 * color1: string - 默认颜色
 * color2: string - 呼吸颜色
 * brightness: number - 亮度
 * interactiveIds: number[] - 可交互按钮id列表  
 * @returns 
 */
export default function Hitbox(props: { 
    onClick?: (id: number) => void, 
    hasLeds?: boolean,
    colorEnabled?: boolean,
    frontColor?: Color,
    backColor1?: Color,
    backColor2?: Color,
    brightness?: number,
    effectStyle?: LedsEffectStyle,
    interactiveIds?: number[],
    highlightIds?: number[],
}) {

    const [colorList, setColorList] = useState<Color[]>(Array(btnLen).fill(LEDS_COLOR_DEFAULT));

    const frontColorRef = useRef(props.frontColor ?? LEDS_COLOR_DEFAULT);
    const backColor1Ref = useRef(props.backColor1 ?? LEDS_COLOR_DEFAULT);
    const backColor2Ref = useRef(props.backColor2 ?? LEDS_COLOR_DEFAULT);
    const colorEnabledRef = useRef(props.colorEnabled ?? false);
    const effectStyleRef = useRef(props.effectStyle ?? LedsEffectStyle.STATIC);
    const pressedButtonListRef = useRef(Array(btnLen).fill(-1)); 


    const handleClick = (event: React.MouseEvent<SVGElement>) => {
        const target = event.target as SVGElement;
        if(!target.id || !target.id.startsWith("btn-")) return;
        const id = Number(target.id.replace("btn-", ""));
        if(id === Number.NaN || !(props.interactiveIds?.includes(id) ?? false)) return;
        if(event.type === "mousedown") {
            props.onClick?.(id);
            pressedButtonListRef.current[id] = 1;
        } else if(event.type === "mouseup") {
            props.onClick?.(-1);
            pressedButtonListRef.current[id] = -1;
        }
    };

    const handleLeave = (event: React.MouseEvent<SVGElement>) => {
       const target = event.target as SVGElement;
       if(!target.id || !target.id.startsWith("btn-")) return;
       const id = Number(target.id.replace("btn-", ""));
       if(id === Number.NaN || !(props.interactiveIds?.includes(id) ?? false)) return;
       if (event.type === "mouseleave") {
            pressedButtonListRef.current[id] = -1;
       }
    }

    
    /**
     * 更新按钮颜色
     */
    useEffect(() => {

        if(!props.hasLeds) {
            return;
        }

        let animationFrameId: number;
        let timer: number;
        
        // 更新按钮颜色 
        const updateColors = () => {

            const now = new Date().getTime();
            const deltaTime = now - timer;
            const progress = deltaTime % LEDS_ANIMATION_CYCLE / LEDS_ANIMATION_CYCLE;
            const newColors = colorList.map((_, index) => {
                if (1 === pressedButtonListRef.current[index] && colorEnabledRef.current) {
                    return frontColorRef.current;
                } else if (colorEnabledRef.current) {
                    if(effectStyleRef.current === LedsEffectStyle.BREATHING) {
                        const t = Math.sin(progress * Math.PI);
                        return lerpColor(backColor1Ref.current as Color, backColor2Ref.current as Color, t);
                    } else if(effectStyleRef.current === LedsEffectStyle.STATIC) {
                        return backColor1Ref.current;
                    }
                }
                return LEDS_COLOR_DEFAULT;
            });
            
            setColorList(newColors as Color[]);
            animationFrameId = requestAnimationFrame(updateColors);
        };

        timer = new Date().getTime();
        // 启动动画 
        animationFrameId = requestAnimationFrame(updateColors);

        return () => {
            cancelAnimationFrame(animationFrameId);
            timer = 0;
        };
    }, []); 

    useEffect(() => {
        const brightness = props.brightness ?? 100;
        if(props.frontColor) {
            const r = props.frontColor.getChannelValue('red') * (brightness / 100 ?? 1);
            const g = props.frontColor.getChannelValue('green') * (brightness / 100 ?? 1);
            const b = props.frontColor.getChannelValue('blue') * (brightness / 100 ?? 1);
            frontColorRef.current = parseColor(`rgb(${r}, ${g}, ${b})`);
        }
    }, [props.frontColor, props.brightness]);

    useEffect(() => {
        const brightness = props.brightness ?? 100;
        if(props.backColor1) {
            const r = props.backColor1.getChannelValue('red') * (brightness / 100 ?? 1);
            const g = props.backColor1.getChannelValue('green') * (brightness / 100 ?? 1);
            const b = props.backColor1.getChannelValue('blue') * (brightness / 100 ?? 1);
            backColor1Ref.current = parseColor(`rgb(${r}, ${g}, ${b})`);
        }
    }, [props.backColor1, props.brightness]);

    useEffect(() => {
        const brightness = props.brightness ?? 100;
        if(props.backColor2) {
            const r = props.backColor2.getChannelValue('red') * (brightness / 100 ?? 1);
            const g = props.backColor2.getChannelValue('green') * (brightness / 100 ?? 1);
            const b = props.backColor2.getChannelValue('blue') * (brightness / 100 ?? 1);
            backColor2Ref.current = parseColor(`rgb(${r}, ${g}, ${b})`);
        }
    }, [props.backColor2, props.brightness]);

    useEffect(() => {
        effectStyleRef.current = props.effectStyle ?? LedsEffectStyle.STATIC;
    }, [props.effectStyle]);

    useEffect(() => {   
        colorEnabledRef.current = props.colorEnabled ?? true;
    }, [props.colorEnabled]);

    return (
        <StyledSvg xmlns="http://www.w3.org/2000/svg" 
            onMouseDown={handleClick} 
            onMouseUp={handleClick}
        >
            <title>hitbox</title>
            <StyledFrame x="0.36" y="0.36" width="787.82" height="507.1" rx="10" />
            
            <StyledPath d="M328.23,220.98a10,10,0,0,0-4.27-8" />
            <StyledPath d="M323.97,212.95a10,10,0,0,0-9-1.26" />
            <StyledPath d="M276.83,195.89a31.22,31.22,0,0,0,38.31,15.87" />
            <StyledPath d="M276.83,195.89a10,10,0,0,0-7.25-5.48" />
            <StyledPath d="M269.59,190.24a9.94,9.94,0,0,0-8.7,2.66" />
            <StyledPath d="M267.32,157.1a31.23,31.23,0,1,0-6.36,36.06" />
            <StyledPath d="M267.31,157.09a10,10,0,0,0,7.26,5.48" />
            <StyledPath d="M274.55,162.57a10,10,0,0,0,8.7-2.66" />
            <StyledPath d="M297.69,151.87a31.28,31.28,0,0,0-14.51,8" />
            <StyledPath d="M297.7,152.01a10,10,0,0,0,6.91-5.9" />
            <StyledPath d="M304.61,146.13a10,10,0,0,0-.72-9.07" />
            <StyledPath d="M337.53,151.07a31.22,31.22,0,1,0-33.83-14" />
            <StyledPath d="M337.53,150.93a10,10,0,0,0-6.92,5.9" />
            <StyledPath d="M330.62,156.81a10,10,0,0,0,.71,9.08" />
            <StyledPath d="M336.15,181.77a31.32,31.32,0,0,0-4.63-15.89" />
            <StyledPath d="M335.97,181.67a10,10,0,0,0,4.26,8" />
            <StyledPath d="M340.22,189.67a10,10,0,0,0,9,1.26" />
            <StyledPath d="M328.24,220.89a31.23,31.23,0,1,0,21-30" />

            <StyledCircle cx="452.88" cy="352.04" r="31.23" $opacity={1} $interactive={false} />
            <StyledCircle cx="376.2" cy="379.58" r="38.25"  $opacity={1} $interactive={false} />
            <StyledCircle cx="630.36" cy="155.67" r="31.23" $opacity={1} $interactive={false} />
            <StyledCircle cx="559.8" cy="161.96" r="31.23" $opacity={1} $interactive={false} />
            <StyledCircle cx="493.2" cy="186.08" r="31.23" $opacity={1} $interactive={false} />
            <StyledCircle cx="599.94" cy="92.12" r="31.23" $opacity={1} $interactive={false} />
            <StyledCircle cx="404.82" cy="163.22" r="31.23" $opacity={1} $interactive={false} />
            <StyledCircle cx="462.78" cy="122.54" r="31.23" $opacity={1} $interactive={false} />
            <StyledCircle cx="398.52" cy="92.67" r="31.23" $opacity={1} $interactive={false} />
            <StyledCircle cx="435.24" cy="226.76" r="31.23" $opacity={1} $interactive={false} />
            <StyledCircle cx="529.43" cy="98.24" r="31.23" $opacity={1} $interactive={false} />
            <StyledCircle cx="299.52" cy="352.04" r="31.23" $opacity={1} $interactive={false} />

            {btnPosList.map((item, index) => (
                <StyledCircle 
                    id={`btn-${index}`}
                    key={index} 
                    cx={item.x} 
                    cy={item.y} 
                    r={item.r} 
                    onMouseLeave={handleLeave}
                    $color={ [16, 17, 18, 19].includes(index) ? LEDS_COLOR_DEFAULT : colorList[index]?.toString('css') ?? LEDS_COLOR_DEFAULT} 
                    $opacity={1} 
                    $interactive={ props.interactiveIds?.includes(index) ?? false } 
                    $highlight={props.highlightIds?.includes(index) ?? false}
                />
            ))}

            <StyledText x="373" y="385">1</StyledText>
            <StyledText x="296" y="358">2</StyledText>
            <StyledText x="450" y="358">3</StyledText>
            <StyledText x="302" y="188">4</StyledText>
            <StyledText x="236" y="177">5</StyledText>
            <StyledText x="357" y="226">6</StyledText>
            <StyledText x="328" y="127">7</StyledText>
            <StyledText x="432" y="232">8</StyledText>

            <StyledText x="401" y="168">9</StyledText>
            <StyledText x="390" y="98">10</StyledText>
            <StyledText x="485" y="191">11</StyledText>
            <StyledText x="454" y="127">12</StyledText>
            <StyledText x="552" y="167">13</StyledText>
            <StyledText x="521" y="103">14</StyledText>
            <StyledText x="622" y="160">15</StyledText>
            <StyledText x="591" y="97">16</StyledText>
            <StyledText x="174" y="78">17</StyledText>
            <StyledText x="130" y="78">18</StyledText>
            <StyledText x="88" y="78">19</StyledText>
            <StyledText x="42" y="78">Fn</StyledText>
        </StyledSvg>
    );
}