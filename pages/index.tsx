import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Layout from "../components/layout";

const listToMatrix = (list: any[], subArraySize: number) =>
  list.reduce(
    (rows, key, index) =>
      (index % subArraySize == 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows,
    []
  );

export default function Home() {
  const [numRows, setNumRows] = React.useState(2);
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState<string[][]>([]);
  const handleFormat = (input: string) =>
    listToMatrix(input.split("\n"), numRows);

  return (
    <Layout>
      <Box
        component="form"
        padding={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "25rem",
        }}
        noValidate
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          setOutput(handleFormat(input));
        }}
      >
        <TextField
          type="number"
          onChange={(event) => setNumRows(parseInt(event.target.value, 10))}
          variant="outlined"
          sx={{ marginTop: 1 }}
          label="How many rows?"
          value={numRows}
        />
        <TextField
          variant="outlined"
          label="input"
          sx={{ marginTop: 1 }}
          multiline
          maxRows={10}
          minRows={5}
          onChange={(event) => setInput(event.target.value)}
        />
        <Button sx={{ marginTop: 1 }} variant="contained" type="submit">
          Create
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {output.map((row) => (
              <TableRow>
                {row.map((cell) => (
                  <TableCell>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
