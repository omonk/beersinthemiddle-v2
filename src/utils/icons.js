import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faCoffee,
  faCog,
  faSpinner,
  faQuoteLeft,
  faSquare,
  faCheckSquare,
} from '@fortawesome/free-solid-svg-icons';

export default () =>
  library.add(
    fab,
    faCoffee,
    faCog,
    faSpinner,
    faQuoteLeft,
    faSquare,
    faCheckSquare
  );
