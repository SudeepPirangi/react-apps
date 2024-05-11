import { Outlet } from "react-router-dom";

import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import AppFooter from "./AppFooter";

const Layout = () => {
  return (
    <>
      <header>
        <AppHeader />
      </header>
      <aside>
        <AppSidebar />
      </aside>
      <main>
        <Outlet />
      </main>
      <footer>
        <AppFooter />
      </footer>
    </>
  );
};

export default Layout;
