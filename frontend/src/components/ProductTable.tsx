import { useState, useEffect } from "react";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
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
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProducts(selectedCategory)
      .then(data => {
        console.log("Fetched products:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [selectedCategory]);

  useEffect(() => {
    document.body.style.overflow = showCart ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showCart]);

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

  const getProduct = (productId: number) => products.find(p => p.id === productId);

  const getTotal = () => {
    return cart.reduce((total, item) => {
      const product = getProduct(item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const getSavings = () => {
    return cart.reduce((total, item) => {
      const product = getProduct(item.productId);
      return total + (product ? (product.actualPrice - product.price) * item.quantity : 0);
    }, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const product = getProduct(item.productId);
      return total + (product ? product.actualPrice * item.quantity : 0);
    }, 0);
  };

  const confirmEstimate = () => {
    if (cart.length === 0) {
      alert("Please add items to cart");
      return;
    }
    const subtotal = getTotal();
    if (subtotal < 3000) {
      alert("Minimum order amount is ₹3000");
      return;
    }
    alert("Order confirmed! Submit logic not added yet.");
  };

  const discountPercentage = products[0]?.discount || 80;

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No products found in this category.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="bg-primary text-white p-3 rounded-lg text-center font-bold uppercase">
        {selectedCategory} ({discountPercentage}% DISCOUNT)
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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

        <div className="divide-y">
          {products.map((product, index) => {
            const quantity = getQuantity(product.id);
            const isEven = index % 2 === 0;
            return (
              <div
                key={product.id}
                className={`grid grid-cols-8 gap-4 p-3 items-center ${isEven ? 'bg-table-even' : 'bg-table-odd'}`}
              >
                <div>
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded border" />
                </div>
                <div className="text-sm font-medium">{product.id}</div>
                <div className="col-span-2 text-sm font-medium">{product.name}</div>
                <div className="text-sm">{product.content}</div>
                <div className="text-sm line-through text-muted-foreground">₹{product.actualPrice}</div>
                <div className="text-sm font-bold text-price-highlight">₹{product.price}</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity - 1)}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 0)}
                    className="w-16 h-8 text-center"
                    min="0"
                  />
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* View Cart Button (always visible below table) */}
      <div className="flex justify-end mt-4">
        <Button
          onClick={() => setShowCart(true)}
          className="bg-red-600 text-white rounded-full px-5 py-2 shadow-lg flex items-center gap-2 text-sm sm:text-base"
        >
          <ShoppingCart className="h-5 w-5" />
          View Cart ({cart.length})
        </Button>
      </div>

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 sm:inset-auto sm:top-0 sm:right-0 sm:w-[360px] w-full h-full bg-white shadow-xl z-50 flex flex-col">
          <div className="bg-red-700 text-white px-4 py-3 flex justify-between items-center">
            <h2 className="font-bold text-lg">Cart</h2>
            <X onClick={() => setShowCart(false)} className="cursor-pointer" />
          </div>

          <div className="p-4 flex-1 overflow-y-auto space-y-4 text-sm">
            {cart.map(item => {
              const product = getProduct(item.productId);
              if (!product) return null;
              return (
                <div key={item.productId} className="flex justify-between">
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-gray-500">
                      {item.quantity} × ₹{product.price}
                    </div>
                  </div>
                  <div>₹{(product.price * item.quantity).toFixed(2)}</div>
                </div>
              );
            })}
          </div>

          <div className="p-4 border-t text-sm space-y-2">
            <div className="flex justify-between">
              <span>Net Total</span>
              <span>₹{getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>You Save</span>
              <span>₹{getSavings().toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Sub Total</span>
              <span>₹{getTotal().toFixed(2)}</span>
            </div>

            <Button
              onClick={confirmEstimate}
              className="w-full bg-red-600 text-white font-bold mt-2 hover:bg-red-700"
            >
              CONFIRM ESTIMATE
            </Button>

            <p className="text-xs text-center text-red-500 mt-2">
              Min. Order ₹3000 – Tamil Nadu
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;