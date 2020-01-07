import '../styles/bootstrap.css';
import '../styles/fontawesome.css';
import '../styles/dev/prism.css';
import '../styles/dev/devaid.scss';
import '../styles/elegant-font.css';

import { forDeveloper } from '../../config-wazo';

const Layout = forDeveloper ? require('./LayoutDev').default : require('./LayoutPlatform').default;

export default Layout;
