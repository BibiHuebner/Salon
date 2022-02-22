import React, { useState, createContext, useEffect } from "react";
import axios from "../Utils/Axios";

export const ArtistsContext = createContext();

export const ArtistsProvider = ({ children }) => {
  const [artists, setArtists] = useState(null);

  const getArtists = () => {
    axios
      .get("/artists/all")
      .then((response) => {
        console.log(response);
        setArtists(response.data);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    getArtists();
  }, []);

  const value = { artists };

  return (
    <ArtistsContext.Provider value={value}>{children}</ArtistsContext.Provider>
  );
};
