import React from 'react'
import Navbar from '../Pages/Navbar';
import Challenge from '../SubMenu/Challenge';
import RahanVeg from '../SubMenu/RahanVeg';
import OreeMummy from '../SubMenu/OreeMummy';
import Footer from '../Pages/Footer';
import Domestic from '../Pages/Domestic';
function FamilyFun() {
  return (
    
    <> 
    <div className='mx-auto'>
    <Navbar/>
    <Domestic />
    <Challenge/>
    <RahanVeg/>
    <OreeMummy/>
    <Footer/>
    </div>
    </>
  )
}

export default FamilyFun