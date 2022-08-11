import { inject, observer } from "mobx-react";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { toJS } from "mobx";
import { Paper } from "@mui/material";
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
            top: 34,
          }}
        >
          <div style={{ height: "60vh", width: "100%" }}>
            <DataGrid
              rows={toJS(MainStore.movies)}
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
