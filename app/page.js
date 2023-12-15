"use client"




import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import Login from "@/components/Login";
import LoadingSpinner from "@/components/LoadingSpinner";
import axios from "axios";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingGifs, setLoadingGifs] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const itemsPerPage = 3;

  const fetchGifs = async () => {
    try {
      setLoadingGifs(true);
      setNoResults(false);

      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&limit=50`
      );

      const fetchedGifs = response.data.data;

      if (fetchedGifs.length === 0) {
        setNoResults(true);
      } else {
        setGifs(fetchedGifs);
      }
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    } finally {
      setLoadingGifs(false);
    }
  };

  useEffect(() => {
    fetchGifs();
  }, [searchTerm]);

  const handleSearch = () => {
    fetchGifs();
  };

  const handleLogout = () => {
    setSearchTerm("");
    signOut(auth);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(gifs.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentGifs = gifs.slice(startIdx, endIdx);

  const displayPages = [currentPage - 1, currentPage, currentPage + 1].filter(
    (page) => page > 0 && page <= totalPages
  );

  if (loading) return <LoadingSpinner />;
  if (!user) return <Login />;

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gray-200 px-4 py-2">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <a
            href="#"
            onClick={handleLogout}
            className="rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 focus-visible:ring active:text-gray-700"
          >
            Log Out
          </a>
        </div>
      </header>



      <main className="max-w-screen-2xl mx-auto px-4 md:px-8 mt-8">
        <div className="flex flex-col items-center mt-8 lg:mt-24">
          <div className="mb-4 flex items-center">
            <input
              type="text"
              placeholder="Article name or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg border-gray-300 p-2 focus:outline-none focus:ring w-full md:w-96"
            />
            <button
              onClick={handleSearch}
              className="ml-2 inline-block rounded-lg bg-black px-4 py-2 text-white outline-none hover:bg-gray-800 focus-visible:ring active:bg-gray-900"
            >
              Search
            </button>
          </div>

          <div className="flex justify-center items-center h-full">
            {loadingGifs ? (
              <div className="marginspinner">
                <LoadingSpinner />
                </div>
            ) : noResults ? (
              <p className="text-gray-700">No GIFs found</p>
            ) : (



              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {currentGifs.map((gif) => (
                  <div
                    key={gif.id}
                    className="relative group overflow-hidden rounded-lg aspect-w-1 aspect-h-1 h-48"
                  >
                    <img
                      src={gif.images.fixed_height.url}
                      alt={gif.title}
                      className="object-cover w-full h-full transition-transform transform scale-100 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>




            )}
          </div>
        </div>
      </main>
      <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 flex justify-center space-x-2">
        {currentPage > 1 && (
     <button
     onClick={() => handlePageChange(currentPage - 1)}
     className="px-3 py-2 focus:outline-none bg-gray-100 text-black relative transition duration-300 hover:bg-red-500 hover:border-b-4 hover:border-red-500 hover:bg-opacity-50"
   >
     Previous
   </button>  
        )}
        {displayPages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-2 focus:outline-none ${
              currentPage === page
                ? "bg-gray-100 text-black relative transition duration-300 hover:bg-red-500 hover:border-b-4 hover:border-red-500 hover:bg-opacity-50"
                : "bg-gray-100 text-black relative transition duration-300 hover:bg-red-500 hover:border-b-4 hover:border-red-500 hover:bg-opacity-50"
            }`}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-2 focus:outline-none bg-gray-100 text-black relative transition duration-300 hover:bg-red-500 hover:border-b-4 hover:border-red-500 hover:bg-opacity-50"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}