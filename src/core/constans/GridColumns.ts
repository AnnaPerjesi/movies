import { GridColDef } from "@mui/x-data-grid";

export const GRID_COLUMNS: GridColDef[] = [
  {
    field: "title",
    headerName: "Movie title",
    width: 400,
    cellClassName: "movieTitle",
  },
  {
    field: "ageLimit",
    headerName: "Age limit",
    width: 200,
  },
];
