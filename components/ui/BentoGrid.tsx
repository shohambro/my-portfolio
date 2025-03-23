"use client";

import React, { useEffect, useState, useRef } from "react";
import { IoCopyOutline } from "react-icons/io5";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";
import MagicButton from "../MagicButton";
import dynamic from "next/dynamic";

// Safely import Lottie with SSR disabled
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

// Define proper types for the Lottie component and options
interface LottieOptions {
  loop: boolean;
  autoplay: boolean;
  animationData: any;
  rendererSettings: {
    preserveAspectRatio: string;
  };
}

interface SafeLottieProps {
  options: LottieOptions;
  height: number;
  width: number;
}

// Safe Lottie wrapper component to prevent unmounting issues
const SafeLottie: React.FC<SafeLottieProps> = ({ options, height, width }) => {
  const [isMounted, setIsMounted] = useState(true);

  // Safely handle component unmounting
  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <Lottie
      options={options}
      height={height}
      width={width}
      isClickToPauseDisabled={true}
    />
  );
};

interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

interface BentoGridItemProps {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}

export const BentoGridItem: React.FC<BentoGridItemProps> = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}) => {
  const leftLists = ["ExpressJS", "NodeJS", "Typescript"];
  const rightLists = ["MongoDB", "ReactJS", "GraphQL"];

  const [copied, setCopied] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);
  const [isAnimationLoaded, setIsAnimationLoaded] = useState(false);

  const handleCopy = () => {
    const text = "shohambrojobasi@gmail.com";
    navigator.clipboard.writeText(text);
    setCopied(true);

    // Reset copied state after some time
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  // Load animation data only when needed
  useEffect(() => {
    let isMounted = true;

    if (id === 6) {
      import("@/data/confetti.json")
        .then((mod) => {
          if (isMounted) {
            setAnimationData(mod.default);
            setIsAnimationLoaded(true);
          }
        })
        .catch((err) => {
          console.error("Failed to load animation:", err);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Render Lottie animation with safety checks
  const renderLottie = () => {
    if (typeof window === "undefined" || !isAnimationLoaded || !animationData) {
      return null;
    }

    const defaultOptions: LottieOptions = {
      loop: copied,
      autoplay: copied,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div className="absolute -bottom-5 right-0">
        {copied && (
          <SafeLottie options={defaultOptions} height={200} width={400} />
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundImage:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div className={`${id === 6 ? "flex justify-center" : ""} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <Image
              src={img}
              alt={img || "Grid image"}
              className={cn(imgClassName, "object-cover object-center")}
              width={20}
              height={20}
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${
            id === 5 ? "w-full opacity-80" : ""
          }`}
        >
          {spareImg && (
            <Image
              src={spareImg}
              alt={spareImg || "Spare image"}
              width={20}
              height={20}
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>
        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
          )}
        >
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
            {description}
          </div>
          <div className="font-sans text-lg lg:text-3xl max-w-96 font-bold z-10">
            {title}
          </div>

          {id === 2 && <GridGlobe />}

          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                {leftLists.map((item, i) => (
                  <span
                    key={i}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
                <span className="lg:py-4 lg:px-3 py-4 px-3 rounded-lg text-center bg-[#10132E]"></span>
              </div>
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                <span className="lg:py-4 lg:px-3 py-4 px-3 rounded-lg text-center bg-[#10132E]"></span>
                {rightLists.map((item, i) => (
                  <span
                    key={i}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
          {id === 6 && (
            <div className="mt-5 relative">
              {renderLottie()}

              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;