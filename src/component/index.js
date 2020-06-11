import CorporateIndex from './corporate';
import PlatformIndex from './home';

import { corporate } from '../../config-wazo';

const Index = corporate ? CorporateIndex : PlatformIndex;

export default Index;
