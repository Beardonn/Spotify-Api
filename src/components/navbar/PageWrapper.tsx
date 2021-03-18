import React, { ReactChildren } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../../styles/pageWrapper.scss";

interface IProps {
  children: React.ReactNode;
}

const PageWrapper = ({ children }: IProps) => {
  return (
    <main className='page-wrapper'>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default PageWrapper;
