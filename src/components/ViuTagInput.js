import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Label } from "reactstrap";
export const APIURL = "http://localhost:34567";

// export const APIURL = "https://server.brainstorm.ng/Result-Associate-Backend";
export async function fetchData(queryTerms = {}) {
  try {
    let qArr = [];
    Object.keys(queryTerms).forEach((a) => {
      if (typeof queryTerms[a] === "object" && queryTerms[a].length > 1) {
        qArr.push(queryTerms[a].map((b) => `${a}=${b}`).join("&"));
      } else {
        qArr.push(`${a}=${queryTerms[a]}`);
      }
    });
    console.log(qArr);
    let raw = await fetch(`${APIURL}/query-data?${qArr.join("&")}`);
    return raw.json();
  } catch (error) {
    return error;
  }
}

export default function Tags({ handleChange = (f) => f }) {
  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    fetchData({ query_type: "get_countries" })
      .then((d) => {
        if (d && d.results) {
          setList(d.results.map((a) => a.country));
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
        renderInput={(params) => <TextField {...params} placeholder="Countries" />}
        onChange={(e, value) => handleChange(value)}
      />
    </Stack>
  );
}
