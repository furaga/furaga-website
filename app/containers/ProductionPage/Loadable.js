/**
 *
 * Asynchronously loads the component for ProductionPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
