"use client";
import { useState } from "react";

export default function Footer() {
  const [modalContent, setModalContent] = useState<"terms" | "privacy" | null>(null);

  return (
    <>
      <footer className="footer" style={{ padding: "1rem 2rem", borderTop: "1px solid rgba(255, 255, 255, 0.1)", position: "relative", zIndex: 10 }}>
        <div className="footer-legal" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.5)", gap: "1rem" }}>
          <span>© {new Date().getFullYear()} Maison Rouge</span>
          
          <span style={{ textAlign: "center", flex: "1 1 auto" }}>
            Made by <a href="https://shyvoratechnologies.netlify.app" target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "none", fontWeight: "bold", transition: "opacity 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"} onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>Shyvora Technologies</a>
          </span>

          <div className="legal-links" style={{ display: "flex", gap: "1rem" }}>
            <button onClick={() => setModalContent("terms")} style={{ color: "inherit", textDecoration: "none", background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "inherit", fontFamily: "inherit" }}>Terms</button>
            <button onClick={() => setModalContent("privacy")} style={{ color: "inherit", textDecoration: "none", background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "inherit", fontFamily: "inherit" }}>Privacy Policy</button>
          </div>
        </div>
      </footer>

      {modalContent && (
        <div 
          onClick={() => setModalContent(null)}
          style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.8)", backdropFilter: "blur(5px)",
          display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999,
          padding: "2rem"
        }}>
          <style>{`
            .hide-scroll::-webkit-scrollbar { display: none; }
            .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
          <div 
            className="hide-scroll"
            onClick={(e) => e.stopPropagation()}
            style={{
            background: "#2B1B1B", color: "#FAF6F0", padding: "2.5rem 2rem 2rem", borderRadius: "12px",
            maxWidth: "600px", width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          }}>
            <button onClick={() => setModalContent(null)} style={{
              position: "absolute", top: "1rem", right: "1.5rem", background: "none", border: "none",
              color: "rgba(250, 246, 240, 0.5)", fontSize: "2rem", cursor: "pointer", lineHeight: 1
            }} onMouseEnter={(e) => e.currentTarget.style.color = "#FAF6F0"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(250, 246, 240, 0.5)"}>×</button>
            
            {modalContent === "terms" && (
              <>
                <h2 style={{ marginBottom: "1.2rem", fontFamily: "var(--f-display)", fontSize: "1.3rem" }}>Terms of Service</h2>
                <p style={{ marginBottom: "1rem", lineHeight: 1.5, fontSize: "0.8rem", maxWidth: "none", color: "rgba(250, 246, 240, 0.8)" }}>Welcome to Maison Rouge. By accessing our website, you agree to these Terms of Service. These terms govern your use of our platform, our products, and any services we provide.</p>
                <p style={{ marginBottom: "1rem", lineHeight: 1.5, fontSize: "0.8rem", maxWidth: "none", color: "rgba(250, 246, 240, 0.8)" }}>All content on this site, including images, text, and 3D models, is the property of Maison Rouge. You may not reproduce, distribute, or use this content without explicit permission.</p>
                <p style={{ lineHeight: 1.5, fontSize: "0.8rem", maxWidth: "none", color: "rgba(250, 246, 240, 0.8)" }}>We reserve the right to modify these terms at any time. Continued use of the site constitutes your acceptance of the revised terms.</p>
              </>
            )}

            {modalContent === "privacy" && (
              <>
                <h2 style={{ marginBottom: "1.2rem", fontFamily: "var(--f-display)", fontSize: "1.3rem" }}>Privacy Policy</h2>
                <p style={{ marginBottom: "1rem", lineHeight: 1.5, fontSize: "0.8rem", maxWidth: "none", color: "rgba(250, 246, 240, 0.8)" }}>At Maison Rouge, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
                <p style={{ marginBottom: "1rem", lineHeight: 1.5, fontSize: "0.8rem", maxWidth: "none", color: "rgba(250, 246, 240, 0.8)" }}>We may collect basic analytics data (such as browser type and interaction with our 3D experiences) to improve our website performance and user experience.</p>
                <p style={{ lineHeight: 1.5, fontSize: "0.8rem", maxWidth: "none", color: "rgba(250, 246, 240, 0.8)" }}>We will never sell your personal data to third parties. If you have any questions about how we handle your data, please contact us.</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
