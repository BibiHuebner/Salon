import React from "react";
import { ArtistsContext } from "../Context/artistsContext";

const ArtistHub = () => {
  const { artists } = React.useContext(ArtistsContext);
  console.log(artists);
  return (
    <div>
      <h1>Artists</h1>
      {artists &&
        artists.map((artist) => (
          <div key={artist._id}>
            <h2>
              <strong>
                {artist.artistName}, {artist.age}
              </strong>
            </h2>
            <p>{artist.location}</p>
          </div>
        ))}
    </div>
  );
};

export default ArtistHub;
