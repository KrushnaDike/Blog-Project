import React from 'react'
import HeroPage from './HeroPage'
import Navbar from './Navbar';
import Travel from '../Components/Travel';
import Ads from '../Components/Ads';
import Recipe from '../Components/Recipe';
import LunchwithStar from '../SubMenu/LunchwithStar';
import Food from '../Components/Food';
import Footer from './Footer';
import Foundation from '../Components/Foundation';
import Trending from '../SubMenu/Trending';
import Restaurant from '../SubMenu/Restaurant';
import QuickLinks from './QuickLinks';
import Awards from '../SubMenu/Awards'
function MainLayout() {
  return (
    <div className='container mx-auto'>
        <HeroPage/>
        <Navbar/>
        <Foundation/>
        <Ads/>
        <Restaurant/>
        <Trending/>
        <Recipe/>
        <LunchwithStar/>
        <LunchwithStar/>
        <LunchwithStar/>
        <Footer/>       
    </div>
  )
}                                   

export default MainLayout