import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900/80 backdrop-blur-sm py-12 border-t border-gray-800 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h5 className="font-bold mb-4 text-pink-400">RetroArcade</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-pink-400 transition-colors flex items-center group"
                >
                  <span>About Us</span>
                  <ArrowRight className="ml-1 h-3 w-0 group-hover:w-3 transition-all overflow-hidden" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-400 transition-colors flex items-center group"
                >
                  <span>Careers</span>
                  <ArrowRight className="ml-1 h-3 w-0 group-hover:w-3 transition-all overflow-hidden" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-400 transition-colors flex items-center group"
                >
                  <span>News</span>
                  <ArrowRight className="ml-1 h-3 w-0 group-hover:w-3 transition-all overflow-hidden" />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-cyan-400">Games</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition-colors flex items-center group"
                >
                  <span>New Releases</span>
                  <ArrowRight className="ml-1 h-3 w-0 group-hover:w-3 transition-all overflow-hidden" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition-colors flex items-center group"
                >
                  <span>Top Rated</span>
                  <ArrowRight className="ml-1 h-3 w-0 group-hover:w-3 transition-all overflow-hidden" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition-colors flex items-center group"
                >
                  <span>Classics</span>
                  <ArrowRight className="ml-1 h-3 w-0 group-hover:w-3 transition-all overflow-hidden" />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-pink-400">Support</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-pink-400 transition-colors flex items-center group"
                >
                  <span>Help Center</span>
                  <ArrowRight className="ml-1 h-3 w-0 group-hover:w-3 transition-all overflow-hidden" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-400 transition-colors flex items-center group"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="ml-1 h-3 w-0 group-hover:w-3 transition-all overflow-hidden" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-400 transition-colors flex items-center group"
                >
                  <span>Community</span>
                  <ArrowRight className="ml-1 h-3 w-0 group-hover:w-3 transition-all overflow-hidden" />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-cyan-400">Legal</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition-colors flex items-center group"
                >
                  <span>Terms of Service</span>
                  <ArrowRight className="ml-1 h-3 w-0 group-hover:w-3 transition-all overflow-hidden" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition-colors flex items-center group"
                >
                  <span>Privacy Policy</span>
                  <ArrowRight className="ml-1 h-3 w-0 group-hover:w-3 transition-all overflow-hidden" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition-colors flex items-center group"
                >
                  <span>Cookie Policy</span>
                  <ArrowRight className="ml-1 h-3 w-0 group-hover:w-3 transition-all overflow-hidden" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p className="animate-pulse-glow">
            &copy; {new Date().getFullYear()} RetroArcade. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
