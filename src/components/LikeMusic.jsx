import React, { useContext, useEffect } from "react";
import Card from "./Card";
import { MusicContext } from "../Context";

function LikedMusic() {
  const musicContext = useContext(MusicContext);
  const likedMusic = musicContext.likedMusic;
  const setlikedMusic = musicContext.setLikedMusic;

  useEffect(() => {
    window.scrollTo(0, 0);
    const localLikedMusic = JSON.parse(localStorage.getItem("likedMusic"));
    setlikedMusic(localLikedMusic);
  }, [setlikedMusic]);

  return (
    <div>
      {likedMusic.length === 0 ? (
        <div className="container">
          <div className="row">
            <div className="col">
              <h3 className="text-center font-monospace">
                You don't have any liked music yet!
              </h3>
              <div className="text-center">
              <img src="https://img.freepik.com/free-vector/cute-cat-eating-dango-mochi-onigiri-cartoon-vector-icon-illustration-animal-food-icon-concept-isolated-
              premium-vector-flat-cartoon-style_138676-4100.jpg?size=626&ext=jpg" alt=""  
              className="imgp"/>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          {likedMusic.map((element) => {
            return <Card key={element.id} element={element} />;
          })}
        </div>
      )}
    </div>
  );
}

export default LikedMusic;
