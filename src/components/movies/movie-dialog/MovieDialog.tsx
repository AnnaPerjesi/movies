import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Box,
  Grid,
} from "@mui/material";
import { inject, observer } from "mobx-react";
import React from "react";
import MainStore from "../../../core/store/MainStore";

interface IProps {
  MainStore?: MainStore;
}

class MovieDialog extends React.Component<IProps> {
  render() {
    const { MainStore } = this.props;

    if (!MainStore.isMovieDialogOpen) return null;

    return (
      <Dialog
        open={MainStore.isMovieDialogOpen}
        onClose={() => MainStore.closeMovieDialog()}
        className="movieDialog"
        maxWidth={"xl"}
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
                <Grid xs={12}>
                  <h2>Overview</h2>
                  <div>{MainStore.selectedMovie?.overview}</div>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }
}

export default inject("MainStore")(observer(MovieDialog));
