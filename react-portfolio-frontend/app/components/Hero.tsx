import { Link } from 'react-router';

const Hero = ({
  name = 'Philips',



  
  text = " I build fast, responsive, and production-ready web apps with React, TypeScript, Tailwind CSS, and TanStack Query. I recently built and deployed 5+ live products — including SparkBox, an idea-sharing platform, and CoinTrackal, a crypto dashboard with live CoinGecko API data and Chart.js.",




}) => {
  return (
    <header className='text-center py-20 px-4 bg-gray-900 text-white transition-colors duration-300'>
      <h2 className='text-4xl font-bold mb-4'>Hey, I'm {name} 👋</h2>
      <p className='text-lg text-gray-300 max-w-2xl mx-auto mb-6'>{text}</p>
      <div className='flex justify-center gap-4'>
        <Link
          to='/projects'
          className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition'
        >
          View Projects
        </Link>
        <a
          href='/files/PhilipsOlaCV.pdf' target="_blank"
          className='border border-blue-500 text-blue-400 px-6 py-2 rounded hover:bg-blue-600 hover:text-white transition'
        >
          Download My CV
        </a>
      </div>
    </header>
  );
};

export default Hero;
