import Link from "next/link";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#FFD1DC", color: "var(--ink)" }}>
      <header className="nav" style={{ position: "relative", marginBottom: "2rem" }}>
        <Link href="/" className="logo" style={{ color: "var(--ruby)" }} aria-label="Maison Rouge home">♛ Maison Rouge</Link>
        <div className="nav-links">
          <Link href="/about" className="nav-link" style={{ color: "var(--ruby)", fontWeight: "bold" }}>About</Link>
          <Link href="/#shop" className="nav-link" style={{ color: "var(--ink)" }}>Contact</Link>
        </div>
      </header>

      <main style={{ padding: "0 clamp(20px, 6vw, 96px) 10vh", maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "4rem", flex: 1 }}>
        <section style={{ textAlign: "center", animation: "rise 1s ease forwards" }}>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontFamily: "var(--f-display)", color: "var(--ruby)", marginBottom: "1rem" }}>
            The Essence of Luxury
          </h1>
          <p style={{ margin: "0 auto", color: "var(--ink)", fontSize: "1.1rem", lineHeight: 1.6, maxWidth: "600px", fontWeight: 500 }}>
            Maison Rouge was born from a singular vision: to create cosmetics that don't just enhance beauty, but command the room.
          </p>
        </section>

        <section style={{ background: "rgba(255, 255, 255, 0.4)", backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.6)", borderRadius: "24px", padding: "clamp(2rem, 5vw, 4rem)", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <h2 style={{ fontSize: "2rem", fontFamily: "var(--f-display)", color: "var(--ruby)" }}>
            A Message from the Founder
          </h2>
          <div style={{ color: "var(--ink)", fontSize: "1.05rem", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "1rem", fontWeight: 500 }}>
            <p style={{ maxWidth: "none", color: "var(--ink)" }}>
              Welcome to Maison Rouge. When I started this journey, I noticed that true luxury in beauty was often compromised by performance. You either had a beautiful object that faded within hours, or a long-wear product that felt dry and uninspired.
            </p>
            <p style={{ maxWidth: "none", color: "var(--ink)" }}>
              I wanted to bridge that gap. Beauty that stays, boldness that slays. That is our promise to you. Every product we design is meticulously crafted to make you feel unstoppable from the moment you apply it, until the end of your night.
            </p>
          </div>
        </section>

        <section style={{ padding: "0 clamp(1rem, 2vw, 2rem)", borderLeft: "2px solid var(--ruby)" }}>
          <h2 style={{ fontSize: "2rem", fontFamily: "var(--f-display)", color: "var(--ruby)", marginBottom: "1rem" }}>
            The Future Collection
          </h2>
          <p style={{ color: "var(--ink)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "none", fontWeight: 500 }}>
            Our signature 3D lipstick is just the beginning. We are currently developing an exclusive line of luxury cosmetics designed to elevate your everyday routine into a ritual. From velvet-finish foundations to illuminating highlighters, our upcoming launches will continue to redefine what it means to rule the room. Stay tuned.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
