import { X } from "lucide-react";

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

interface CartSidebarProps {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  products: Product[];
  onClose: () => void;
}

const CartSidebar = ({ cart, setCart, products, onClose }: CartSidebarProps) => {
  const getProduct = (id: number) => products.find(p => p.id === id);

  const getNetTotal = () =>
    cart.reduce((sum, item) => {
      const p = getProduct(item.productId);
      return sum + (p ? p.actualPrice * item.quantity : 0);
    }, 0);

  const getDiscount = () =>
    cart.reduce((sum, item) => {
      const p = getProduct(item.productId);
      return sum + (p ? (p.actualPrice - p.price) * item.quantity : 0);
    }, 0);

  const getSubTotal = () =>
    cart.reduce((sum, item) => {
      const p = getProduct(item.productId);
      return sum + (p ? p.price * item.quantity : 0);
    }, 0);

  const handleRemove = (id: number) => {
    setCart(cart.filter(item => item.productId !== id));
  };

  const confirmEstimate = () => {
    if (cart.length === 0) {
      alert("Please add items to cart");
      return;
    }
    if (getSubTotal() < 3000) {
      alert("Minimum order amount is ₹3000");
      return;
    }
    alert("Order confirmed!");
  };

  return (
    <div className="fixed right-0 top-0 h-full w-[360px] bg-white shadow-lg z-50 flex flex-col border-l border-gray-300">
      {/* Header */}
      <div className="bg-red-700 text-white p-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">Sivakasi Pasanga</h2>
        <button onClick={onClose}><X /></button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {cart.map(item => {
          const product = getProduct(item.productId);
          if (!product) return null;
          return (
            <div key={item.productId} className="flex gap-3 items-center">
              <img src={product.image} className="w-12 h-12 object-cover border rounded" />
              <div className="flex-1">
                <div className="font-semibold">{product.name}</div>
                <div className="text-sm text-gray-500">
                  {item.quantity} × ₹{product.price} = ₹{product.price * item.quantity}
                </div>
              </div>
              <button onClick={() => handleRemove(item.productId)}><X size={18} /></button>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="border-t p-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Net Total</span>
          <span>₹{getNetTotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>₹{getDiscount().toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Sub Total</span>
          <span>₹{getSubTotal().toFixed(2)}</span>
        </div>

        <button
          className="w-full bg-red-600 text-white font-semibold py-2 rounded mt-2 hover:bg-red-700"
          onClick={confirmEstimate}
        >
          CONFIRM ESTIMATE
        </button>

        <div className="text-red-600 text-xs text-center mt-2">
          Min. Order Amount <br />
          Tamil Nadu – ₹3000
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
