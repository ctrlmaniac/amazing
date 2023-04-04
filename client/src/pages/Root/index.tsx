import React from "react";
import {
  AppBar,
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { IconSearch } from "@tabler/icons-react";

const Root: React.FC = () => {
  const theme = useTheme();

  const [value, setValue] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(value);
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar>
          <Typography variant="h6">amazing</Typography>
          <Box sx={{ flexGrow: 1 }} px={2}>
            <form method="post" onSubmit={handleSearch}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="search">Cerca prodotto</InputLabel>
                <OutlinedInput
                  id="search"
                  value={value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setValue(e.target.value)
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton type="submit" edge="end">
                        <IconSearch />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </form>
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar />
      <Box mx={2} mt={3} mb={12}>
        <Outlet />
      </Box>
    </>
  );
};

export default Root;
