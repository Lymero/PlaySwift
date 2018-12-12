// Les playlists
// Current playlist
// Vidéos de la playlist sélectionnée

import React from "react";
import withContextConsumer from "react/utils/with_context_consumer.jsx";
import Api from "react/utils/api";

const PlaylistsContext = React.createContext({
  playlists: [],
  myPlaylists: [],
  currentPlaylistId: undefined,
  currentPlaylistVideos: [],
  currentPlaylistSuggestions: [],
  tags: []
});

const PlaylistsConsumer = PlaylistsContext.Consumer;

class PlaylistsProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlists: [],
      myPlaylists: [],
      currentPlaylistId: undefined,
      currentPlaylistVideos: [],
      currentPlaylistSuggestions: [],
      tags: []
    };

    this.loadInitialPlaylists();
    this.loadMyPlaylists();
    this.loadTags();

    this.addPlaylist = this.addPlaylist.bind(this);
    this.removePlaylist = this.removePlaylist.bind(this);
    this.setCurrentPlaylist = this.setCurrentPlaylist.bind(this);
    this.addVideoCurrentPlaylist = this.addVideoCurrentPlaylist.bind(this);
    this.removeVideoCurrentPlaylist = this.removeVideoCurrentPlaylist.bind(
      this
    );
    this.displayFilteredPlaylists = this.displayFilteredPlaylists.bind(this);
    this.loadInitialPlaylists = this.loadInitialPlaylists.bind(this);
    this.manageSuggestion = this.manageSuggestion.bind(this);
  }

  loadTags() {
    Api({
      url: "/api/tags",
      method: "GET"
    }).then(fetchedTags => {
      this.setState({
        tags: fetchedTags
      });
    });
  }

  addVideoCurrentPlaylist() {
    // CALL API
    // APPEND TO CURRENT PLAYLIST VIDEOS
  }

  removeVideoCurrentPlaylist(idVideoToRemove) {
    const { currentPlaylistVideos } = this.state;
    Api({
      url: "/api/videos/" + idVideoToRemove,
      method: "DELETE"
    }).then(() => {
      currentPlaylistVideos.splice(
        currentPlaylistVideos.findIndex(
          e => e.id_video_playlist === idVideoToRemove
        ),
        1
      );
      this.setState({
        currentPlaylistVideos: currentPlaylistVideos
      });
    });
  }

  setCurrentPlaylist(playlist) {
    this.setState(
      {
        currentPlaylistId: playlist
      },
      () => {
        this.loadInitialVideosOfPlaylist();
        this.loadInitialSuggestionsOfPlaylist();
      }
    );
  }

  loadInitialVideosOfPlaylist() {
    // CHECK API RESPONSE
    let playlistID = this.state.currentPlaylistId;
    Api({
      url: "/api/playlists/" + playlistID + "/videos",
      method: "GET"
    }).then(fetchedVideos => {
      this.setState({
        currentPlaylistVideos: fetchedVideos
      });
    });
  }

  loadInitialSuggestionsOfPlaylist() {
    const playlistID = this.state.currentPlaylistId;
    Api({
      url: "api/playlists/" + playlistID + "/suggestions",
      method: "GET"
    }).then(fetchedSuggestions => {
      console.log("fetched suggestions");
      console.log(fetchedSuggestions);
      this.setState({
        currentPlaylistSuggestions: fetchedSuggestions
      });
    });
  }

  loadInitialPlaylists() {
    // CHECK API RESPONSE
    Api({
      url: "/api/playlists",
      method: "GET",
      params: null
    }).then(playlistsFetched => {
      this.setState({
        playlists: playlistsFetched
      });
    });
  }

  loadMyPlaylists() {
    // CHECK API RESPONSE
    Api({
      url: "/api/users/me/playlists",
      method: "GET",
      params: null
    }).then(playlistsFetched => {
      this.setState({
        myPlaylists: playlistsFetched
      });
    });
  }

  addPlaylist(playlistToAdd) {
    // CHECK API RESPONSE
    Api({
      url: "/api/playlists",
      method: "POST",
      params: playlistToAdd
    }).then(resp => {
      this.setState({
        playlists: [...this.state.playlists, resp],
        myPlaylists: [...this.state.myPlaylists, resp]
      });
    });
  }

  /**
   * Display only the filtered videos (search form)
   * @param {filtered_playlists} playlists to display
   */
  displayFilteredPlaylists(strategy) {
    Api({
      url: "/api/playlists",
      method: "GET",
      params: null
    }).then(playlistsFetched => {
      const filtered_playlists = playlistsFetched.filter(strategy);
      this.setState({
        playlists: filtered_playlists
      });
    });

    Api({
      url: "/api/users/me/playlists",
      method: "GET",
      params: null
    }).then(playlistsFetched => {
      const filtered_playlists = playlistsFetched.filter(strategy);
      this.setState({
        myPlaylists: filtered_playlists
      });
    });
  }

  utilRemovePlaylistById(array, id) {
    const indice = array.findIndex(e => e.id_playlist === id);
    if (indice >= 0) {
      array.splice(indice, 1);
    }
    return array;
  }

  removePlaylist(playlistToRemove) {
    const { id_playlist } = playlistToRemove;
    const { playlists, myPlaylists } = this.state;
    Api({
      url: `/api/playlists/${playlistToRemove.id_playlist}`,
      method: "DELETE"
    }).then(() => {
      this.setState({
        playlists: this.utilRemovePlaylistById(playlists, id_playlist),
        myPlaylists: this.utilRemovePlaylistById(myPlaylists, id_playlist)
      });
    });
  }

  manageSuggestion(state) {
    Api({
      url: `/api/playlists/${this.props.suggestion.id_video_playlist}/videos`,
      method: "POST",
      params: { id_playlist: this.props.suggestion.id_playlist }
    }).then(() => {
      Api({
        url: `/api/suggestions/${this.props.suggestion}/videos`,
        method: "UPDATE",
        params: { state: this.props.suggestion.state }
      }).then(() => {
        if (state === "accepted") {
          console.log("yeah!");
        } else if (state === "refused") {
          console.log("oh no!");
        }
      });
    });
  }

  render() {
    const {
      addPlaylist,
      removePlaylist,
      setCurrentPlaylist,
      addVideoCurrentPlaylist,
      removeVideoCurrentPlaylist,
      displayFilteredPlaylists,
      loadInitialPlaylists,
      manageSuggestion
    } = this;

    const {
      playlists,
      myPlaylists,
      currentPlaylistId,
      currentPlaylistVideos,
      currentPlaylistSuggestions,
      tags
    } = this.state;
    const { children } = this.props;

    const providerValues = {
      playlists,
      myPlaylists,
      tags,
      currentPlaylistId,
      currentPlaylistVideos,
      currentPlaylistSuggestions,
      addPlaylist,
      removePlaylist,
      setCurrentPlaylist,
      addVideoCurrentPlaylist,
      removeVideoCurrentPlaylist,
      displayFilteredPlaylists,
      loadInitialPlaylists,
      manageSuggestion
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
