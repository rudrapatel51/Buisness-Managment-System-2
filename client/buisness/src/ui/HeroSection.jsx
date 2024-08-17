import React from 'react'

const HeroSection = () => {
  return (
    <div>    <div className="bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
      <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        <span className="block">Robust SaaS Boilerplate</span>
        <span className="block text-blue-600">and Starter for Next.js</span>
      </h1>
      <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Packed with all the key integrations you need for swift SaaS startup launch, including - Authentication, Database, Sanity Blog, Essential UI Components, Business Pages and More. Built-with - Next.js, React 18 and TypeScript.
      </p>
      <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
        <div className="rounded-md shadow">
          <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
            Get Started
          </a>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
  }

export default HeroSection;