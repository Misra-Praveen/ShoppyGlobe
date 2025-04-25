import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCart, Home } from "lucide-react";

function Header() {
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className="flex justify-around items-center p-4 bg-blue-600 text-white shadow-md fixed w-full top-0 z-50">
      <Link to="/" className="text-2xl font-bold">
        ShoppyGlobe
      </Link>
      <nav className=" flex items-center gap-6">
        <Link to="/" className="flex items-center gap-1 hover:underline">
          <Home className="w-5 h-5" />
          <span className="hidden sm:inline">Home</span>
        </Link>
        <Link to="/cart" className="relative flex items-center gap-1 hover:underline">
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 md:right-7 text-sm bg-red-500 w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
          <span className="hidden sm:inline">Cart</span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
