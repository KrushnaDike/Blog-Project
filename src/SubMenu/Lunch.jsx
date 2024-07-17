import React from "react"

const Lunch = ({ description, image }) => {
    return (
      <div className="border border-gray-800 h-[90%]  w-[90%]">
        <img className="h-[65%] w-[100%]" src={image} alt="trending" />
        <div className="p-2">
          <p className="text-md font-semibold mb-3">{description}</p>
          <p className="text-gray-400">by ABC xyz</p>
        </div>
      </div>
    )
  }
  export default Lunch