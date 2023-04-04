import {
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Cookies from "js-cookie";
import { isEmpty } from "lodash";
import React from "react";
import api from "~/api";
import User from "~/types/User";

interface Props {
  open: boolean;
  handleOpen: Function;
}

const AccountDrawer: React.FC<Props> = ({ open, handleOpen }) => {
  const userId = Cookies.get("user-id");
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    if (!isEmpty(userId)) {
      api
        .get(`/user/${userId}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));
    }
  }, [userId]);

  if (isEmpty(user)) {
    return null;
  }

  return (
    <Drawer open={open} onClose={() => handleOpen(false)} anchor="right">
      <Box sx={{ width: 250 }}>
        {isEmpty(user!.storeId) && (
          <Box p={2}>
            <Button variant="contained" color="secondary" fullWidth>
              vendi su amazing!
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default AccountDrawer;
