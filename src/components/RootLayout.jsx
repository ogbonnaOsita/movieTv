import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <main>
        <Outlet />
      </main>
      <div className="mt-auto">{/* <Footer /> */}</div>
    </div>
  );
};

export default RootLayout;
