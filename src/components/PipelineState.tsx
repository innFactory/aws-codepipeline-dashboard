import * as React from 'react';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import { Paper, Typography } from 'material-ui';
import * as DashboardActions from '../actions/dashboard';
import { LinearProgress } from 'material-ui/Progress';
import { PipelineState as PS } from '../model/model';

export namespace PipelineState {
    export interface Props {
        dashboardActions: typeof DashboardActions;
        pipeline: any;
    }

    export interface State {
        isLoading: boolean;
        pipelineState: PS;
    }
}
const defaultState: PS = { pipelineName: '', state: 'UNKNOWN', stageName: '' };
class PipelineState extends React.Component<WithStyles & PipelineState.Props, PipelineState.State> {

    state = {
        isLoading: true,
        pipelineState: defaultState
    };

    componentDidMount() {
        const { dashboardActions, pipeline } = this.props;
        const interval = getRndInteger(8, 20) * 1000;

        dashboardActions.reloadPipelineState(pipeline.name, (d: PS) => {
            this.setState({ pipelineState: d, isLoading: false });
        });
        setInterval(() =>
            this.setState({ isLoading: true }, () => dashboardActions.reloadPipelineState(pipeline.name, (d: PS) => {
                this.setState({ pipelineState: d, isLoading: false });
                // tslint:disable-next-line:align
            })), interval);
    }

    render() {
        const { classes } = this.props;
        const { isLoading } = this.state;
        return (
            <Paper className={classes.container} style={{ backgroundColor: this.getBackgroundColor() }}>
                {isLoading && <LinearProgress color="secondary" />}
                {this.renderName()}
                {this.renderStage()}
                {this.renderState()}
            </Paper>
        );
    }

    renderName() {
        const { pipelineState } = this.state;

        const name = pipelineState ? pipelineState.pipelineName : '';

        if (name) {
            return (<Typography>{name}</Typography>);
        } else { return null; }
    }

    renderStage() {
        const { pipelineState } = this.state;

        const name = pipelineState ? pipelineState.stageName : '';

        if (name) {
            return (<Typography>{name}</Typography>);
        } else { return null; }
    }

    renderState() {
        const { pipelineState } = this.state;

        const state = pipelineState ? pipelineState.state : '';

        if (state) {
            return (<Typography>{state}</Typography>);
        } else { return null; }
    }

    getBackgroundColor() {
        switch (this.state.pipelineState.state) {
            case 'Failed': return '#f7cdd2';
            case 'InProgress': return '#a6c1ed';
            case 'Succeeded': return '#b5f2b9';
            default: return null;
        }
    }

}

function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const styles: StyleRulesCallback = theme => ({
    container: {
        width: '100%',
        height: '100%'
    },
});

export default withStyles(styles)<PipelineState.Props>(PipelineState);
