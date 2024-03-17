import "./App.css";
import { useContext, useEffect, useState } from "react";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import { MusicContext } from "./Context";
import Music from "./assets/Music.gif";
import Playing from "./assets/Playing jazz.gif";

function App() {
  const [keyword, setKeyword] = useState("");
  const [setMessage] = useState("");
  const [tracks, setTracks] = useState([]);
  const [token] = useState(null);

  const musicContext = useContext(MusicContext);
  const isLoading = musicContext.isLoading;
  const setIsLoading = musicContext.setIsLoading;
  const resultOffset = musicContext.resultOffset;
  const setResultOffset = musicContext.setResultOffset;

  const fetchMusicData = async () => {
    setTracks([]);
    window.scrollTo(0, 0);
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://v1.nocodeapi.com/me_sonal/spotify/iYQJsuustEeHUNAo/search?q=${keyword}&type=track&offset=${resultOffset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch music data");
      }

      const jsonData = await response.json();

      setTracks(jsonData.tracks.items);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setResultOffset(0);
      fetchMusicData();
    }
  };


  return (
    <>
      <Navbar
        keyword={keyword}
        setKeyword={setKeyword}
        handleKeyPress={handleKeyPress}
        fetchMusicData={fetchMusicData}
      />

      <div className="container">
        {isLoading && (
          <div className="row">
            <div className="col-12 py-5 text-center">
              <div
                className="spinner-border"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        )}

        {tracks.length === 0 && !isLoading && (
          <div className="row">
            <div className="col-12 text-center mt-5">
              <p style={{ fontStyle: "italic", fontSize:"34px" }} >Ears craving for a beat? Let's find a 30-second snippet. Start the search! 🔍🎵</p>
              {/* <img src="https://img.freepik.com/free-vector/singer-recording-studio-woman-artist-booth_107791-1344.jpg?w=1380&t=st=1710576522~exp=1710577122~hmac=f3b6a6fbb17910b5b605be0e729669211f5218840b32caa20da2959435887291" alt=""  
              className="card-img-top BeerListItem-img m-1"/> */}
              <img src={Music} alt=""  className="m-1"/>
              <img src={Playing} alt=""  className="m-1"/>
              
            </div>
          </div>
        )}

        {tracks.length > 0 && (
          <div className="row">
            {tracks.map((element) => {
              return <Card key={element.id} element={element} />;
            })}
          </div>
        )}
      </div>

      <div
        className="modal fade position-absolute"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
      </div>
    </>
  );
}

export default App;
