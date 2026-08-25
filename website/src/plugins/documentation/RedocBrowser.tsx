// Loaded lazily from a BrowserOnly render (redoc cannot run during SSG);
// a real ESM import is required for webpack to interop redoc's browser bundle.
import { RedocStandalone } from 'redoc';

export default RedocStandalone;
