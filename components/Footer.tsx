"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer" style={{ padding: "1rem 2rem", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
      <div className="footer-legal" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.5)" }}>
        <span>© {new Date().getFullYear()} Maison Rouge</span>
        <div className="legal-links" style={{ display: "flex", gap: "1rem" }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Terms</Link>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
