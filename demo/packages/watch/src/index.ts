import './style.scss';
import { lazy } from 'react';

export type * from './types';

export const MovieTile = lazy(() => import('./MovieTile'));
export const WatchPage = lazy(() => import('./WatchPage'));

