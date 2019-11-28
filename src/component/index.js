import DevIndex from './dev';
import PlatformIndex from './home';

import { isDev } from '../../config-wazo';

const Index = isDev ? DevIndex : PlatformIndex;

export default Index;
