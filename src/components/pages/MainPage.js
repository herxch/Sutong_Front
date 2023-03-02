import MainNav from "../layouts/MainNav";
import { Fragment } from "react";
import Footer from "../layouts/Footer";
//import E3header from './E3header';
//import Programs from './Programs';
//import FeaturedProgram from './FeaturedProgram';
//import Gallery from './Gallery';
//import CTA from './CTA';
//import Map from './Map';
//import AboutE3 from './AboutE3';
//import classes from './MainNav.module.css';

const MainPage = (props) => {
  return (
    <Fragment>
      <MainNav />
      {/* <E3header />
      <AboutE3 />
      <Programs />
   
      <Gallery />
      <CTA />
      <Map /> */}
      <Footer />
    </Fragment>
  );
};

export default MainPage;
