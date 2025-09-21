import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-white/10 dark:border-white/10 light:border-gray-200 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-teal to-accent-purple rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-white">AX</span>
              </div>
              <span className="text-lg font-bold text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
                AVGX
              </span>
            </div>
            <p className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 text-sm">
              The neutral global currency combining fiat stability with crypto innovation.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900 mb-4">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">
              <li>
                <Link href="/index" className="hover:text-accent-teal transition-colors">
                  AVGX Index
                </Link>
              </li>
              <li>
                <Link href="/coin" className="hover:text-accent-teal transition-colors">
                  AVGX Coin
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent-teal transition-colors">
                  Whitepaper
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-accent-teal transition-colors">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900 mb-4">
              Community
            </h4>
            <ul className="space-y-2 text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">
              <li>
                <a href="#" className="hover:text-accent-teal transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-teal transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-teal transition-colors">
                  Telegram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-teal transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900 mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">
              <li>
                <a href="#" className="hover:text-accent-teal transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-teal transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-teal transition-colors">
                  Disclaimer
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent-teal transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 dark:border-white/10 light:border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 text-sm">
            © 2024 AVGX Finance. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 text-sm">
              Testnet Version
            </span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
