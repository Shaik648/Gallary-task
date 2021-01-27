import React, { useEffect, useState } from "react";
import { searchForAssest } from "./services/search-service";
import Search from "./components/search/search";
import Photo from "./components/photos/photo";

const App = () => {
  const [appState, setAppState] = useState({
    loading: true,
    searchValue: " ",
    engine: "flicker",
    photos: []
  });
  useEffect(() => {
    search();
  }, [appState.engine]);

  const searchTermChanged = (e) => {
    setAppState({ ...appState, searchValue: e.target.value });
  };

  const searchEngineChanged = (e) => {
    const value = e.target.value;
    setAppState({ ...appState, engine: value });
  };

  const search = () => {
    setAppState({ ...appState, loading: true, photos: [] });
    searchForAssest(appState.searchValue, appState.engine)
      .then((photos) => {
        setAppState({ ...appState, loading: false, photos: photos });
      })
      .catch((err) => {
        setAppState({ ...appState, loading: false, photos: [] });
      });
  };

  return (
    <div className="App">
      <Search
        search={search}
        engine={appState.engine}
        engineChanged={searchEngineChanged}
        searchTermChanged={searchTermChanged}
        searchValue={appState.searchValue}
      />

      <div>
        {appState.loading && <div className="loading">Loading...</div>}

        {appState.photos.length === 0 && !appState.loading && (
          <div>Can't find photos for this search term</div>
        )}

        {appState.photos.length > 0 && !appState.loading && (
          <React.Fragment>
            {appState.engine === "flicker" && (
              <Photo photos={appState.photos} />
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default App;
