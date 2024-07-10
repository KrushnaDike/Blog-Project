import React from 'react'
import foodhero from '../assets/foodhero.png'
import Restaurant from '../SubMenu/Restaurant'
import LunchwithStar from '../SubMenu/LunchwithStar'
import StreetFood from '../SubMenu/StreetFood';
import Navbar from '../Pages/Navbar';
import Footer from '../Pages/Footer';
function Food() {
  return (
    <div className='container mx-auto'>
      <Navbar/>
       <div className="hero min-h mt-2 bg-cover bg-center">
      <img
        src={foodhero}
        alt=""
        className="w-full h-300 object-cover bg-cover"
      />
    </div>
<Restaurant/>
<StreetFood/>
<LunchwithStar/>
<LunchwithStar/>
<LunchwithStar/>
<Footer/>
    </div>
  )
}

export default Food
