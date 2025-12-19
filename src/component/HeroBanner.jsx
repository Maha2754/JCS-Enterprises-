import React, { useEffect, useState } from "react";
import "../style/herobanner.css";

import banner1 from "../assets/banners/banner.png";
import banner2 from "../assets/banners/banner2.png";
import banner3 from "../assets/banners/banner1.png";

const banners = [banner1, banner2, banner3];

const HeroBanner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000); // 4 sec per banner

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section">
      {banners.map((banner, i) => (
        <div
          key={i}
          className={`hero-slide ${i === index ? "active" : ""}`}
          style={{ backgroundImage: `url(${banner})` }}
        />
      ))}
    </section>
  );
};

export default HeroBanner;
