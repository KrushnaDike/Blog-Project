import React from 'react';
import blogtravel from '../assets/blogtravel.png';
import facebook from '../assets/Facebook.png';
import Instgram from '../assets/Instagram.png';
import Twitter from '../assets/Twitter.png';
import Youtube1 from '../assets/Youtube1.png';
import showMore from '../SubMenu/ShowMore';
import {Link} from 'react-router-dom';
function QuickLinks() {

        return (
          <div className='flex flex-row'>
          <div className="flex flex-row pt-2 mb-2">
            <div className="w-1/2 flex items-center justify-center">
              <img
                src={blogtravel}
                alt="Image description"
                className="w-50 h-55 object-cover rounded-xl md:h-60 shadow-md"
              />
            </div>
            <div className="w-2/2 p-2">
              <p className="text-gray-600 font-bold">
              I went to Malaysia for the family trip and.......
              </p>
              <p className='text-gray-400'>by ABC xyz</p>
              
              <div className="flex flex-col justify-between mt-3">
                <Link to='/showMore'>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow-md">
                Show More
              </button>
              </Link>
              </div>
              <div className="flex flex-row justify-start mt-4">

              <a href="#">
                  <img src={facebook} alt="facebook" className='mx-2' />
                </a>
                <a href="#">
                  <img src={Youtube1} alt="you tube" className="w-8 h-8 mx-2" />
                </a>
                <a href="#">
                  <img src={Instgram} alt="instgram" className='mx-2' />
                </a>
                <a href="#">
                  <img src={Twitter} alt="Twitter" className='mx-2' />
                </a>
              </div>
            </div>
          </div>







          
        </div>
        )
      }

          {/* <div className="w-1/2 p-4 flex flex-col justify-center pt-2">
            <p className="text-gray-700 font-bold">
            I went to Malaysia for the family trip and.......
            </p>
            <p className='text-gray-400'>by ABC xyz</p>
            
            <div className="flex justify-between mt-4">
              <Link to='/showMore'>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow-md">
              Show More
            </button>
            </Link>
            <a href="#">
                <img src={facebook} alt="facebook" />
              </a>
              <a href="#">
                <img src={Youtube1} alt="you tube" className="w-8 h-8" />
              </a>
              <a href="#">
                <img src={Instgram} alt="instgram" />
              </a>
              <a href="#">
                <img src={Twitter} alt="Twitter" />
              </a>
            </div>
          </div>
       */}
    
  

export default QuickLinks