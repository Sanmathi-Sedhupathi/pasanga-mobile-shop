import cracker1 from "@/assets/cracker-1.jpg";
import cracker2 from "@/assets/cracker-2.jpg";
import cracker3 from "@/assets/cracker-3.jpg";

export interface Product {
  id: number;
  name: string;
  category: string;
  content: string;
  actualPrice: number;
  price: number;
  image: string;
  discount?: number;
}

export const products: Product[] = [
  // One Sound CRACKERS
  {
    id: 1,
    name: "2.75 KURUVI",
    category: "One Sound CRACKERS",
    content: "1Pkt",
    actualPrice: 60,
    price: 12,
    image: cracker1,
    discount: 80
  },
  {
    id: 2,
    name: "3 1/2 LAKSMI",
    category: "One Sound CRACKERS", 
    content: "1Pkt",
    actualPrice: 80,
    price: 16,
    image: cracker1,
    discount: 80
  },
  {
    id: 3,
    name: "4 LAKSMI",
    category: "One Sound CRACKERS",
    content: "1Pkt", 
    actualPrice: 125,
    price: 25,
    image: cracker1,
    discount: 80
  },
  {
    id: 4,
    name: "4 LAKSMI MEGA",
    category: "One Sound CRACKERS",
    content: "1Pkt",
    actualPrice: 225,
    price: 45,
    image: cracker1,
    discount: 80
  },
  {
    id: 5,
    name: "GOLD LAKSMI", 
    category: "One Sound CRACKERS",
    content: "1Pkt",
    actualPrice: 240,
    price: 48,
    image: cracker1,
    discount: 80
  },
  {
    id: 6,
    name: "6 LAXMI",
    category: "One Sound CRACKERS",
    content: "1Pkt",
    actualPrice: 340,
    price: 68,
    image: cracker1,
    discount: 80
  },
  {
    id: 7,
    name: "2 Sound creakers",
    category: "One Sound CRACKERS",
    content: "1Pkt",
    actualPrice: 240,
    price: 48,
    image: cracker1,
    discount: 80
  },

  // GROUND CHAKKAR
  {
    id: 8,
    name: "Ground Chakkar Big (10 pcs)",
    category: "GROUND CHAKKAR",
    content: "10 pcs",
    actualPrice: 50,
    price: 40,
    image: cracker2,
    discount: 20
  },
  {
    id: 9,
    name: "Ground Chakkar Big (25 pcs)",
    category: "GROUND CHAKKAR",
    content: "25 pcs",
    actualPrice: 125,
    price: 100,
    image: cracker2,
    discount: 20
  },
  {
    id: 10,
    name: "Ground Chakkar Special",
    category: "GROUND CHAKKAR",
    content: "1 pcs",
    actualPrice: 15,
    price: 12,
    image: cracker2,
    discount: 20
  },
  {
    id: 11,
    name: "Ground Chakkar Deluxe",
    category: "GROUND CHAKKAR",
    content: "1 pcs",
    actualPrice: 20,
    price: 16,
    image: cracker2,
    discount: 20
  },
  {
    id: 12,
    name: "Krishna Chakkar Special",
    category: "GROUND CHAKKAR", 
    content: "1 pcs",
    actualPrice: 25,
    price: 20,
    image: cracker2,
    discount: 20
  },
  {
    id: 13,
    name: "Maggi Wheel",
    category: "GROUND CHAKKAR",
    content: "1 pcs",
    actualPrice: 35,
    price: 28,
    image: cracker2,
    discount: 20
  },

  // FLOWER POTS
  {
    id: 14,
    name: "FLOWER POTS Big",
    category: "FLOWER POTS",
    content: "1 pcs",
    actualPrice: 25,
    price: 20,
    image: cracker3,
    discount: 20
  },
  {
    id: 15,
    name: "Flower Pots Special",
    category: "FLOWER POTS",
    content: "1 pcs",
    actualPrice: 30,
    price: 24,
    image: cracker3,
    discount: 20
  },
  {
    id: 16,
    name: "Flower Pots Asoka",
    category: "FLOWER POTS",
    content: "1 pcs",
    actualPrice: 35,
    price: 28,
    image: cracker3,
    discount: 20
  },
  {
    id: 17,
    name: "Flower Pots Dlx (5pcs)",
    category: "FLOWER POTS",
    content: "5 pcs",
    actualPrice: 150,
    price: 120,
    image: cracker3,
    discount: 20
  },
  {
    id: 18,
    name: "Flower Pots Super Dlx (2pcs)",
    category: "FLOWER POTS",
    content: "2 pcs",
    actualPrice: 100,
    price: 80,
    image: cracker3,
    discount: 20
  },

  // ELITE FLOWER POTS
  {
    id: 19,
    name: "Colour Koti",
    category: "ELITE FLOWER POTS",
    content: "1 pcs",
    actualPrice: 45,
    price: 36,
    image: cracker3,
    discount: 20
  },
  {
    id: 20,
    name: "Tri Colour",
    category: "ELITE FLOWER POTS",
    content: "1 pcs",
    actualPrice: 50,
    price: 40,
    image: cracker3,
    discount: 20
  },
  {
    id: 21,
    name: "Colour Green Berry Koti / Jelly Bean",
    category: "ELITE FLOWER POTS",
    content: "1 pcs",
    actualPrice: 55,
    price: 44,
    image: cracker3,
    discount: 20
  }
];

export const getCategorizedProducts = () => {
  const categorized: { [key: string]: Product[] } = {};
  
  products.forEach(product => {
    if (!categorized[product.category]) {
      categorized[product.category] = [];
    }
    categorized[product.category].push(product);
  });
  
  return categorized;
};

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};