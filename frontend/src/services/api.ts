/// <reference types="vite/client" />
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost/pasanga-mobile-shop/backend";

export const getProducts = async (category: string) => {
  const response = await fetch(`${API_BASE}/products/get.php?category=${encodeURIComponent(category)}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};



export async function addProduct(product: { name: string; price: number }) {
  const res = await fetch(`${API_BASE}/products/add.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return await res.json();
}
