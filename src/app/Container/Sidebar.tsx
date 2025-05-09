import React, { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import HomeIcon from "@mui/icons-material/Home";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";

import Font from "@/app/page.module.css";

export default function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openSidebar = () => {
    setIsOpen(true);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleOnRouting = (currentRoute: string) => {
    const routering: {
      [x: string]: string;
    } = {
      HOME: "/",
      "PRAYER TIME": "/prayer-time",
    };
    router.push(routering[currentRoute as string]);
  };

  const Sidebar = (
    <Box sx={{ width: 250 }}>
      <div
        onClick={closeSidebar}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginRight: "17px",
          height: "4rem",
          cursor: "pointer",
          pointerEvents: "auto",
        }}
      >
        <CloseIcon fontSize="medium" sx={{ color: "#808080ba" }} />
      </div>
      <Divider />
      <div>
        {" "}
        <List>
          {["HOME", "PRAYER TIME"].map((text, index) => (
            <ListItem key={text}>
              <ListItemButton
                sx={{ height: "3rem" }}
                onClick={() => handleOnRouting(text)}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <HomeIcon /> : <AccessTimeIcon />}
                </ListItemIcon>
                <p className={Font.montFont} style={{ fontWeight: "600" }}>
                  {text}
                </p>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
      <Divider />
    </Box>
  );
  return (
    <div>
      {" "}
      <MenuRoundedIcon
        fontSize="large"
        sx={{ cursor: "pointer", pointerEvents: "auto" }}
        onClick={openSidebar}
      />
      <Drawer open={isOpen} onClose={closeSidebar}>
        {Sidebar}
      </Drawer>
    </div>
  );
}
