import React, { useState } from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Main from "./Main";

import { TOKEN_KEY } from "../constants";
import { getUsername } from "../utils/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem(TOKEN_KEY) ? true : false
  );

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setIsLoggedIn(false);
  };

  const loggedIn = (token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      setIsLoggedIn(true);
    }
  };

  const username = isLoggedIn ? getUsername(localStorage.getItem(TOKEN_KEY)) : "";

  return (
    <div className="App">
      <ResponsiveAppBar
        isLoggedIn={isLoggedIn}
        username={username}
        handleLogout={logout}
      />
      <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn} />
    </div>
  );
}

export default App;
