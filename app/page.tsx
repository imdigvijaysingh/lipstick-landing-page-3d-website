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
        <a href="#top" className="logo" aria-label="Maison Rouge home">♛ Maison Rouge</a>
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

        <section className="sec bottom" id="shop">
          <Reveal>
            <h2>Rule the room.</h2>
          </Reveal>
        </section>
      </main>
    </>
  );
}
