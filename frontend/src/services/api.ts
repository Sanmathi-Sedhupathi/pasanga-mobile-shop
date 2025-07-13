/// <reference types="vite/client" />
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost/pasanga-mobile-shop/backend";

export async function getProducts() {
  const res = await fetch(`${API_BASE}/products/get.php`);
  return await res.json();
}

export async function addProduct(product: { name: string; price: number }) {
  const res = await fetch(`${API_BASE}/products/add.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return await res.json();
}
