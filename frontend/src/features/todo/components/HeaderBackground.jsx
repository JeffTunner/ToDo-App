import { useEffect, useState } from "react";
import BgDesktopDark from "../../../../images/bg-desktop-dark.jpg";
import BgDesktopLight from "../../../../images/bg-desktop-light.jpg";
import BgMobileDark from "../../../../images/bg-mobile-dark.jpg";
import BgMobileLight from "../../../../images/bg-mobile-light.jpg";


export default function HeaderBackground({isDark}) {

    const[isMobile, setIsMobile] = useState(false);

    function handleResize() {
        setIsMobile(window.innerWidth < 768);
    }

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    },[]);
  
    const image = isMobile
  ? (isDark ? BgMobileDark : BgMobileLight)
  : (isDark ? BgDesktopDark : BgDesktopLight);
    return (
        <div>
            <img src={image} alt="Background" className="w-screen"/>
        </div>
    );
}