import { FC } from "react";
import Header from "./Header";
import Footer from "./Footer";

export type layoutProps = {
  children: JSX.Element | JSX.Element[];
  headerData: any
};

const Layout : FC <layoutProps> = ({children, headerData}) => {
  return(
    <>
      <Header headerData={headerData} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout