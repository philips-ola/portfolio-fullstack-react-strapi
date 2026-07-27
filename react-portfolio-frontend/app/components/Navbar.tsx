import { NavLink } from "react-router";
import { FaLaptop, FaTimes, FaBars } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
    const [menuOpen, setmenuOpen] =useState(false);
    const base = 'transition hover:text-blue-300';
    const active = 'text-blue-300 font-semibold';

    return (
        <nav className="bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between item-center">
                <NavLink to='/' className='flex items-center gap-2 text-lg font-bold text-blue-300'>
                    <FaLaptop className="text-blue-400 text-xl" />
                    <span>Philips Ola</span>
                </NavLink>
                {/* Desktop Nav */}
               <div className="hidden md:flex items-center gap-6">
                <div className="space-x-4 text-sm text-gray-300">
                    <NavLink className={({isActive}) => isActive? active : base} to='/'>Home</NavLink>
                    <NavLink className={({isActive}) => isActive? active : base} to='projects'>Projects</NavLink>
                    <NavLink className={({isActive}) => isActive? active : base} to='about'>About Me</NavLink>
                    <NavLink className={({isActive}) => isActive? active : base} to='blog'>Blog</NavLink>
                    <NavLink className={({isActive}) => isActive? active : base} to='contact'>Contact Me</NavLink>
                </div>
               </div>

               <div className="md:hidden flex item-center gap-4">
                <button onClick={() => setmenuOpen(!menuOpen)} className="text-blue-400 text-xl cursor-pointer title='Menu'">
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
               </div>
            </div>
            {/* Mobile Nav */}
            {
                menuOpen && (
                    <div className="md:hidden bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-2 space-x-4 text-center">
                    <NavLink onClick={() => setmenuOpen(false)} className={({isActive}) => isActive? active : base} to='/'>Home</NavLink>
                    <NavLink onClick={() => setmenuOpen(false)}  className={({isActive}) => isActive? active : base} to='projects'>Projects</NavLink>
                    <NavLink onClick={() => setmenuOpen(false)}  className={({isActive}) => isActive? active : base} to='about'>About Me</NavLink>
                    <NavLink onClick={() => setmenuOpen(false)}  className={({isActive}) => isActive? active : base} to='blog'>Blog</NavLink>
                    <NavLink className={({isActive}) => isActive? active : base} to='contact'>Contact Me</NavLink>
                    </div>
                )
            }
        </nav>
    )
}
export default Navbar;