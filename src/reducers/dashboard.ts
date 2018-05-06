import createReducer from './createReducer';
import { Action, ActionType, Credentials } from '../model/model';

export const credentials = createReducer({ accessKeyId: '', secretAccesKey: '', region: '' }, {
    [ActionType.SET_CREDENTIALS](state: Credentials, action: Action<Credentials>) {
        return action.payload;
    },
});

export const pipelinesToObserve = createReducer([], {
    [ActionType.SET_PIPELINES_TO_OBSERVE](state: any[], action: Action<any[]>) {
        return action.payload;
    },
});

export const allPipelines = createReducer([], {
    [ActionType.SET_ALL_PIPELINES](state: any[], action: Action<any[]>) {
        return action.payload;
    },
});
