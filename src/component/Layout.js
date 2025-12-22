import { corporate } from '../../config-wazo';

import '../styles/bootstrap.css';
import '../styles/fontawesome.css';
import '../styles/prism.css';
import '../styles/elegant-font.css';
import 'mainCSS/index.scss';

const Layout = corporate
  ? require('./LayoutCorporate').default
  : require('./LayoutPlatform').default;

export default Layout;
