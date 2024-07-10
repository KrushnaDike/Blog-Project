import React from 'react'
import robot from "../assets/RobotImage.png";
import Navbar from '../Pages/Navbar';

export default function ShowMore() {
  return (
    <div className='container mx-auto'>
      <Navbar/>
    <div className="flex flex-col min-h-screen bg-gray-100">
    <header className="bg-white shadow-md p-4">
      <h1 className="text-3xl font-bold text-center">The Future of AI in Marketing: Revolutionizing Targeted Campaigns with Data-Driven Strategies</h1>
      <div className="divider mt-4"></div>
      <p className="text-gray-600 text-center mt-2"> Explore the transformative role of AI in marketing and how
                      data-driven strategies are reshaping targeted campaigns.
                      Learn how AI technology is revolutionizing the way
                      businesses reach their audience and drive marketing
                      success.</p>
    </header>
    <div className="container mx-auto flex flex-col mt-12 px-4">
      <img src="" alt="The future of AI in Marketing" className="w-full mb-4 rounded-lg shadow-md" />
      <div className="content px-4 object-cover">
        <h2>Content Image</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod odio eu leo pretium tincidunt. Sed euismod risus sit amet magna aliquam tincidunt. Nunc eget orci eu eros volutpat condimentum. Suspendisse potenti. Sed eu libero tincidunt, blandit odio vitae, pulvinar nisl. Nulla facilisi eros in odio tristique bibendum. Nullam justo nunc, tincidunt ac urna vel, vehicula condimentum nisi. Donec eu libero sit amet quam egestas fringilla. Aliquam sed diam in odio vehicula vulputate.</p>
      </div>
      <div className="mt-8">
        <h2>Table of Contents</h2>
        <ol className="list-disc pl-4">
          <li>The Evolution of AI in Marketing</li>
          <li>Leveraging Data for Targeted Campaigns</li>
          <li>Predictive Analytics for Marketing Success</li>
          <li>Embracing AI for Marketing Innovation</li>
          <li>Automation and Efficiency in Marketing</li>
        </ol>
      </div>
      <div className="content mt-8 px-4">
        <h2>Content Description</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod odio eu leo pretium tincidunt. Sed euismod risus sit amet magna aliquam tincidunt. Nunc eget orci eu eros volutpat condimentum. Suspendisse potenti. Sed eu libero tincidunt, blandit odio vitae, pulvinar nisl. Nulla facilisi eros in odio tristique bibendum. Nullam justo nunc, tincidunt ac urna vel, vehicula condimentum nisi. Donec eu libero sit amet quam egestas fringilla. Aliquam sed diam in odio vehicula vulputate.</p>
      </div>
    </div>



    
  </div>                
        </div>       
  )
}
