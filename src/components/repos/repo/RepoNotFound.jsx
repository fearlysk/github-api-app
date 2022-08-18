import React from "react";
import "./repoNotFound.scss";

const RepoNotFound = () => {

    const setCursorPosition = () => {
      document.getElementsByClassName("search-input")[0].focus();
    };

    return (
      <div onClick={setCursorPosition} className="no-repos">
          <h1>No repos found</h1>
      </div>
    )
}

export default RepoNotFound;
