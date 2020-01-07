import DevIndex from './dev';
import PlatformIndex from './home';

import { forDeveloper } from '../../config-wazo';

const Index = forDeveloper ? DevIndex : PlatformIndex;

export default Index;
