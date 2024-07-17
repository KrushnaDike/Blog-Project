import React from "react";
import MainLayout from "../Pages/MainLayout";
import Admin from "./Admin/Admin";

function Home({ isAuthenticated = false, user, sliders }) {
  return (
    <div>
      {isAuthenticated && user && user.role === "admin" ? (
        <>
          <Admin />
        </>
      ) : (
        <>
          <MainLayout />
        </>
      )}
    </div>
  );
}

export default Home;
