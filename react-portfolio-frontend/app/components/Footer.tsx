import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Left - Brand */}
          <div>
            <h2 className="text-xl font-bold mb-4">Philips Ola</h2>
            <p className="text-sm text-gray-400 leading-6 max-w-xs mb-6">
              Full-Stack Developer building modern web experiences with React, Node.js & TypeScript.
            </p>
            <a
              href="https://olaphilips.com.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              Check Me Here
            </a>
          </div>

          {/* Middle - Navigation */}
          <div>
            <h3 className="text-base font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li><Link to="/projects" className="text-sm text-gray-400 hover:text-white transition-colors">Projects</Link></li>
              <li><Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact me</Link></li>
            </ul>
          </div>

          {/* Right - Developer */}
          <div>
            <h3 className="text-base font-semibold mb-4">Developer</h3>
            <div className="space-y-1 text-sm text-gray-400">
              <p className="text-gray-300">Philips Ola</p>
              <p>Full-Stack Developer • React • Node.js</p>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-gray-800">
          <p className="text-center text-xs text-gray-400">
            © 2026 Philips Ola. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}