import { useState } from "react";

  export const CustomMarker = ({photo, setSelected, event}) =>{
       return(<svg width="84" height="90" viewBox="0 0 91 97" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
       style={{
        position: "relative",
    top: "-46px",
       }}
       onClick={() => {
        setSelected(event);
      }}
       >
        <g filter="url(#filter0_d_1928_1887)">
        <path d="M12 15.1548C12 6.78502 18.785 0 27.1548 0H63.8452C72.215 0 79 6.78502 79 15.1548V50.25C79 59.5008 71.5008 67 62.25 67V67V67C56.9012 67 51.7855 69.189 48.0923 73.0581L47.8079 73.3561C46.551 74.6728 44.449 74.6728 43.1922 73.3561L42.9077 73.0581C39.2145 69.189 34.0988 67 28.75 67V67V67C19.4992 67 12 59.5008 12 50.25V15.1548Z" fill="white"/>
        <rect x="15.988" y="3.98828" width="59.0238" height="59.0238" rx="11.9643" />
        <rect x="15.988" y="3.98828" width="59.0238" height="59.0238" rx="11.9643" fill={`url(#pattern${event.id})`}/>
        </g>
        <defs>
        <filter id="filter0_d_1928_1887" x="0.833333" y="0" width="89.3333" height="98.1068" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="11.1667"/>
        <feGaussianBlur stdDeviation="5.58333"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.808594 0 0 0 0 0.819375 0 0 0 0 0.8625 0 0 0 0.5 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1928_1887"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1928_1887" result="shape"/>
        </filter>
        <pattern id={"pattern" + event.id } patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref={"#image0_" + event.id} transform="translate(-0.25) scale(0.003125)"/>
        </pattern>
        <image id={"image0_" + event.id} width="480" height="320" xlinkHref={photo}  />
        </defs>
        </svg>);
  
  }