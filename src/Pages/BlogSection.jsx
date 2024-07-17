// BlogSection.jsx
import React from 'react';

const BlogSection = ({ blogData }) => {
  return (
    <div className=" p-4 shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">{blogData.title}</h2>
      <img src={blogData.image} alt={blogData.title} className="mb-4 rounded-lg" />
      <p className="text-gray-700 mb-4">{blogData.excerpt}</p>
      <a href={blogData.link} className="text-blue-500 hover:underline">Read More</a>
    </div>
  );
}

export default BlogSection;
