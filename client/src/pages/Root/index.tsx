import React from "react";
import {
  AppBar,
  Badge,
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { IconSearch, IconUser } from "@tabler/icons-react";
import AccediDialog from "./AccediDialog";
import Cookies from "js-cookie";
import { isEmpty } from "lodash";

const Root: React.FC = () => {
  const theme = useTheme();
  const [openAccediDialog, setOpenAccediDialog] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(value);
  };

  const isLoggedIn = Cookies.get("user-email");

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

          <IconButton onClick={() => setOpenAccediDialog(true)}>
            <Badge
              color="secondary"
              variant="dot"
              invisible={!isEmpty(isLoggedIn)}
            >
              <IconUser />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Toolbar />
      <Box mx={2} mt={3} mb={12}>
        <Outlet />
      </Box>

      <AccediDialog open={openAccediDialog} handleOpen={setOpenAccediDialog} />
    </>
  );
};

export default Root;
