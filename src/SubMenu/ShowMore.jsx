import React, { useState } from 'react';
import Food1 from '../assets/Food1.jpg';
import blogtravel from '../assets/blogtravel.png';
import restro2 from '../assets/restro2.jpg';
import cookingTip1 from '../assets/cookingTip1.jpg';
import shopping1 from '../assets/shopping1.jpg';
import Navbar from '../Pages/Navbar';
import image6 from '../assets/image6.jpg';
import Footer from '../Pages/Footer';
import BlogSection from '../Pages/BlogSection'; // Adjust the path as per your project structure
import BlogData from '../Pages/BlogData'; // Assuming BlogData is exported as default from BlogData.jsx

export default function Showmore() {
  const [showProductPopup, setShowProductPopup] = useState(true);

  // Function to close the product popup
  const handleClosePopup = () => {
    setShowProductPopup(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      {showProductPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 max-w-xs rounded-md relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img src={image6} alt="Product" className="w-full h-64 object-cover mb-4" />
            <h3 className="text-lg font-bold mb-2">Amazing Kitchen Gadget</h3>
            <p className="text-gray-700 mb-2">Rating: ★★★★☆</p>
            <p className="text-gray-700 mb-2">
              This kitchen gadget will transform your cooking experience. It's versatile, durable, and easy to use.
            </p>
            <p className="text-gray-700 font-bold mb-4">Special Offer: 20% off!</p>
            <button
              onClick={handleClosePopup}
              className="bg-purple-500 text-white py-2 px-4 rounded-md mr-2"
            >
              Buy Now
            </button>
          </div>
        </div>
      )}

      {/* Main content after the product popup */}
      {!showProductPopup && (
        <div className="grid grid-cols-6 gap-4 max-w-7xl mx-auto py-8 px-8">
          {/* Main Content */}
          <div className="col-span-4">
            <header className="p-4 mb-8">
              <h1 className="text-3xl font-bold text-center mb-4">
                Crazy Foody Ranjita: Delicious Recipes, Restaurant Reviews, and Shopping Tips
              </h1>
              <p className="text-gray-600 text-center">
                Discover mouth-watering recipes, insightful restaurant reviews, and the best shopping tips with Crazy Foody Ranjita. Dive into the world of culinary delights and food adventures.
              </p>
            </header>
            <div className="mb-8">
              <img src={blogtravel} alt="Crazy Foody Ranjita" className="w-full" />
            </div>
            <div className="mb-8" id="delicious-recipes">
              <h2 className="text-2xl font-bold mb-2">Delicious Recipes</h2>
              <div className="overflow-hidden flex">
                <img src={Food1} alt="Delicious Recipes" className="w-[50%] h-64 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">Authentic Italian Pizza</h3>
                  <p className="text-gray-700 mb-4">
                    Experience the flavors of Italy with our authentic pizza recipe. Made with fresh ingredients and baked to perfection, this pizza will transport you to the streets of Naples. Our recipe includes tips on making the perfect dough, choosing the right toppings, and achieving that crispy crust. Whether you're a pizza enthusiast or new to Italian cuisine, this recipe is sure to impress. Don't forget to pair it with a glass of Chianti for a complete Italian dining experience at home.
                  </p>
                </div>
              </div>
            </div>

            {/* Other sections like Restaurant Reviews, Cooking Tips & Tricks, etc. */}
            <div className="grid grid-cols-1 gap-6">
              {/* Restaurant Reviews */}
              <h2 className="text-2xl font-bold mb-2">Restaurant Reviews</h2>
              <div className="overflow-hidden flex" id="restaurant-reviews">
                <div className="p-4">
                  <p className="text-gray-700">
                    Discover honest reviews of restaurants to help you choose the best dining experiences.
                    Restaurant reviews provide insightful perspectives on food quality, service efficiency,
                    ambiance appeal, and overall dining value. Each review offers a detailed look into specific dishes and culinary specialties,
                    guiding diners in selecting venues that match their preferences. They cover the atmosphere,
                    whether casual, elegant, or uniquely themed, and assess how well establishments cater to guest needs.
                  </p>
                </div>
                <img src={restro2} alt="Restaurant Reviews" className="w-[40%] h-64 object-cover" />
              </div>

              {/* Cooking Tips & Tricks */}
              <h2 className="text-2xl font-bold mb-2">Cooking Tips & Tricks</h2>
              <div className="overflow-hidden flex" id="cooking-tips">
                <img src={cookingTip1} alt="Cooking Tips & Tricks" className="w-[40%] h-64 object-cover" />
                <div className="p-4">
                  <p className="text-gray-700">
                    Explore essential cooking tips and tricks to elevate your culinary skills. Learn the art of seasoning to enhance flavors and master knife skills for precision and safety. Discover the importance of ingredient quality and freshness in achieving delicious results. Experiment with different cooking methods like sautéing, braising, and roasting to diversify your culinary repertoire. Understand the science behind cooking temperatures and timings to achieve perfect doneness. Gain insights into meal planning and preparation techniques for efficient cooking sessions.
                  </p>
                </div>
              </div>

              {/* YouTube Video */}
              <div className="mb-8" id="youtube-video">
                <h2 className="text-2xl font-bold mb-2">YouTube Video</h2>
                <div className="video-container">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/IKy5Bz7hW5M?si=SVJSMBlduxgDdodO"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="shadow-md"
                  ></iframe>
                </div>
              </div>

              {/* Shopping Tips */}
              <h2 className="text-2xl font-bold mb-2">Shopping Tips</h2>
              <div className="overflow-hidden flex" id="shopping-tips">
                <div className="p-4">
                  <p className="text-gray-700">
                    Discover insightful tips for shopping ingredients and kitchen essentials.
                    Learn to prioritize freshness and quality when selecting produce and meats.
                    Opt for versatile pantry staples like grains, spices, and oils to enhance your cooking options.
                    Utilize seasonal produce for better flavor and cost-effectiveness. Compare prices across different stores and consider bulk buying for items you frequently use.
                    Don't forget to check expiration dates and storage requirements to maximize shelf life. Invest in quality kitchen tools and equipment that suit your cooking style and needs.
                  </p>
                </div>
                <img src={shopping1} alt="Shopping Tips" className="w-[40%] h-64 object-cover" />
              </div>

              {/* Food Adventures */}
              <h2 className="text-2xl font-bold mb-2">Food Adventures</h2>
              <div className="overflow-hidden flex" id="food-adventures">
                <img src={Food1} alt="Food Adventures" className="w-[40%] h-64 object-cover" />
                <div className="p-4">
                  <p className="text-gray-700">
                    Embarking on food adventures around the world opens up a tantalizing array of culinary experiences, each offering a glimpse into the rich tapestry of global cuisine. From the bustling street food scenes of Southeast Asia, where the air is thick with the aroma of spicy curries and grilled satays, to the refined elegance of French haute cuisine, with its delicate pastries and meticulously prepared dishes, every destination presents a unique flavor profile shaped by its history, geography, and cultural traditions.
                  </p>
                </div>
              </div>

              {/* Featured Destination */}
              <div className="p-4 mb-8" id="featured-destination">
                <h2 className="text-2xl font-bold mb-2">Featured Destination</h2>
                <p className="text-gray-700">
                  Discover Malaysia's rich tapestry of culture and breathtaking landscapes
                  in our latest travel vlog.
                  Immerse yourself in vibrant cities and serene tropical beaches,
                  perfect for your next adventure.
                  Experience Kuala Lumpur's iconic Petronas Towers and bustling markets.
                  Dive into the historic charm of Malacca with its colonial architecture and vibrant street art.
                  Explore the lush rainforests of Borneo, home to diverse wildlife like orangutans and pygmy elephants.
                  Indulge in delicious Malaysian cuisine, a tantalizing fusion of Malay, Chinese, and Indian flavors.
                  
                </p>
              </div>

              {/* Hotel Reviews */}
              <div className="p-4 mb-8" id="hotel-reviews">
                <h2 className="text-2xl font-bold mb-2">Hotel Reviews</h2>
                <p className="text-gray-700">
                  Read our detailed reviews of the hotels we stayed at during our Malaysia trip. Find out which one suits your preferences best!
                </p>
                {/* Detailed Reviews */}
                <div className="mt-4">
                  <h3 className="text-lg font-bold mb-2">Kuala Lumpur</h3>
                  <p className="text-gray-700 mb-4">
                    Discover luxurious city stays with stunning skyline views and easy access to shopping and dining.
                  </p>
                  <h3 className="text-lg font-bold mb-2">Penang</h3>
                  <p className="text-gray-700 mb-4">
                    Dive into the historic charm of heritage hotels nestled amidst George Town's cultural landmarks.
                  </p>
                  <h3 className="text-lg font-bold mb-2">Langkawi</h3>
                  <p className="text-gray-700 mb-4">
                    Unwind in beachfront resorts offering tranquility, panoramic ocean views, and world-class amenities.
                  </p>
                  <h3 className="text-lg font-bold mb-2">Malacca</h3>
                  <p className="text-gray-700 mb-4">
                    Immerse yourself in boutique hotels with colonial architecture and proximity to historic sites.
                  </p>
                  <h3 className="text-lg font-bold mb-2">Borneo</h3>
                  <p className="text-gray-700 mb-4">
                    Experience eco-friendly lodges in the heart of lush rainforests, perfect for wildlife enthusiasts.
                  </p>
                </div>
              </div>

              {/* Travel Tips */}
              <div className="mb-8" id="travel-tips">
                <h2 className="text-2xl font-bold mb-2">Travel Tips</h2>
                <p className="text-gray-700">
                  Planning a trip to Malaysia? Check out our travel tips to make the most of your visit.
                </p>
                {/* Additional Information and Links */}
                <footer className="shadow-md p-4 mt-4">
                  <h2 className="text-2xl font-bold mb-2">More Information and Contact</h2>
                  <p className="text-gray-700">
                    Mother, Wife, Foody, Vlogger, Entrepreneur<br />
                    Food is the reason you should travel, and on my channel you'll watch videos that feature incredibly delicious food and travel tips. You'll find Street Food Videos, Travel Vlogs, & Plenty of Indian Food Videos as that's where I'm based.<br />
                    I hope you're ready for a delicious food adventure!!!
                  </p>
                  <ul className="list-disc pl-4 text-gray-700 mt-4">
                    <li>For Sponsorship & Business Enquiries: <a href="mailto:crazyfoodytraveler@gmail.com">crazyfoodytraveler@gmail.com</a></li>
                    <li>Follow me on <a href="https://instagram.com/crazyfoodyranjita?igshid=YmMyMTA2M2Y=" className="text-blue-500">Instagram</a></li>
                    <li>Follow me on <a href="https://facebook.com/crazyfoodytraveler" className="text-blue-500">Facebook</a></li>
                    <li>View my <a href="https://www.youtube.com/@CrazyFoodyRanjita" className="text-blue-500">YouTube Channel</a></li>
                    <li>675K subscribers | 1,523 videos | 467,220,231 views | Joined 7 Jul 2018 | India</li>
                  </ul>
                </footer>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-2 ">
            {/* Product Section */}
            <div className="border border-gray-300 p-4  w-[85%] ml-8">
              <img src={image6} alt="Product" className="w-full h-64 object-cover mb-4" />
              <h3 className="text-lg font-bold mb-2">Amazing Kitchen Gadget</h3>
              <p className="text-gray-700 mb-2">Rating: ★★★★☆</p>
              <p className="text-gray-700 mb-2">
                This kitchen gadget will transform your cooking experience. It's versatile, durable, and easy to use.
              </p>
              <p className="text-gray-700 font-bold mb-4">Special Offer: 20% off!</p>
              <button
                onClick={() => window.open('https://www.amazon.com', '_blank')}
                className="bg-purple-500 text-white py-2 px-4 rounded-md"
              >
                Buy Now
              </button>

            </div>
            {/* <div className="p-4 mb-4">
              <h2 className="font-bold text-xl mb-2">Quick Links</h2>
              <ul className="text-gray-700">
                <li className="mb-2">
                  <a href="#delicious-recipes" className="hover:text-blue-500">Delicious Recipes</a>
                </li>
                <li className="mb-2">
                  <a href="#restaurant-reviews" className="hover:text-blue-500">Restaurant Reviews</a>
                </li>
                <li className="mb-2">
                  <a href="#cooking-tips" className="hover:text-blue-500">Cooking Tips & Tricks</a>
                </li>
                <li className="mb-2">
                  <a href="#shopping-tips" className="hover:text-blue-500">Shopping Tips</a>
                </li>
                <li className="mb-2">
                  <a href="#food-adventures" className="hover:text-blue-500">Food Adventures</a>
                </li>
                <li className="mb-2">
                  <a href="#featured-destination" className="hover:text-blue-500">Featured Destination</a>
                </li>
                <li className="mb-2">
                  <a href="#youtube-video" className="hover:text-blue-500">YouTube Video</a>
                </li>
                <li className="mb-2">
                  <a href="#hotel-reviews" className="hover:text-blue-500">Hotel Reviews</a>
                </li>
                <li className="mb-2">
                  <a href="#travel-tips" className="hover:text-blue-500">Travel Tips</a>
                </li>
              </ul>
            </div> */}
            {/* <div className="p-4 mb-4">
              <h2 className="font-bold text-xl mb-2">Follow Us</h2>
              <ul className="text-gray-700">
                <li className="mb-2">
                  <a href="https://instagram.com/crazyfoodyranjita?igshid=YmMyMTA2M2Y=" className="hover:text-blue-500">Instagram</a>
                </li>
                <li className="mb-2">
                  <a href="https://facebook.com/crazyfoodytraveler" className="hover:text-blue-500">Facebook</a>
                </li>
                <li className="mb-2">
                  <a href="https://www.youtube.com/@CrazyFoodyRanjita" className="hover:text-blue-500">YouTube</a>
                </li>
              </ul>
            </div> */}
            {/* Blog Section */}
            <div className='max-w-md mx-auto py-8 px-8'>
              <h2 className='text-3xl font-bold text-center mb-8'>Trending Blog Posts</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8'>
                {BlogData.map(blog => (
                  <BlogSection key={blog.id} blogData={blog} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
