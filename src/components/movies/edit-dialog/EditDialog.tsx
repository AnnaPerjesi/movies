import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Box,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { inject, observer } from "mobx-react";
import React from "react";
import MainStore from "../../../core/store/MainStore";
import "../../../pages/Home.css";

interface IProps {
  MainStore?: MainStore;
}

class EditDialog extends React.Component<IProps> {
  render() {
    const { MainStore } = this.props;

    if (!MainStore.isMovieDialogOpen) return null;
    if (!MainStore.selectedMovie) return null;

    return (
      <Dialog
        open={MainStore.isMovieDialogOpen}
        onClose={() => MainStore.closeMovieDialog()}
        className="movieDialog"
        maxWidth={"xl"}
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <div>{MainStore.selectedMovie?.title}</div>
          <IconButton
            aria-label="close"
            onClick={() => MainStore.closeMovieDialog()}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
              <Grid container item spacing={2}>
                <Grid xs={6}>
                  <div className="inputContainer">
                    <TextField
                      label="Title"
                      variant="outlined"
                      style={{ width: "500px" }}
                      value={MainStore.selectedMovie.title || ""}
                      onChange={(ev) => {
                        MainStore.updateFieldByKey("title", ev.target.value);
                      }}
                    />
                  </div>
                </Grid>
                <Grid xs={6}>
                  <div className="inputContainer">
                    <TextField
                      label="Age limit"
                      variant="outlined"
                      style={{ width: "500px" }}
                      value={MainStore.selectedMovie.ageLimit || ""}
                      type="number"
                      onChange={(ev) => {
                        MainStore.updateFieldByKey("ageLimit", ev.target.value);
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid container item spacing={2}>
                <Grid xs={12}>
                  <div className="inputContainer">
                    <TextField
                      label="Overview"
                      variant="outlined"
                      style={{ width: "500px" }}
                      value={MainStore.selectedMovie.overview || ""}
                      onChange={(ev) => {
                        MainStore.updateFieldByKey("overview", ev.target.value);
                      }}
                    />
                  </div>
                </Grid>
              </Grid>

              <Button onClick={() => MainStore.save()}>Save</Button>

              {MainStore.selectedMovie.id && (
                <Button onClick={() => MainStore.delete()}>Delete</Button>
              )}
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }
}

export default inject("MainStore")(observer(EditDialog));
