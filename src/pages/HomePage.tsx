import { Button, TextField } from "@mui/material";
import { inject, observer } from "mobx-react";
import React from "react";
import EditDialog from "../components/movies/edit-dialog/EditDialog";
import Movies from "../components/movies/Movies";
import MainStore from "../core/store/MainStore";

interface IProps {
  MainStore?: MainStore;
}

class HomePage extends React.Component<IProps> {
  render() {
    return (
      <div className="homePage">
        <EditDialog />

        <Movies />
      </div>
    );
  }
}
export default inject("MainStore")(observer(HomePage));
