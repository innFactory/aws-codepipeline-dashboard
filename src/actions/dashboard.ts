import { Action, ActionType, Credentials, PipelineState } from '../model/model';
const AWS = require('aws-sdk');
let codepipeline = new AWS.CodePipeline();

export function setCredentials(credentials: Credentials): Action<Credentials> {

    return {
        type: ActionType.SET_CREDENTIALS,
        payload: credentials
    };
}

export function setPipelinesToObserve(pipelines: any[]): Action<any[]> {

    return {
        type: ActionType.SET_PIPELINES_TO_OBSERVE,
        payload: pipelines
    };
}

export function authenticate() {

    return (dispatch: Function, getState: Function) => auth(getState);
}

function auth(getState: Function) {
    console.log('auth');
    AWS.config = new AWS.Config();
    AWS.config.region = getState().credentials.region;
    AWS.config.update(getState().credentials);
    codepipeline = new AWS.CodePipeline();
}

export function fetchAllPipelines() {
    return (dispatch: Function, getState: Function) => {
        codepipeline.listPipelines({}, (e: any, d: any) => {
            if (e) {
                console.log(e);
                setTimeout(() => auth(getState), 3000);
                setTimeout(() => fetchAllPipelines(), 4000);

            } else {
                dispatch({ type: ActionType.SET_ALL_PIPELINES, payload: d.pipelines });
            }
        });
    };
}

export function reloadPipelineState(pipelineName: string, callback: Function) {

    return (dispatch: Function, getState: Function) => {
        codepipeline.getPipelineState({ name: pipelineName }, (e: any, d: any) => {
            if (e) {
                console.log(e);
                setTimeout(() => auth(getState), 3000);
            } else {
                console.log(d);

                let failed = false;
                let inProgress = false;
                d.stageStates.forEach((state: any) => {
                    if (!failed && !inProgress) {
                        const pipelineState: PipelineState = {
                            pipelineName: d.pipelineName,
                            state: state.latestExecution.status,
                            stageName: state.stageName,
                        };

                        callback(pipelineState);
                    }
                    if (state.latestExecution.status === 'Failed') {
                        failed = true;
                    } else if (state.latestExecution.status === 'InProgress') {
                        inProgress = true;
                    }
                });
            }
        });
    };
}