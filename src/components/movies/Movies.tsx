import { inject, observer } from "mobx-react";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { toJS } from "mobx";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import MainStore from "../../core/store/MainStore";
import { GRID_COLUMNS } from "../../core/constans/GridColumns";

interface IProps {
  MainStore?: MainStore;
}

class Movies extends React.Component<IProps> {
  render() {
    const { MainStore } = this.props;

    if (MainStore.isLoading) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <Paper
          sx={{
            p: 2,
            margin: "auto",
            maxWidth: "80%",
            flexGrow: 1,
            marginTop: "32px",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid container item spacing={2}>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    onClick={() => MainStore.openMovieDialog(null)}
                  >
                    + Add new movie
                  </Button>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    label="Filter by age limit"
                    variant="outlined"
                    value={MainStore.filterByaAgeLimit || ""}
                    type="number"
                    onChange={(ev) => {
                      MainStore.setFilter(ev.target.value);
                    }}
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <div style={{ height: "60vh", width: "100%", marginTop: "24px" }}>
            <DataGrid
              rows={toJS(MainStore.getMovies)}
              columns={GRID_COLUMNS}
              pageSize={10}
              rowsPerPageOptions={[10]}
              onCellClick={(params) => {
                MainStore.openMovieDialog(params.id as any);
              }}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

export default inject("MainStore")(observer(Movies));
