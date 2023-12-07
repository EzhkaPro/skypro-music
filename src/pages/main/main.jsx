import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/context/context";
import * as S from "./main.styles";
import { playLists } from "../../data";
import Navigation from "../../components/navmenu/NavMenu";
import Player from "../../components/player/AudioPlayer";
import Sidebar from "../../components/sidebar/Sidebar";
import TrackList from "../../components/traklist/Tracklist";
import { getTracks } from "../../api/api";
import { useFetching } from "../../utils/hooks";
import { setAllTracks } from "../../store/slices/tracksSlice";

function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setUser } = useContext(AuthContext);

  const logout = () => {
    setUser(false);
    navigate("/login", { replace: false });
    localStorage.removeItem("auth");
  };

  const [content, setContent] = useState({});

  const [fetchTracks, loading, error] = useFetching(async () => {
    const response = await getTracks();
    setContent({
      sidebar: playLists,
    });

    dispatch(setAllTracks(await response));
  });
  const currentTrack = useSelector((state) => state.tracks.currentTrack);

  useEffect(() => {
    fetchTracks();
  }, []);

  return (
    <S.wrapper>
      <S.container>
        <S.main>
          <Navigation logout={logout} />
          <TrackList loading={loading} error={error} />
          <Sidebar logout={logout} array={content.sidebar} error={error} />
          {(currentTrack || loading) && (
            <Player currentTrack={currentTrack} loading={loading} />
          )}
        </S.main>
        <footer className="footer" />
      </S.container>
    </S.wrapper>
  );
}

export default Main;
