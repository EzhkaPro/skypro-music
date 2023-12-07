import { Provider } from "react-redux";
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";
import AppRoutes from "./components/routes/routes";
import { AuthContext } from "./components/context/context";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(
      localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : null
    );
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </AuthContext.Provider>
  );
}

export default App;
