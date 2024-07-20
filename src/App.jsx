import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./Pages/Footer";
import Home from "./Components/Home";
import Travel from "./Components/Travel";
import Food from "./Components/Food";
import FamilyFun from "./Components/FamilyFun";
import Recipe from "./Components/Recipe";
import Events from "./Components/Events";
import Foundation from "./Components/Foundation";
import MainLayout from "./Pages/MainLayout";
import LunchwithStar from "./SubMenu/LunchwithStar";
import NonVeg from "./SubMenu/NonVeg";
import Veg from "./SubMenu/Veg";
import Challenge from "./SubMenu/Challenge";
import RahanVeg from "./SubMenu/RahanVeg";
import OreeMummy from "./SubMenu/OreeMummy";
import Spiritual from "./SubMenu/Spiritual";
import National from "./SubMenu/National";
import International from "./SubMenu/International";
import Restaurant from "./SubMenu/Restaurant";
import StreetFood from "./SubMenu/StreetFood";
import Ads from "./Components/Ads";
import Card from "./Pages/Card";
import CardList from "./Pages/CardList";
import RecipeData from "./Pages/RecipeData";
import TravelData from "./Components/TravelData";
import Lunch from "./SubMenu/Lunch";
import QuickLink from "./Pages/QuickLinks";
import WomenEmpowerment from "./SubMenu/WomenEmpowerment";
import Awards from "./SubMenu/Awards";
import ShowMore from "./SubMenu/ShowMore";
import Category from "./Pages/Category";
import Domestic from "./Pages/Domestic";
import DynamicPage from "./Pages/DynamicPage";
import RecipeDataCook from "./Components/RecipeDataCook";
import PageNotFound from "./Components/Layout/NotFound/PageNotFound.jsx";

// Admin dashboard
import Admin from "./Components/Admin/Admin";
import PostMangagement from "./Components/Admin/AdminComponents/PostMangagement";
import Posts from "./Components/Admin/AdminComponents/Posts";
import CreatePages from "./Components/Admin/AdminComponents/CreatePages";
import QuickLinks from "./Components/Admin/AdminComponents/QuickLinks";
import Slider from "./Components/Admin/AdminComponents/Slider";
import LogoText from "./Components/Admin/AdminComponents/LogoText";
import UserManagement from "./Components/Admin/AdminComponents/UserManagement";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage } from "./redux/reducers/userReducer";
import { loadUser } from "./redux/actions/user";
import { ProtectedRoute } from "protected-route-react";
import Login from "./Auth/Login";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllSliderImages } from "./redux/actions/slider";
import Popups from "./Components/Admin/AdminComponents/Popups";
import AdminAds from "./Components/Admin/AdminComponents/AdminAds";
import Loader from "./Components/Layout/Loader/Loader.jsx";
import Navbar from "./Pages/Navbar.jsx";
import UserMessages from "./Components/Admin/AdminComponents/UserMessages.jsx";

