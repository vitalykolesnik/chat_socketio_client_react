import React from "react";
import { Navbar } from "components/Home/Sidebar/Navbar/Navbar";
import { Search } from "components/Home/Sidebar/Search/Search";
import { Chats } from "components/Home/Sidebar/Chats/Chats";
import s from "components/Home/Sidebar/sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={s.sidebar}>
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
