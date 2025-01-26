import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Avatar,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../../content/schemas";
import { UserFormData } from "../../content/types";
import { AddUserFormProps } from "../../content/types";

//added new user component
export const AddUserForm: React.FC<AddUserFormProps> = ({
  addUser,
  userToEdit,
  title,
}) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  //function to connect API of imgBB with fetch, used method post to upload image profile
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=58e949757b9cdc499088d60e8808cbc7",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.status === 200) {
        //save url img
        setImageUrl(data.data.url);
      } else {
        alert("Error al subir la imagen");
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("Error al subir la imagen");
    }
  };

  //function to send form
  const onSubmit = (data: UserFormData) => {
    console.log("Formulario enviado:", data);

    const user = {
      nombre: data.nombre,
      correo: data.email,
      telefono: data.telefono,
      rol: data.rol,
      estado: "Activo",
      foto: imageUrl,
    };
    addUser(user);

    //saving data in localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    localStorage.setItem("users", JSON.stringify([...existingUsers, user]));

    alert("Datos de formulario almacenados");
    reset();
    setImageUrl(null);
  };

  //this hook charged users edit
  useEffect(() => {
    if (userToEdit) {
      reset({
        nombre: userToEdit.nombre,
        apellido: userToEdit.apellido,
        email: userToEdit.correo,
        telefono: userToEdit.telefono,
        rol: userToEdit.rol,
      });
      setImageUrl(userToEdit.foto || null);
    }
  }, [userToEdit, reset]);

  return (
    <Paper
      elevation={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "auto",
        height: "auto",
        borderRadius: "4px",
        padding: "28px",
      }}
    >
      <Typography variant="h4" fontWeight={500} sx={{ marginBottom: 3 }}>
        {title}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            columnGap: 4,
            rowGap: 2,
          }}
        >
          <Box
            sx={{
              flex: 0.5,
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              margin: "auto",
              flexDirection: "column",
              rowGap: 2,
            }}
          >
            <Avatar
              sx={{ bgcolor: "purple", height: 105, width: 105 }}
              src={imageUrl || undefined} // Muestra la imagen si está cargada
            />
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              component="label"
            >
              Cargar foto
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </Button>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography>Datos Personales</Typography>
            <InputLabel sx={{ flexDirection: "column", display: "flex" }}>
              Nombre:
              <TextField
                size="small"
                {...register("nombre")}
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
              />
            </InputLabel>
            <InputLabel sx={{ flexDirection: "column", display: "flex" }}>
              Segundo nombre:
              <TextField size="small" {...register("segundoNombre")} />
            </InputLabel>
            <InputLabel sx={{ flexDirection: "column", display: "flex" }}>
              Apellido:
              <TextField
                size="small"
                {...register("apellido")}
                error={!!errors.apellido}
                helperText={errors.apellido?.message}
              />
            </InputLabel>
            <InputLabel sx={{ flexDirection: "column", display: "flex" }}>
              Correo Electrónico:
              <TextField
                size="small"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </InputLabel>
            <InputLabel sx={{ flexDirection: "column", display: "flex" }}>
              Número de Teléfono:
              <TextField
                size="small"
                {...register("telefono")}
                error={!!errors.telefono}
                helperText={errors.telefono?.message}
              />
            </InputLabel>
            <InputLabel sx={{ flexDirection: "column", display: "flex" }}>
              Rol:
              <Select size="small" {...register("rol")} error={!!errors.rol}>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="usuario">Usuario</MenuItem>
              </Select>
              {errors.rol && (
                <span
                  style={{ color: "#DC143C", fontSize: 12, marginLeft: 16 }}
                >
                  {errors.rol?.message}
                </span>
              )}
            </InputLabel>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography>Datos de Domicilio</Typography>
            <InputLabel sx={{ flexDirection: "column", display: "flex" }}>
              Calle:
              <TextField
                size="small"
                {...register("calle")}
                error={!!errors.calle}
                helperText={errors.calle?.message}
              />
            </InputLabel>
            <InputLabel sx={{ flexDirection: "column", display: "flex" }}>
              Número:
              <TextField
                size="small"
                {...register("numero")}
                error={!!errors.numero}
                helperText={errors.numero?.message}
              />
            </InputLabel>
            <InputLabel sx={{ flexDirection: "column", display: "flex" }}>
              Barrio:
              <TextField
                size="small"
                {...register("barrio")}
                error={!!errors.barrio}
                helperText={errors.barrio?.message}
              />
            </InputLabel>
            <InputLabel sx={{ flexDirection: "column", display: "flex" }}>
              Ciudad:
              <TextField
                size="small"
                {...register("ciudad")}
                error={!!errors.ciudad}
                helperText={errors.ciudad?.message}
              />
            </InputLabel>
            <InputLabel sx={{ flexDirection: "column", display: "flex" }}>
              Código Postal:
              <TextField
                size="small"
                {...register("codigoPostal")}
                error={!!errors.codigoPostal}
                helperText={errors.codigoPostal?.message}
              />
            </InputLabel>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            alignContent: "right",
            padding: 2,
          }}
        >
          <Button variant="contained" color="secondary" type="submit">
            Añadir
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
