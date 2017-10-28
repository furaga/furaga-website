import { createSelector } from 'reselect';

/**
 * Direct selector to the productionPage state domain
 */
const selectProductionPageDomain = (state) => state.get('productionPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProductionPage
 */

const makeSelectProductionPage = () => createSelector(
  selectProductionPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectProductionPage;
export {
  selectProductionPageDomain,
};
