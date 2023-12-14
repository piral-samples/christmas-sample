import * as React from "react";
import Logo from "./Logo";
import Footer from "./Footer";
import GeneralMenu from "./GeneralMenu";
import HeaderItems from "./HeaderItems";
import Loading from "./Loading";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <div className="main-wrapper">
      <header className="Header">
        <Logo />
        <GeneralMenu />
        <HeaderItems />
      </header>
      <React.Suspense fallback={<Loading />}>
        {children}
      </React.Suspense>
    </div>
    <Footer />
  </>
);

export default Layout;
