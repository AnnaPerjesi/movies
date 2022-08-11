import { GridColDef } from "@mui/x-data-grid";

export const GRID_COLUMNS: GridColDef[] = [
  {
    field: "title",
    headerName: "Movie title",
    width: 400,
    cellClassName: "movieTitle",
  },
  {
    field: "releaseDate",
    headerName: "Released at",
    width: 300,
    valueGetter(params) {
      return new Date(params.value).toLocaleDateString("en-GB");
    },
  },
];
