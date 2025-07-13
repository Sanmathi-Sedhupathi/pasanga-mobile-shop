import { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getProducts } from "@/services/api";

interface CartItem {
  productId: number;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  content: string;
  image: string;
  actualPrice: number;
  price: number;
  discount: number;
}

interface ProductTableProps {
  selectedCategory: string;
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
}

const ProductTable = ({ selectedCategory, cart, setCart }: ProductTableProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedCategory]);

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 0) return;
    
    const existingItem = cart.find(item => item.productId === productId);
    
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.productId !== productId));
    } else if (existingItem) {
      setCart(cart.map(item => 
        item.productId === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    } else {
      setCart([...cart, { productId, quantity: newQuantity }]);
    }
  };

  const getQuantity = (productId: number) => {
    const item = cart.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  };

  const getTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const getSavings = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product ? (product.actualPrice - product.price) * item.quantity : 0);
    }, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product ? product.actualPrice * item.quantity : 0);
    }, 0);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No products found in this category.</p>
      </div>
    );
  }

  const discountPercentage = products[0]?.discount || 80;

  return (
    <div className="space-y-4">
      {/* Category Header */}
      <div className="bg-primary text-white p-3 rounded-lg text-center font-bold uppercase">
        {selectedCategory} ({discountPercentage}% DISCOUNT)
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="bg-table-header text-white">
          <div className="grid grid-cols-8 gap-4 p-3 text-sm font-semibold">
            <div>Image</div>
            <div>Code</div>
            <div className="col-span-2">Product Name</div>
            <div>Content</div>
            <div>Actual Price</div>
            <div>Price</div>
            <div>Quantity</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y">
          {products.map((product, index) => {
            const quantity = getQuantity(product.id);
            const isEven = index % 2 === 0;
            
            return (
              <div 
                key={product.id}
                className={`grid grid-cols-8 gap-4 p-3 items-center ${
                  isEven ? 'bg-table-even' : 'bg-table-odd'
                }`}
              >
                {/* Image */}
                <div>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded border"
                  />
                </div>
                
                {/* Code */}
                <div className="text-sm font-medium">{product.id}</div>
                
                {/* Product Name */}
                <div className="col-span-2 text-sm font-medium">{product.name}</div>
                
                {/* Content */}
                <div className="text-sm">{product.content}</div>
                
                {/* Actual Price */}
                <div className="text-sm">
                  <span className="line-through text-muted-foreground">₹{product.actualPrice}</span>
                </div>
                
                {/* Price */}
                <div className="text-sm font-bold text-price-highlight">₹{product.price}</div>
                
                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 0)}
                    className="w-16 h-8 text-center"
                    min="0"
                  />
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Net Total: ₹{getTotal()}</span>
            <span className="text-green-600">You Save: ₹{getSavings()}</span>
            <span>Overall Total: ₹{getTotal()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;