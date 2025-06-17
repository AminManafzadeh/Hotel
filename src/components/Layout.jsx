import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <footer>footer</footer>
    </div>
  );
}

export default Layout;
