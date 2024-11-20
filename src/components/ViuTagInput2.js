import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Label } from "reactstrap";
import { fetchData } from "./ViuTagInput";

export default function Tags({ yearList = [], handleChange = (f) => f }) {
  return (
    <Stack spacing={3}>
      {/* {JSON.stringify(yearList.reverse())} */}
      <Autocomplete
        // multiple
        options={yearList}
        renderInput={(params) => <TextField {...params} placeholder="year" />}
        onChange={(e, value) => handleChange(value)}
      />
    </Stack>
  );
}
