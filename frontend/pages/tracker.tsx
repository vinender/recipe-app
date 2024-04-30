import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/navbar/navbar';
import ProtectedRoute from '../utils/protectedRoutes';

const ScrollTracker = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const rightSectionRef = useRef(null);
  const [backgroundColor, setBackgroundColor] = useState('bg-[#0A183D]');
  const [imageTransition, setImageTransition] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = rightSectionRef.current?.children || [];
      console.log(sections)
      const scrollPosition = rightSectionRef.current?.scrollTop + window.innerHeight / 2 || 0;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setCurrentSection(i);
          setBackgroundColor(getBackgroundColor(i));
          setImageTransition('opacity-60');
          setTimeout(() => setImageTransition('opacity-100'), 100);
          break;
        }
      }
    };

    const scrollRef = rightSectionRef.current;
    if (scrollRef) {
      scrollRef.addEventListener('scroll', handleScroll);
      return () => scrollRef.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const getBackgroundColor = (sectionIndex) => {
    switch (sectionIndex) {
      case 0:
        return 'bg-gradient-to-r from-[#0A183D] to-[#4b1e13cc]';
      case 1:
        return 'bg-gradient-to-r from-[#7626ac] to-[#9ea727]';
      case 2:
        return 'bg-gradient-to-r from-[#189AB4] to-[#09797B]';
      case 3:
        return 'bg-gradient-to-r from-[#05668D] to-[#024959]';
      default:
        return 'bg-gradient-to-r from-[#0a4466] to-[#107e35]';
    }
  };

  const getMobileScreenContent = () => {
    switch (currentSection) {
      case 0:
        return (
          <img
            className={`object-contain w-[70%] mx-auto h-full transition-opacity duration-500 ${imageTransition}`}
            src="https://niyyah.app/wp-content/themes/vl-theme-niyyah/assets/images/niyyah-mockup-2.webp"
            alt="Mobile screen content 1"
          />
        );
      case 1:
        return (
          <div className="w-full h-full relative">
            <img
              className={`object-contain w-[70%] mx-auto h-full transition-opacity duration-500 ${imageTransition}`}
              src="https://niyyah.app/wp-content/themes/vl-theme-niyyah/assets/images/niyyah-mockup-3.png"
              alt="Mobile screen content 2"
            />
          </div>
        );
      case 2:
        return (
          <div className="w-full h-full relative">
            <img
              className={`object-contain w-[70%] mx-auto h-full transition-opacity duration-500 ${imageTransition}`}
              src="https://niyyah.app/wp-content/themes/vl-theme-niyyah/assets/images/niyyah-mockup-4.png"
              alt="Mobile screen content 2"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
     <ProtectedRoute> 
    <Navbar/> 
    <div className={`flex h-screen transition-colors duration-500 ${backgroundColor}`}>
      <div className="transition-all duration-500 w-[35%] h-full p-4 px-20 mx-20">
        {getMobileScreenContent()}
      </div>
      <div className="flex-1 p-4 overflow-y-scroll" ref={rightSectionRef}>
        <div className="flex flex-col space-y-4 items-start justify-center h-screen" id="section1">
          <h1 className="max-w-3xl leading-[3.5rem] text-5xl font-bold text-white">
            Complete authentic, bite-sized quizzes
          </h1>
          <p className="text-xl w-[60%] leading-9 text-white font-light">
            Gain practical lessons from the Quran through interactive and engaging quizzes in 5 mins a day. Access verified
            content from vetted sources reviewed by people of knowledge.
          </p>
        </div>
        <div className="flex flex-col space-y-4 items-start justify-center h-screen" id="section2">
          <h1 className="max-w-3xl leading-[3.5rem] text-5xl font-bold text-white">
            Complete authentic, bite-sized quizzes
          </h1>
          <p className="text-xl w-[60%] leading-9 text-white font-light">
            Gain practical lessons from the Quran through interactive and engaging quizzes in 5 mins a day. Access verified
            content from vetted sources reviewed by people of knowledge.
          </p>
        </div>
        <div className="flex flex-col space-y-4 items-start justify-center h-screen" id="section3">
          <h1 className="max-w-3xl leading-[3.5rem] text-5xl font-bold text-white">
            Complete authentic, bite-sized quizzes
          </h1>
          <p className="text-xl w-[60%] leading-9 text-white font-light">
            Gain practical lessons from the Quran through interactive and engaging quizzes in 5 mins a day. Access verified
            content from vetted sources reviewed by people of knowledge.
          </p>
        </div>
      </div>
    </div>
    </ProtectedRoute>
    </>
  );
};

export default ScrollTracker;