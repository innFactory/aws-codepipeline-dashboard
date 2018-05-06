
export interface Credentials {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
}

export enum ActionType {
    SET_CREDENTIALS,
    SET_PIPELINES_TO_OBSERVE,
    AUTHENTICATE,
    SET_ALL_PIPELINES
}

export interface Action<T> {
    type: ActionType;
    payload: T;
}

export interface PipelineState {
    pipelineName: string;
    stageName: string | 'ALL';
    state: 'InProgress' | 'Succeeded' | 'Failed' | 'UNKNOWN';
}
