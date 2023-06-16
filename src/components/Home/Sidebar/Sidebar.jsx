import React from "react";
import { Navbar } from "components/Home/Sidebar/Navbar/Navbar";
import { Search } from "components/Home/Sidebar/Search/Search";
import { Chats } from "components/Home/Sidebar/Chats/Chats";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
