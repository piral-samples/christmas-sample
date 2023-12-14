import './style.scss';
import { lazy } from 'react';

export * from './types';

export const MovieTile = lazy(() => import('./MovieTile'));
export const WatchPage = lazy(() => import('./WatchPage'));

