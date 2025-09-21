import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { WalletConnectButton } from "@/components/wallet/wallet-connect-button";
import { ChainSelector } from "@/components/wallet/chain-selector";

const Header = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Index", href: "/avgx-index" },
    { name: "Prices", href: "/prices" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-avgx-primary/80 dark:bg-avgx-primary/80 light:bg-white/80 backdrop-blur-md border-b border-white/10 dark:border-white/10 light:border-gray-200">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-teal to-accent-purple rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-white">AX</span>
            </div>
            <span className="text-xl font-bold text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
              AVGX
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors ${
                  isActive(item.href)
                    ? "text-accent-teal"
                    : "text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 hover:text-accent-teal"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="hidden md:block">
              <ChainSelector />
            </div>
            <WalletConnectButton />
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden bg-secondary/50 hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-accent-teal" />
              ) : (
                <Menu className="h-5 w-5 text-accent-teal" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 dark:border-white/10 light:border-gray-200">
            <div className="flex flex-col space-y-4 mt-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-colors ${
                    isActive(item.href)
                      ? "text-accent-teal"
                      : "text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <ChainSelector />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
