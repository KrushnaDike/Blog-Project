import React from "react";
import { useParams, useLocation } from "react-router-dom";

const DynamicPage = () => {
  const { title } = useParams();
  const location = useLocation();
  const { state } = location;

  return (
    <div>
      <h1>{state.title}</h1>
      <p>{state.content}</p>
      <meta name="keywords" content={state.metaKeywords} />
      <meta name="description" content={state.metaDescription} />
    </div>
  );
};

export default DynamicPage;
