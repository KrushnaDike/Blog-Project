import React from "react"

const Lunch = ({ description, image }) => {
    return (
      <div className="bg-white rounded-sm shadow-sm max-w-sm mx-auto flex flex-col">
        <img className="w-[250px] h-[350px] object-cover bg-cover" src={image} alt="trending" />
        <div className="p-4">
          <p className="text-md font-semibold mb-3">{description}</p>
          <p className="text-gray-400">by ABC xyz</p>
        </div>
      </div>
    )
  }
  export default Lunch