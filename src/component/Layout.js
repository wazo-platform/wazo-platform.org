import { forDeveloper } from '../../config-wazo';

const Layout = forDeveloper ? require('./LayoutDev').default : require('./LayoutPlatform').default;

export default Layout;
