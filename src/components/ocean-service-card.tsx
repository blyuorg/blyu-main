"use client";

import Link from "next/link";
import { useState } from "react";
import FlipCard from "@/components/flip-card";
import type { OceanService } from "@/lib/ocean-services";

export function OceanServiceCard({
  service,
  index,
}: {
  service: OceanService;
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="ocean-service-tile">
      <FlipCard
        className="ocean-service-flip"
        interactiveContent
        fadeContentAtEdge
        ariaLabel={`${flipped ? "Show front of" : "Read more about"} ${service.title}. Press Enter to flip the card.`}
        front={
          <div className="ocean-service-face ocean-service-face-front">
            <span>{number} / AREA</span>
            <div>
              <h3>
                <Link href={`/ocean/services/${service.slug}`}>
                  {service.title}
                </Link>
              </h3>
              <p>{service.description}</p>
            </div>
          </div>
        }
        back={
          <div className="ocean-service-face ocean-service-face-back">
            <span>{number} / OCEAN SERVICE</span>
            <div>
              <h3>
                <Link href={`/ocean/services/${service.slug}`}>
                  {service.title}
                </Link>
              </h3>
              <p>{service.detail}</p>
            </div>
            <small>Tap to flip back ↶</small>
          </div>
        }
        onFlipChange={setFlipped}
        axis="y"
        flipOnClick
        draggable
        tilt={false}
        glare={false}
        hoverScale={1}
        width={1000}
        height={350}
        radius={20}
        background="#f8f8f6"
        color="#111115"
        shadow={false}
      />
    </article>
  );
}