function App() {
  const { isAuthenticated, user, error, message, loading } = useSelector(
    (state) => state.user
  );
  const { message: sliderMessage } = useSelector((state) => state.slider);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.info(message);
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getAllSliderImages());
  }, [dispatch, message, sliderMessage]);

  // console.log(user);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={!isAuthenticated}>
                <Login />
              </ProtectedRoute>
            }
          />

          {user && user.role === "admin" ? (
            <>
              {/* Admin Routes */}
              <Route
                path="/"
                element={<Home user={user} isAuthenticated={isAuthenticated} />}
              />
              <Route path="/admin" element={<Admin />} />
              <Route
                path="/admin/post-management/categories"
                element={<PostMangagement />}
              />
              <Route path="/admin/post-management/posts" element={<Posts />} />
              <Route path="/admin/post-management/popup" element={<Popups />} />
              <Route path="/admin/post-management/ads" element={<AdminAds />} />
              <Route
                path="/admin/custompages/createpage"
                element={<CreatePages />}
              />
              <Route path="/admin/footer/quicklinks" element={<QuickLinks />} />
              <Route path="/admin/footer/logo-text" element={<LogoText />} />
              <Route path="/admin/footer/slider" element={<Slider />} />
              <Route
                path="/admin/user-management"
                element={<UserManagement />}
              />
              <Route path="/admin/user-messages" element={<UserMessages />} />
            </>
          ) : isAuthenticated ? (
            <>
              {/* User Routes */}
              <Route
                path="/"
                element={<Home user={user} isAuthenticated={isAuthenticated} />}
              />
              <Route path="food" element={<Food />}>
                <Route path="/food/restaruant" element={<Restaurant />}></Route>
                <Route path="/food/streetfood" element={<StreetFood />}></Route>
                <Route
                  path="/food/lunchWithStar"
                  element={<LunchwithStar />}
                ></Route>
              </Route>

              <Route path="/travel" element={<Travel />}>
                <Route path="/travel/spiritual" element={<Spiritual />}></Route>
                <Route path="/travel/national" element={<National />}></Route>
                <Route
                  path="/travel/international"
                  element={<International />}
                ></Route>
                <Route path="travel/category" element={<Category />} />
              </Route>
              <Route path="/familyfun" element={<FamilyFun />}>
                <Route path="/familyfun/challenge" element={<Challenge />} />
                <Route path="/familyfun/rahanVeg" element={<RahanVeg />} />
                <Route path="/familyfun/oreeMummy" element={<OreeMummy />} />
              </Route>
              <Route path="/recipe" element={<Recipe />}>
                <Route path="/recipe/veg" element={<Veg />} />
                <Route path="/recipe/nonVeg" element={<NonVeg />} />
              </Route>
              <Route path="/quickLink" element={<QuickLink />}>
                <Route
                  path="/quickLink/womenEmpowerment"
                  element={<WomenEmpowerment />}
                />
                <Route path="/quickLink/award" element={<Awards />} />
                <Route path="/quickLink/foundation" element={<Foundation />} />
              </Route>

              <Route path="/events" element={<Events />} />
              <Route path="/ads" element={<Ads />} />
              <Route path="/card" element={<Card />} />
              <Route path="/recipeData" element={<RecipeData />} />
              <Route path="/travelData" element={<TravelData />} />
              <Route path="/lunch" element={<Lunch />} />
              <Route path="/cardList" element={<CardList />} />
              <Route path="/showMore" element={<ShowMore />} />
              <Route path="/domestic" element={<Domestic />} />
              <Route path="/recipedatacook" element={<RecipeDataCook />} />
              <Route path="/foundation" element={<Foundation />} />

              <Route path="/:title" element={<DynamicPage />} />

              <Route path="*" element={<PageNotFound />} />
            </>
          ) : (
            <>
              {/* All accessable routes */}
              <Route
                path="/"
                element={<Home user={user} isAuthenticated={isAuthenticated} />}
              />
              <Route path="food" element={<Food />}>
                <Route path="/food/restaruant" element={<Restaurant />}></Route>
                <Route path="/food/streetfood" element={<StreetFood />}></Route>
                <Route
                  path="/food/lunchWithStar"
                  element={<LunchwithStar />}
                ></Route>
              </Route>

              <Route path="/travel" element={<Travel />}>
                <Route path="/travel/spiritual" element={<Spiritual />}></Route>
                <Route path="/travel/national" element={<National />}></Route>
                <Route
                  path="/travel/international"
                  element={<International />}
                ></Route>
                <Route path="travel/category" element={<Category />} />
              </Route>
              <Route path="/familyfun" element={<FamilyFun />}>
                <Route path="/familyfun/challenge" element={<Challenge />} />
                <Route path="/familyfun/rahanVeg" element={<RahanVeg />} />
                <Route path="/familyfun/oreeMummy" element={<OreeMummy />} />
              </Route>
              <Route path="/recipe" element={<Recipe />}>
                <Route path="/recipe/veg" element={<Veg />} />
                <Route path="/recipe/nonVeg" element={<NonVeg />} />
              </Route>
              <Route path="/quickLink" element={<QuickLink />}>
                <Route
                  path="/quickLink/womenEmpowerment"
                  element={<WomenEmpowerment />}
                />
                <Route path="/quickLink/award" element={<Awards />} />
                <Route path="/quickLink/foundation" element={<Foundation />} />
              </Route>

              <Route path="/events" element={<Events />} />
              <Route path="/ads" element={<Ads />} />
              <Route path="/card" element={<Card />} />
              <Route path="/recipeData" element={<RecipeData />} />
              <Route path="/travelData" element={<TravelData />} />
              <Route path="/lunch" element={<Lunch />} />
              <Route path="/cardList" element={<CardList />} />
              <Route path="/showMore" element={<ShowMore />} />
              <Route path="/domestic" element={<Domestic />} />
              <Route path="/recipedatacook" element={<RecipeDataCook />} />
              <Route path="/foundation" element={<Foundation />} />

              {/* Dynamic Route */}
              <Route path="/:title" element={<DynamicPage />} />

              <Route path="*" element={<PageNotFound />} />
            </>
          )}
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
