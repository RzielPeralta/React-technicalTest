import "./App.css";
import { Box, Typography } from "@mui/material";
import UsersTable from "./components/tabla-usuarios/usersTable";
import { useState } from "react";
import { initialUsers } from "./content/usersContent";
import { Data } from "./content/types";

//main component 
function App() {
  const [users, setUsers] = useState<Data[]>(initialUsers);

  return (
    <Box>
      <Typography sx={{ textTransform: "uppercase", textAlign: "center" }}>
        Prueba Técnica React
      </Typography>
      {}
      <Box height={30}></Box>
      <UsersTable users={users} setUsers={setUsers} />
    </Box>
  );
}

export default App;
