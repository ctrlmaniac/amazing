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
import React from "react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(values);
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

          <FormControl fullWidth variant="outlined">
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
