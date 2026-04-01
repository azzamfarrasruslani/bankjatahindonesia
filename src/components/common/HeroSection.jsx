"use client";

import { useRef, Fragment } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function HeroSection({ title, description, imageUrl }) {
  const pathname = usePathname();
  const ref = useRef(null);

  // Generate breadcrumbs from pathname
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    return { href, label };
  });

  // Parallax Setup: Start when element is in view, end when it leaves viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Calculate transforms with larger spans for smoother, more noticeable parallax
  // Background moves down slightly slower than scroll
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Initial scale out for the image to prevent cutting off edges during parallax
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);

  // Text fades out faster and moves up to create a depth effect
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <div
      ref={ref}
      className="relative w-full h-[50vh] min-h-[450px] lg:h-[60vh] lg:min-h-[500px] flex items-center justify-center overflow-hidden bg-gray-950"
    >
      {/* Edge-to-Edge Background Image with Parallax & Scale */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center origin-bottom"
        style={{
          backgroundImage: `url(${imageUrl})`,
          y: yImage,
          scale: scaleImage,
        }}
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.8, scale: 1.1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} // Smooth custom bezier
      />

      {/* Advanced Gradient Overlays for Cinematic Feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-transparent to-gray-950/80 pointer-events-none" />

      {/* Pattern Overlay (Dots) */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] opacity-30 pointer-events-none" />

      {/* Massive Glowing Core behind text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[800px] h-[800px] rounded-full bg-orange-500/20 blur-[150px] mix-blend-screen"
        />
      </div>

      <motion.div
        style={{
          opacity: opacityText,
          y: yText,
        }}
        className="relative z-20 flex flex-col items-start justify-center px-6 lg:px-12 text-left w-full max-w-7xl mx-auto pt-32 lg:pt-40"
      >
        {/* Modern Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 lg:mb-8"
        >
          <Breadcrumb>
            <BreadcrumbList className="text-white/60">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbs.map((crumb, index) => (
                <Fragment key={crumb.href}>
                  <BreadcrumbSeparator className="text-white/30" />
                  <BreadcrumbItem>
                    {index === breadcrumbs.length - 1 ? (
                      <BreadcrumbPage className="text-orange-400 font-medium">
                        {crumb.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={crumb.href} className="hover:text-orange-400 transition-colors">
                          {crumb.label}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 w-full"
        >
          {/* Main Title - Ultra Modern Typography */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.1] tracking-tight text-white drop-shadow-2xl">
            {title.split(" ").map((word, i) => (
              <span
                key={i}
                className={
                  i >= title.split(" ").length - 1
                    ? "text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-500"
                    : ""
                }
              >
                {word}{" "}
              </span>
            ))}
          </h1>

          {/* Epic Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl drop-shadow-lg font-light tracking-wide"
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Removed Decorative Line */}
      </motion.div>
    </div>
  );
}
