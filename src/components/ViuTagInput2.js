import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Label } from "reactstrap";

export default function Tags() {
  return (
    <Stack spacing={3} sx={{ width: 150 }}>
      <Autocomplete
        multiple
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} placeholder="year" />}
      />
    </Stack>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "2002", year: 2002 },
  { title: "2003", year: 2003 },
  { title: "2004", year: 2004 },
  { title: "2005", year: 2005 },
  { title: "2006", year: 2006 },
  { title: "2007", year: 2007 },
  { title: "2008", year: 2008 },
  { title: "2009", year: 2009 },
  { title: "2010", year: 2010 },
  { title: "2011", year: 20011 },
  { title: "2012", year: 2012 },
  { title: "2013", year: 2013 },
  { title: "2014", year: 2014 },
  { title: "2016", year: 2016 },
  { title: "2015", year: 2015 },
  { title: "2016", year: 2016 },
  { title: "2017", year: 2017 },
  { title: "2018", year: 2018 },
  { title: "2019", year: 2019 },
  { title: "2020", year: 2020 },
  { title: "2021", year: 2021 },
  { title: "2022", year: 2022 },
];
