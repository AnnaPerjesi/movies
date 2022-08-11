import { inject, observer } from "mobx-react";
import React from "react";
import MovieDialog from "../components/movies/movie-dialog/MovieDialog";
import Movies from "../components/movies/Movies";
import MainStore from "../core/store/MainStore";

interface IProps {
  MainStore?: MainStore;
}

class HomePage extends React.Component<IProps> {
  render() {
    return (
      <div>
        <MovieDialog />

        <Movies />
      </div>
    );
  }
}
export default inject("MainStore")(observer(HomePage));
