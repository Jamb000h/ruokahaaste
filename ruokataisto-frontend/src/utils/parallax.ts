import { useEffect } from "react";

const parallax = (e: MouseEvent) => {
  const elements =
    document.querySelectorAll<HTMLDivElement>(".layer--parallax");
  elements.forEach((element) => {
    const parallaxmodifier = Number(
      element.getAttribute("data-parallaxmodifier")
    );
    let left = -5;
    let top = -5;
    let changeFromCenterLeft = Math.abs(e.clientX - window.innerWidth / 2);
    if (e.clientX <= window.innerWidth / 2) {
      left *=
        1 - (changeFromCenterLeft / (window.innerWidth / 2)) * parallaxmodifier;
    } else {
      left *=
        1 + (changeFromCenterLeft / (window.innerWidth / 2)) * parallaxmodifier;
    }

    let changeFromCenterTop = Math.abs(e.clientY - window.innerHeight / 2);
    if (e.clientY <= window.innerHeight / 2) {
      top *=
        1 - (changeFromCenterTop / (window.innerHeight / 2)) * parallaxmodifier;
    } else {
      top *=
        1 + (changeFromCenterTop / (window.innerHeight / 2)) * parallaxmodifier;
    }

    element.style.left = left + "vw";
    element.style.top = top + "vh";
  });
};

export const useParallax = () => {
  useEffect(() => {
    window.addEventListener("mousemove", parallax);

    return () => window.removeEventListener("mousemove", parallax);
  }, []);
};
