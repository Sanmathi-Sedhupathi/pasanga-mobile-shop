import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import CategorySidebar from "@/components/CategorySidebar";
import SearchBar from "@/components/SearchBar";
import ProductTable from "@/components/ProductTable";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

interface CartItem {
  productId: number;
  quantity: number;
}

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("One Sound CRACKERS");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  const cartTotals = useMemo(() => {
    const netTotal = cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
    
    const savings = cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product ? (product.actualPrice - product.price) * item.quantity : 0);
    }, 0);
    
    return { netTotal, savings, overallTotal: netTotal };
  }, [cart]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <CategorySidebar 
              onCategorySelect={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Search and Cart Summary */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <SearchBar 
                  onCategorySelect={setSelectedCategory}
                  selectedCategory={selectedCategory}
                  onSearch={setSearchTerm}
                />
              </div>
              
              {/* Cart Summary */}
              <div className="bg-white p-4 rounded-lg shadow-sm flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Net Total:</span>
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">₹{cartTotals.netTotal}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">You Save:</span>
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">₹{cartTotals.savings}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Overall Total:</span>
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">₹{cartTotals.overallTotal}</span>
                </div>
                <Button size="sm" className="ml-auto">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart ({totalItems})
                </Button>
              </div>
            </div>
            
            {/* Product Table */}
            <ProductTable 
              selectedCategory={selectedCategory}
              cart={cart}
              setCart={setCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
