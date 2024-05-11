import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { rootReducer } from '../root-reducer';
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();
type Reducer = ReturnType<typeof rootReducer>;

const redirect: Middleware<object, Reducer> =
  () => (next) => (action: unknown) => {
    if ((action as PayloadAction<string>).type === 'app/redirectToRoute') {
      const redirectAction = action as PayloadAction<string>;
      browserHistory.push(redirectAction.payload);
    }

    return next(action);
  };

export { redirect };
export default browserHistory;