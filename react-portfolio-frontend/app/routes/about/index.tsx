import { FaLinkedin, FaYoutube, FaExternalLinkAlt } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const AboutPage = () => {
  const techStack = [
    'React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Git', 'GitHub'
  ];

  return (
    <div className='min-h-screen bg-gray-950 text-gray-200 py-10'>
      <div className='max-w-6xl mx-auto'>
        
        {/* Hero Section - Glass Card */}
        <div className='relative mb-16 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-xl border border-gray-700/50 shadow-2xl overflow-hidden'>
          {/* Gradient accent blob */}
          <div className='absolute -top-20 -right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl'></div>
          <div className='absolute -bottom-20 -left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl'></div>
          
          <div className='relative grid md:grid-cols-[auto_1fr] gap-10 items-center'>
            {/* Avatar with glow */}
            <div className='relative mx-auto md:mx-0'>
              <div className='absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full blur-md opacity-75'></div>
              <img
                src='/images/profile.jpg'
                alt='profile'
                className='relative w-44 h-44 rounded-full object-cover border-4 border-gray-900 shadow-xl'
              />
            </div>
            
            <div>
              <div className='flex items-center gap-3 mb-3'>
                <h1 className='text-4xl md:text-5xl font-bold text-white'>
                 I'm Philips
                </h1>
                <span className='text-4xl animate-wave'>👋</span>
              </div>
              <p className='text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl'>
               I build fast, responsive, and production-ready web apps with React, TypeScript, Tailwind CSS, and TanStack Query. I recently built and deployed 5+ live products — including SparkBox, an idea-sharing platform, and CoinTrackal, a crypto dashboard with live CoinGecko API data and Chart.js.
              </p>
              <p className='text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl'>
             Former educator at Edo State Polytechnic where I mentored 50+ developers. Now focused on frontend roles where I can build clean, reusable UIs that users love.
              </p>
              
              {/* CTAs */}
              <div className='flex flex-wrap gap-4'>
                <a 
                  href='https://linkedin.com/in/olaphilips' 
                  target='_blank'
                  className='flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5'
                >
                  <FaLinkedin className='text-lg' />
                  LinkedIn
                </a>
                <a 
                  href='https://youtube.com/@idtechnol' 
                  target='_blank'
                  className='flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 hover:-translate-y-0.5'
                >
                  <FaYoutube className='text-lg' />
                  YouTube
                </a>
                <a 
                  href='https://olaphilips.com.ng' 
                  target='_blank'
                  className='flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-5 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5'
                >
                  <FaExternalLinkAlt />
                  Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className='mb-16 p-8 md:p-10 rounded-2xl bg-gray-900/50 border border-gray-800'>
          <div className='flex items-center gap-3 mb-5'>
            <HiSparkles className='text-2xl text-blue-400' />
            <h2 className='text-2xl font-bold text-white'>My Mission</h2>
          </div>
          <p className='text-gray-300 text-lg leading-relaxed'>
           My mission is to build myself in public through frontend development, and build others through mentorship.

        I learn by shipping real React products, I grow by sharing what I learn on YouTube, and I lift others by teaching what I know — just like I did for 50+ developers at Edo State Polytechnic. Code is better when we build it together.
                  </p>
        </div>

        {/* Tech Stack */}

       <div className='mb-16 p-8 md:p-10 rounded-2xl bg-gray-900/50 border border-gray-800'>
          <h2 className='text-2xl font-bold text-white mb-6 flex items-center gap-3'>
            <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>🚀 Tech I Use</span>
          </h2>
          <div className='flex flex-wrap gap-3'>
            {techStack.map((tech) => (
              <span 
                key={tech} 
                className='px-4 py-2 rounded-lg bg-gray-800/80 border border-gray-700/50 text-gray-300 text-sm font-medium 
                           hover:border-blue-500/50 hover:bg-gray-800 hover:text-white hover:shadow-md hover:shadow-blue-500/10 
                           transition-all duration-300 cursor-default'
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
      </div>
      
      
    </div>
  );
};

export default AboutPage;