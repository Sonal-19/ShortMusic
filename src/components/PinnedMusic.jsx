import React, { useContext, useEffect } from "react";
import Card from "./Card";
import { MusicContext } from "../Context";

function PinnedMusic() {
  const musicContext = useContext(MusicContext);
  const pinnedMusic = musicContext.pinnedMusic;
  const setpinnedMusic = musicContext.setPinnedMusic;

  useEffect(() => {
    window.scrollTo(0, 0);
    const localPinnedMusic = JSON.parse(localStorage.getItem("pinnedMusic"));
    setpinnedMusic(localPinnedMusic);
  }, [setpinnedMusic]);

  return (
    <div>
      <div className="container">
        {pinnedMusic.length === 0 ? (
          <div className="row">
            <div className="col">
              <h3 className="text-center font-monospace">
                You don't have any pinned music yet!
              </h3>
              <div className="text-center">
                {/* <i className="bi bi-emoji-frown fs-1"></i>{" "} */}
                {/* <img src="https://img.freepik.com/free-vector/hand-drawn-flat-design-shrug-illustration_52683-82865.jpg?t=st=1710657966~exp=1710661566~hmac=fa91932da0771a31ce08d78bc029bb6c014c0b1d14542c88575151ca458eebd8&w=996" alt=""  
              className="imgp"/> */}
                <img src="https://img.freepik.com/free-vector/cute-girl-angry-cartoon-vector-icon-illustration-people-sign-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4022.jpg?t=st=1710658178~exp=1710661778~hmac=f0e1df27697f2cee31cd63089f5e784d39c0e99ff5fec21cb69f654b0b330423&w=740" alt=""  
              className="imgp"/>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            {pinnedMusic.map((element) => {
              return <Card key={element.id} element={element} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default PinnedMusic;
