import { Phone, MapPin, Mail } from "lucide-react";
import fireworksHeader from "@/assets/fireworks-header.jpg";
import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <div className="relative">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-green-400 to-green-500 text-center py-2 text-sm font-medium text-white">
        Diwali sale is start with discount coupon
      </div>

      {/* Main Header */}
      <div 
        className="relative bg-cover bg-center py-8 px-4"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${fireworksHeader})`
        }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Location Info */}
            <div className="text-white">
              <h3 className="text-lg font-bold mb-2">Location</h3>
              <div className="text-sm">
                <p className="font-semibold mb-1">Shop Address</p>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-secondary" />
                  <div>
                    <p>6/743 j, Kamarajapuram Colony,</p>
                    <p>Satchiyapuram, Sivakasi - 626 124</p>
                    <p className="mt-2">Gpay: 9047011448</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo */}
            <div className="text-center">
              <img 
                src={logo} 
                alt="Sivakasi Pasanga" 
                className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-secondary shadow-lg"
              />
              <h1 className="text-2xl font-bold text-white">சிவகாசி பசங்க</h1>
              <p className="text-secondary text-lg font-semibold">SIVAKASI PASANGA</p>
            </div>

            {/* Contact Info */}
            <div className="text-white">
              <h3 className="text-lg font-bold mb-2">FOR QUERIES &</h3>
              <h4 className="text-base font-semibold mb-3">Bulk order</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-secondary" />
                  <span>+91 72000 93808</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-secondary" />
                  <span>+91 72000 93809</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-secondary" />
                  <span>+91 90470 11448</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-secondary" />
                  <span>+91 7200093808</span>
                </div>
                <div className="flex items-start gap-2 mt-3">
                  <Mail className="w-4 h-4 mt-1 text-secondary" />
                  <span className="text-xs">sivakasipasangacrackers@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;