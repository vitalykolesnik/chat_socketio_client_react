import React from "react";
import s from "components/Home/Sidebar/sidebar.module.scss";

export const Search = () => {
  return (
    <div className={s.search}>
      <div className={s.searchForm}>
        <input
          type="text"
          placeholder="Find a user..."
        />
      </div>
    </div>
  );
};
