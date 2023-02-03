import MainNav from './MainNav';
import { Fragment } from 'react';
import Footer from './Footer';
//import E3header from './E3header';
//import Programs from './Programs';
//import FeaturedProgram from './FeaturedProgram';
//import Gallery from './Gallery';
//import CTA from './CTA';
//import Map from './Map';
//import AboutE3 from './AboutE3';
//import classes from './MainNav.module.css';

const Layout = (props) => {
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

export default Layout;
