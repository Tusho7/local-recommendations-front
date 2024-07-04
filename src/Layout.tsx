import Footer from "./components/Footer";
import Header from "./components/Header";
import { LayoutProps } from "./types/layoutProps";

const Layout = ({ children, mainClassname }: LayoutProps) => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <Header />
      <main className={mainClassname}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
