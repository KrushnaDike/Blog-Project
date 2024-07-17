import React from 'react'

const TravelData = ({ title, description, image }) => {
  return (
    

    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm mx-auto mb-4">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-4">
        <h5 className="text-md font-bold mb-2">{title}</h5>
        <p className='text-gray-400'>by ABC XYZ</p>
        
      </div>
    </div>
    
  )
}

export default TravelData
