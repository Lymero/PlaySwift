// Les playlists
// Current playlist
// Vidéos de la playlist sélectionnée

import React from "react";
import withContextConsumer from "react/utils/with_context_consumer.jsx";
import Api from "react/utils/api";

const PlaylistsContext = React.createContext({
  playlists: [],
  currentPlaylistId: undefined,
  currentPlaylistVideos: []
});

const PlaylistsConsumer = PlaylistsContext.Consumer;

class PlaylistsProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlists: [],
      currentPlaylistId: undefined,
      currentPlaylistVideos: []
    };

    this.loadInitialPlaylists();

    this.addPlaylist = this.addPlaylist.bind(this);
    this.removePlaylist = this.removePlaylist.bind(this);
    this.setCurrentPlaylist = this.setCurrentPlaylist.bind(this);
    this.addVideoCurrentPlaylist = this.addVideoCurrentPlaylist.bind(this);
    this.removeVideoCurrentPlaylist = this.removeVideoCurrentPlaylist.bind(this);
  }

  addVideoCurrentPlaylist() {
    // CALL API
    // APPEND TO CURRENT PLAYLIST VIDEOS
  }

  removeVideoCurrentPlaylist() {
    // CALL API
    // REMOVE FROM CURRENT PLAYLIST VIDEOS
  }

  setCurrentPlaylist(playlist) {
    console.log("SETTED CURRENT PLAYLIST");
    this.setState({ currentPlaylistId: playlist }, () => {
      console.log(this.state);
      this.loadInitialVideosOfPlaylist();
    });
  }

  loadInitialVideosOfPlaylist() {
    // CHECK API RESPONSE
    let playlistID = this.state.currentPlaylistId;
    Api({
      url: "/api/playlists/" + playlistID + "/videos",
      method: "GET"
    }).then(fetchedVideos => {
      this.setState({ currentPlaylistVideos: fetchedVideos });
      console.log("LOADER VIDEOS OF PLAYLIST");
      console.log(this.state);
    });
  }

  loadInitialPlaylists() {
    // CHECK API RESPONSE
    Api({
      url: "/api/playlists",
      method: "GET",
      params: null
    }).then(playlistsFetched => {
      this.setState({ playlists: playlistsFetched });
    });
  }

  addPlaylist(playlistToAdd) {
    // CHECK API RESPONSE
    Api({
      url: "/api/playlists",
      method: "POST",
      params: playlistToAdd
    });
    this.setState({ playlists: [...this.state.playlists, playlistToAdd] });
  }

  removePlaylist() {
    // SHOULD CALL API
    // SHOULD REMOVE FROM PLAYLISTS
    console.log("NOT YET IMPLEMENTED");
  }

  render() {
    const {
      addPlaylist,
      removePlaylist,
      setCurrentPlaylist,
      addVideoCurrentPlaylist,
      removeVideoCurrentPlaylist
    } = this;

    const { playlists, currentPlaylistId, currentPlaylistVideos } = this.state;
    const { children } = this.props;

    const providerValues = {
      playlists,
      currentPlaylistId,
      currentPlaylistVideos,
      addPlaylist,
      removePlaylist,
      setCurrentPlaylist,
      addVideoCurrentPlaylist,
      removeVideoCurrentPlaylist
    };
    return (
      <PlaylistsContext.Provider value={providerValues}>
        {children}
      </PlaylistsContext.Provider>
    );
  }
}

const withPlaylists = withContextConsumer(PlaylistsConsumer);

export { PlaylistsConsumer, PlaylistsProvider, withPlaylists };
