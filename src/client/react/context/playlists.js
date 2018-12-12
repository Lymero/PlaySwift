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
  tags: [],
  myTags: []
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
      tags: [],
      myTags: []
    };

    this.loadInitialPlaylists();
    this.loadMyPlaylists();
    this.loadTags();
    this.loadMyTags();

    this.addSubscribedTag = this.addSubscribedTag.bind(this);
    this.removeSubscribedTag = this.removeSubscribedTag.bind(this);

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

  loadMyTags() {
    Api({
      url: "/api/users/me/subscriptions",
      method: "GET"
    }).then(fetchedTags => {
      this.setState({
        myTags: fetchedTags
      });
    });
  }

  addSubscribedTag(tagToAdd) {
    // TODO
    Api({
      url: "/api/users/me/subscriptions",
      method: "POST",
      params: tagToAdd
    }).then(resp => {
      this.setState({
        myTags: [...this.state.myTags, resp]
      });
    });
  }

  removeSubscribedTag(tagToRemove) {
    // TODO
  }

  addVideoCurrentPlaylist(body) {
    const { currentPlaylistVideos } = this.state;
    let urlThumbnail;
    Api({
      url: "/api/playlists/" + this.state.currentPlaylistId + "/videos",
      method: "POST",
      params: body
    })
      .then(resp => {
        urlThumbnail = resp.url_thumbnail;
        currentPlaylistVideos.push(resp);
        this.setState({
          currentPlaylistVideos: currentPlaylistVideos
        });
      })
      .then(() => {
        if (this.state.currentPlaylistVideos.length === 1) {
          // retrieve the playlist wich we've added a video to
          const id = this.state.currentPlaylistVideos[0].id_playlist;
          const playlist = this.state.myPlaylists.filter(
            playlist => playlist.id_playlist === id
          );
          playlist[0].url_thumbnail = urlThumbnail;
          this.setState({
            playlists: [...this.state.playlists, playlist[0]]
          });
        }
      });
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
      this.setState({
        currentPlaylistSuggestions: fetchedSuggestions
      });
    });
  }

  loadInitialPlaylists() {
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
    Api({
      url: "/api/playlists",
      method: "POST",
      params: playlistToAdd
    }).then(resp => {
      if (playlistToAdd.visible) {
        this.setState({
          playlists: [...this.state.playlists, resp]
        });
      }
      this.setState({
        myPlaylists: [...this.state.myPlaylists, resp]
      });
    });
  }

  /**
   * Display only the filtered playlists (search form)
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

  manageSuggestion(body) {
    const { currentPlaylistSuggestions } = this.state;
    const { id_suggestion, id_playlist, state } = body;
    Api({
      url: `/api/playlists/${id_playlist}/videos`,
      method: "POST",
      params: { id_playlist: id_playlist }
    }).then(() => {
      Api({
        url: `/api/suggestions/${id_suggestion}/videos`,
        method: "UPDATE",
        params: { state: state }
      }).then(() => {
        currentPlaylistSuggestions.splice(
          currentPlaylistSuggestions.findIndex(
            e => e.id_suggestion === id_suggestion
          ),
          1
        );
        this.setState({
          currentPlaylistSuggestions: currentPlaylistSuggestions
        });
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
      manageSuggestion,
      addSubscribedTag,
      removeSubscribedTag
    } = this;

    const {
      playlists,
      myPlaylists,
      currentPlaylistId,
      currentPlaylistVideos,
      currentPlaylistSuggestions,
      tags,
      myTags
    } = this.state;
    const { children } = this.props;

    const providerValues = {
      playlists,
      myPlaylists,
      tags,
      myTags,
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
      manageSuggestion,
      addSubscribedTag,
      removeSubscribedTag
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
