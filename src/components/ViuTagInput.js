import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Label } from "reactstrap";

export default function Tags() {
  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} placeholder="Countries" />}
      />
    </Stack>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "Nigeria" },
  { title: "Ethiopia" },
  { title: "Egypt" },
  { title: "Mali" },
  { title: "Algeria" },
  { title: "Niger" },
  { title: "kenya" },
  { title: "Ghana" },
  { title: "Chad" },
  { title: "Camerooon" },
  { title: "Togo" },
];
