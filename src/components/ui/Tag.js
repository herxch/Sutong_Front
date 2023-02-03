import { Link } from 'react-router-dom';
import classes from './Tag.module.css';

const Tag = (props) => {
  return (
    <Link className={classes.tag} to={props.toValue}>
      {props.text}
    </Link>
  );
};

export default Tag;
