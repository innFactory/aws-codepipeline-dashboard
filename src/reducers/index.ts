
import { combineReducers } from 'redux';
import * as dashboardReducder from './dashboard';
import { Credentials } from '../model/model';

export interface RootState {
  pipelinesToObserve: any[];
  allPipelines: any[];
  credentials: Credentials;
}

export default combineReducers<RootState>({
  ...dashboardReducder
});