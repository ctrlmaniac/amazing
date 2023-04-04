import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { AxiosResponse } from "axios";
import React from "react";
import api from "~/api";
import Cookies from "js-cookie";

interface Props {
  open: boolean;
  handleOpen: Function;
}

const AccediDialog: React.FC<Props> = ({ open, handleOpen }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const [registerValues, setRegisterValues] = React.useState({
    fname: "",
    lname: "",
  });

  const [showRegisterForm, setShowRegisterForm] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegisterValues({
      ...registerValues,
      [name]: value,
    });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLoginSuccess = (res: AxiosResponse<any, any>) => {
    Cookies.set("token", res.data.token);
    Cookies.set("user-email", res.data.email);
    Cookies.set("user-role", res.data.role);
    handleOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!showRegisterForm) {
      api
        .post("/auth/login", values)
        .then((res) => handleLoginSuccess(res))
        .catch((err) => setShowRegisterForm(true));
    } else {
      const payload = {
        ...values,
        ...registerValues,
      };
      api
        .post("/auth/register", payload)
        .then((res) => handleLoginSuccess(res))
        .catch((err) => console.log(err));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleOpen(false)}
      fullWidth
      maxWidth="xs"
    >
      <form method="post" onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            type="email"
            label="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value="password"
              name="password"
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <IconEye /> : <IconEyeClosed />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          {showRegisterForm && (
            <>
              <TextField
                label="Nome"
                name="fname"
                value={registerValues.fname}
                onChange={handleRegisterChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Cognome"
                name="lname"
                value={registerValues.lname}
                onChange={handleRegisterChange}
                fullWidth
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button type="submit" fullWidth variant="contained">
            Accedi o Registrati
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AccediDialog;
