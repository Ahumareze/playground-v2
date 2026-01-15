import { AnimatePresence, motion } from "motion/react";
import { useState, useRef, useLayoutEffect, useEffect } from "react"
import { sliderData } from "../../constants/sliderData";
import SplitText from "gsap/SplitText";
import gsap from "gsap";

gsap.registerPlugin(SplitText);


export default function Slider(){
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [isExiting, setIsExiting] = useState(false);

    const EXIT_DURATION = 450; // must match GSAP exit duration

    const handleNext = () => {
        if (isExiting) return;

        setIsExiting(true);

        setTimeout(() => {
        setSelectedIndex((i) => (i + 1) % sliderData.length);
        setIsExiting(false);
        }, EXIT_DURATION);
    };

    const handleBack = () => {
        if (isExiting) return;

        setIsExiting(true);

        setTimeout(() => {
        setSelectedIndex(
            (i) => (i === 0 ? sliderData.length - 1 : i - 1)
        );
        setIsExiting(false);
        }, EXIT_DURATION);
    };

    const item = sliderData[selectedIndex];

    return(
        <div className="h-screen w-full overflow-hidden">
            <div className="w-[600px] h-[500px] border border-black mx-auto mt-20 relative">
                <AnimatePresence mode="wait">
                    <ItemContainer
                        key={item.title}
                        title={item.title}
                        image={item.image}
                        subText={item.subText}
                        isExiting={isExiting}
                    />
                </AnimatePresence>
            </div>
            <div className="w-[600px] mx-auto flex items-center justify-between">
                <button className="h-[45px] w-fit px-10 rounded-full bg-black text-white cursor-pointer" onClick={handleBack}>Back</button>
                <button className="h-[45px] w-fit px-10 rounded-full bg-black text-white cursor-pointer" onClick={handleNext}>Next</button>
            </div>
        </div>
    )
};

const ItemContainer = ({
  title,
  subText,
  image,
  isExiting,
}: {
  title: string;
  subText: string;
  image: string;
  isExiting: boolean;
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const linesRef = useRef<HTMLElement[]>([]);

  // ENTER animation
  useLayoutEffect(() => {
    if (!titleRef.current || !textRef.current) return;

    const titleSplit = new SplitText(titleRef.current, {
      type: "lines",
    });

    const textSplit = new SplitText(textRef.current, {
      type: "lines",
    });

    const lines = [...titleSplit.lines, ...textSplit.lines];
    linesRef.current = lines;

    lines.forEach((line) => {
      const mask = document.createElement("div");
      mask.style.overflow = "hidden";
      line.parentNode?.insertBefore(mask, line);
      mask.appendChild(line);
    });

    gsap.set([titleRef.current, textRef.current], {
      visibility: "visible",
    });

    gsap.fromTo(
      lines,
      { yPercent: 170, skewY: 5 },
      {
        yPercent: 0,
        skewY: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.05,
      }
    );

    return () => {
      titleSplit.revert();
      textSplit.revert();
    };
  }, []);

  // EXIT animation (triggered by parent)
  useEffect(() => {
    if (!isExiting || !linesRef.current.length) return;

    gsap.to(linesRef.current, {
      yPercent: -170,
      skewY: 6,
      duration: 0.45,
      ease: "power3.in",
    });
  }, [isExiting]);

  return (
    <div className="w-full h-full absolute top-0 left-0 p-10">
      <motion.img
        src={image}
        alt=""
        className="size-[130px] mb-5"
        initial={{ scale: 0.9, filter: "blur(10px)", rotate: -25 }}
        animate={{ scale: 1, filter: "blur(0px)", rotate: 0 }}
        exit={{ scale: 0.7, filter: "blur(10px)", rotate: 40 }}
        transition={{ duration: 0.3 }}
      />

      <h1
        ref={titleRef}
        className="split-text text-6xl font-bold"
      >
        {title}
      </h1>

      <p
        ref={textRef}
        className="split-text mt-5 text-xl leading-[170%]"
      >
        {subText}
      </p>
    </div>
  );
};
