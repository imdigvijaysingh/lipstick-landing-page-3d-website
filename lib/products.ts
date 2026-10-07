export type Product = {
  id: string; name: string; hex: string; finish: "Matte" | "Satin" | "Gloss"; price: number; blurb: string;
};

export const CURRENCY = "INR"; // change to "USD" etc.
export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: CURRENCY, maximumFractionDigits: 0 }).format(n);

export const products: Product[] = [
  { id: "rouge-royale", name: "Rouge Royale", hex: "#9b111e", finish: "Matte", price: 1499, blurb: "The signature true red." },
  { id: "berry-crown", name: "Berry Crown", hex: "#c2185b", finish: "Satin", price: 1499, blurb: "Cool, juicy berry." },
  { id: "velvet-wine", name: "Velvet Wine", hex: "#6d0f1a", finish: "Matte", price: 1599, blurb: "Deep, dark and dramatic." },
  { id: "coral-kiss", name: "Coral Kiss", hex: "#d9534f", finish: "Satin", price: 1399, blurb: "Warm daytime glow." },
  { id: "nude-noble", name: "Nude Noble", hex: "#b5755f", finish: "Matte", price: 1399, blurb: "Soft, everyday elegance." },
  { id: "ruby-gloss", name: "Ruby Gloss", hex: "#c8102e", finish: "Gloss", price: 1299, blurb: "Bright red, mirror shine." },
  { id: "plum-regal", name: "Plum Regal", hex: "#5e1a3a", finish: "Matte", price: 1599, blurb: "Rich evening plum." },
  { id: "rose-empress", name: "Rose Empress", hex: "#d86b84", finish: "Satin", price: 1499, blurb: "Romantic rose pink." },
];
