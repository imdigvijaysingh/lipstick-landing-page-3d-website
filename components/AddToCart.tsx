"use client";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/products";

export default function AddToCart({ id, price }: { id: string, price: number }) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = () => { try { const s = localStorage.getItem("mr-cart"); if (s) setCart(JSON.parse(s)); } catch {} };
    load();
    setReady(true);
    window.addEventListener("storage", load);
    window.addEventListener("cart-update", load);
    return () => { window.removeEventListener("storage", load); window.removeEventListener("cart-update", load); };
  }, []);

  const change = (d: number) => {
    const newCart = { ...cart };
    const n = (newCart[id] || 0) + d;
    if (n > 0) newCart[id] = n;
    else delete newCart[id];
    setCart(newCart);
    try { localStorage.setItem("mr-cart", JSON.stringify(newCart)); } catch {}
    window.dispatchEvent(new Event("cart-update"));
  };

  if (!ready) return <div style={{ height: 42 }}></div>;

  return (
    <div className="buy">
      <span className="price">{formatPrice(price)}</span>
      {cart[id] ? (
        <div className="qty-controls">
          <button onClick={(e) => { e.preventDefault(); change(-1); }} aria-label="Decrease quantity">−</button>
          <span>{cart[id]}</span>
          <button onClick={(e) => { e.preventDefault(); change(1); }} aria-label="Increase quantity">+</button>
        </div>
      ) : (
        <button className="pill dark-pill" onClick={(e) => { e.preventDefault(); change(1); }}>Add to Bag</button>
      )}
    </div>
  );
}
