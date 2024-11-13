import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Label } from "reactstrap";
import { fetchData } from "./ViuTagInput";

export default function Tags({ handleChange = (f) => f }) {
  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    fetchData({ query_type: "get_indicators" })
      .then((d) => {
        if (d && d.results) {
          setList(d.results.map((a) => a.indicator));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Stack spacing={3}>
      <Autocomplete
        // multiple
        options={list}
        renderInput={(params) => <TextField {...params} placeholder="Indicators" />}
        onChange={(e, value) => handleChange(value)}
      />
    </Stack>
  );
}
