import classes from './Footer.module.css';

const Footer = () => {
  return (
    <div className={classes.footer}>
      <p>
        © Copyright {new Date().getFullYear()} Sutong China Tire Resources
      </p>
      {/* <p>Designed by Chao Xu</p>{' '} */}
    </div>
  );
};

export default Footer;
