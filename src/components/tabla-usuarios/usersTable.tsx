import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
  TableSortLabel,
  Button,
  Modal,
} from "@mui/material";
import { columns, initialUsers } from "../../content/usersContent";
import { Delete, Edit } from "@mui/icons-material";
import { AddUserForm } from "../añadir-usuario/newUserForm";
import { Data, UsersTableProps } from "../../content/types";

//user table component
const UsersTable: React.FC<UsersTableProps> = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("");
  const [users, setUsers] = useState<Data[]>([]);
  const [open, setOpen] = React.useState(false);
  const [editUser, setEditUser] = useState<Data | null>(null);

  //open modal for AddUserForm component
  const handleOpen = (user?: Data) => {
    setEditUser(user || null);
    setOpen(true);
  };
  //close modal
  const handleClose = () => {
    setOpen(false);
    setEditUser(null);
  };

  //this hook get all users saved in localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("users") || "[]");
    if (stored.length > 0) {
      setUsers(stored);
    } else {
      setUsers(initialUsers);
    }
  }, []);

  //function to add new user
  const handleAddUser = (user: {
    nombre: string;
    correo: string;
    apellido?: string;
    telefono: string;
    rol: string;
    estado: string;
  }) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, user];
      localStorage.setItem("users", JSON.stringify(updatedUsers)); // Guardar los usuarios en localStorage
      return updatedUsers;
    });
  };

  //function to update users, the comparation is based in telefono different
  const handleUpdateUser = (updatedUser: Data) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user.telefono === updatedUser.telefono ? updatedUser : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers)); // Guardar inmediatamente después de la actualización
      return updatedUsers;
    });
    handleClose();
  };

  //function to ordened asc/desc first column -name in  alphabethic order
  const handleRequestSort = (property: string) => {
    if (property !== "nombre") return;

    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedUsers = (users: Data[]) => {
    return users.sort((a, b) => {
      if (orderBy === "nombre") {
        const aValue = a[orderBy as keyof Data];
        const bValue = b[orderBy as keyof Data];

        if (typeof aValue === "string" && typeof bValue === "string") {
          if (aValue < bValue) return order === "asc" ? -1 : 1;
          if (aValue > bValue) return order === "asc" ? 1 : -1;
        }
      }
      return 0;
    });
  };
  //function to deleted user in the table used localStorage
  const handleDeleteUser = (telefono: string) => {
    const confirmationAlert = window.confirm("Seguro que deseas eliminar?");
    if (confirmationAlert) {
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.filter(
          (user) => user.telefono !== telefono
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return updatedUsers;
      });
    }
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //function to filter by rol user/admin
  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setSelectedRole(event.target.value as string);
  };

  //function to filter by status active/inactive
  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setSelectedStatus(event.target.value as string);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  //function to filter by name/email in searcher
  const filteredUsers = users.filter((user) => {
    const matchesFilter =
      user.nombre.toLowerCase().includes(filter.toLowerCase()) ||
      user.correo.toLowerCase().includes(filter.toLowerCase());

    const matchesRole = selectedRole ? user.rol === selectedRole : true;
    const matchesStatus = selectedStatus
      ? user.estado === selectedStatus
      : true;

    return matchesFilter && matchesRole && matchesStatus;
  });

  return (
    <>
      <Paper elevation={6}>
        <Box sx={{ width: "18%" }}>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Buscar por nombre o correo"
            value={filter}
            onChange={handleFilterChange}
            sx={{ padding: 4 }}
          ></TextField>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            columnGap: "8px",
            rowGap: "8px",
            paddingLeft: 4,
            flexWrap: "wrap",
          }}
        >
          <Select
            variant="standard"
            value={selectedRole}
            onChange={handleRoleChange}
            displayEmpty
            sx={{ minWidth: 120, minHeight: 40 }}
          >
            <MenuItem value="">Rol</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="usuario">Usuario</MenuItem>
          </Select>

          <Select
            variant="standard"
            value={selectedStatus}
            onChange={handleStatusChange}
            displayEmpty
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="">Estatus</MenuItem>
            <MenuItem value="Activo">Activo</MenuItem>
            <MenuItem value="Inactivo">Inactivo</MenuItem>
          </Select>
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={() => handleOpen()}
          >
            Añadir usuario
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              margin: "4% auto",
              overflow: "scroll",
            }}
          >
            <Box sx={{ width: "50%", height: "fit-content" }}>
              <AddUserForm
                addUser={handleAddUser}
                handleClose={handleClose}
                handleUpdateUser={handleUpdateUser}
                userToEdit={editUser}
                title={editUser ? "Editar usuario" : "Añadir usuario"}
              />
            </Box>
          </Modal>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.id === "nombre" ? (
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={() => handleRequestSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    ) : (
                      column.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUsers(filteredUsers)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.telefono}>
                    <TableCell>
                      {user.nombre}
                      {user.apellido}
                    </TableCell>
                    <TableCell>{user.correo}</TableCell>
                    <TableCell>{user.telefono}</TableCell>
                    <TableCell>{user.rol}</TableCell>
                    <TableCell
                      sx={{ color: user.estado === "Activo" ? "green" : "red" }}
                    >
                      {user.estado}
                    </TableCell>
                    <TableCell
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      <IconButton onClick={() => handleOpen(user)}>
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteUser(user.telefono)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
          labelDisplayedRows={({ from, count }) => `${from} de ${count}`}
        />
      </Paper>
    </>
  );
};

export default UsersTable;
