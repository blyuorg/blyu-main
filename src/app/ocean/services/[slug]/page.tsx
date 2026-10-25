import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOceanService, oceanServices } from "@/lib/ocean-services";
import "./service-page.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return oceanServices.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getOceanService(slug);
  if (!service) return { title: "Ocean service — Blyu" };
  return {
    title: `${service.title} — Ocean by Blyu`,
    description: service.description,
  };
}

export default async function OceanServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getOceanService(slug);
  if (!service) notFound();

  const index = oceanServices.findIndex((item) => item.slug === slug);
  const previous = oceanServices[(index - 1 + oceanServices.length) % oceanServices.length];
  const next = oceanServices[(index + 1) % oceanServices.length];

  return (
    <main className="ocean-service-detail">
      <header className="ocean-service-detail-header">
        <Link className="ocean-service-detail-logo" href="/" aria-label="Blyu home" />
        <Link className="ocean-service-detail-back" href="/ocean#ocean-services">
          <span aria-hidden="true">←</span> All Ocean services
        </Link>
      </header>

      <section className="ocean-service-detail-hero" aria-labelledby="service-title">
        <div className="ocean-service-detail-intro">
          <p className="ocean-service-detail-kicker">OCEAN / AREA {String(index + 1).padStart(2, "0")}</p>
          <h1 id="service-title">{service.title}</h1>
          <p>{service.description}</p>
        </div>
        <div className="ocean-service-detail-mark" aria-hidden="true">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <i />
          <i />
        </div>
      </section>

      <section className="ocean-service-detail-body" aria-labelledby="approach-title">
        <div>
          <p className="ocean-service-detail-kicker">THE APPROACH</p>
          <h2 id="approach-title">Start with the reason behind the work.</h2>
          <p>{service.detail}</p>
        </div>
        <div className="ocean-service-detail-includes">
          <p className="ocean-service-detail-kicker">WHAT THIS CAN INCLUDE</p>
          <ul>
            {service.includes.map((item, itemIndex) => (
              <li key={item}>
                <span>{String(itemIndex + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </li>
            ))}
          </ul>
          <p>The exact scope and deliverables are agreed in a proposal for your business.</p>
        </div>
      </section>

      <section className="ocean-service-detail-cta" aria-labelledby="next-step-title">
        <p className="ocean-service-detail-kicker">YOUR NEXT MOVE</p>
        <h2 id="next-step-title">Let’s talk about what your business needs.</h2>
        <Link href="/start-project">Start a project <span aria-hidden="true">↗</span></Link>
      </section>

      <nav className="ocean-service-detail-neighbors" aria-label="More Ocean services">
        <Link href={`/ocean/services/${previous.slug}`}><span>← PREVIOUS AREA</span>{previous.title}</Link>
        <Link href={`/ocean/services/${next.slug}`}><span>NEXT AREA →</span>{next.title}</Link>
      </nav>
    </main>
  );
}
