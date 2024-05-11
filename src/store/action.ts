import { createAction } from '@reduxjs/toolkit';

export enum AppRoute {
  App = '/',
}

const redirectToRoute = createAction<string>('app/redirectToRoute');
export const setError = createAction<string | null>('error/setError');

export { redirectToRoute };