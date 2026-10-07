import Link from "next/link";
import LipstickStage from "@/components/LipstickStage";
import Reveal from "@/components/Reveal";
import ShadePicker from "@/components/ShadePicker";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Maison Rouge Signature Lipstick",
  brand: { "@type": "Brand", name: "Maison Rouge" },
  description: "Creamy, smudge-proof luxury lipstick in four shades.",
  category: "Lipstick",
};

const shades = [
  { name: "Rouge", c: "#9b111e" },
  { name: "Berry", c: "#c2185b" },
  { name: "Wine", c: "#6d0f1a" },
  { name: "Coral", c: "#d9534f" },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LipstickStage />

      <header className="nav">
        <Link href="/" className="logo" aria-label="Maison Rouge home">♛ Maison Rouge</Link>
        <div className="nav-links">
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/#shop" className="nav-link">Contact</Link>
        </div>
      </header>

      <main id="top">
        <section className="hero-sec" id="hero">
          <div className="hero-pin" id="hero-pin">
            <h1 className="hero">
            <span>Beauty</span> <span>that stays,</span>
            <br />
            <span>boldness</span> <span>that slays.</span>
          </h1>
          </div>
        </section>

        <section className="sec left">
          <Reveal>
            <h2>One twist.</h2>
            <p>Creamy colour, one swipe.</p>
          </Reveal>
        </section>

        <section className="sec bottom">
          <Reveal>
            <h2>Four shades. One you.</h2>
            <ShadePicker shades={shades} />
          </Reveal>
        </section>

        <section className="sec right">
          <Reveal>
            <h2>Twelve hours.<br />No touch-ups.</h2>
            <p>Weightless and smudge-proof.</p>
          </Reveal>
        </section>

        <section className="sec bottom" id="shop" style={{ flexDirection: "column", paddingBottom: "10vh" }}>
          <Reveal>
            <h2 style={{ marginBottom: "2rem" }}>Rule the room.</h2>
            
            <div style={{
              display: "flex", 
              gap: "1.5rem", 
              flexWrap: "wrap", 
              justifyContent: "center",
              width: "100%",
              maxWidth: "800px",
              margin: "0 auto"
            }}>
              <a href="tel:9458082654" className="cta-card">
                <span className="cta-card-icon">📞</span>
                <span className="cta-card-title">Call Us</span>
                <span className="cta-card-sub">+91 94580 82654</span>
              </a>

              <a href="https://wa.me/919458082654" target="_blank" rel="noopener noreferrer" className="cta-card">
                <span className="cta-card-icon">💬</span>
                <span className="cta-card-title">WhatsApp</span>
                <span className="cta-card-sub">+91 94580 82654</span>
              </a>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}
