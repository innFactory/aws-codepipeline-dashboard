import * as React from 'react';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import { RootState } from '../reducers/index';
import * as DashboardActions from '../actions/dashboard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router';
import { PipelineTable } from '../components';
import PipelineState from '../components/PipelineState';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import { Button } from 'material-ui';
import Dialog, { DialogTitle, DialogActions, DialogContent } from 'material-ui/Dialog';

import SettingsIcon from 'material-ui-icons/Settings';

export namespace DashboardPage {
  export interface Props extends RouteComponentProps<void> {
    pipelinesToObserve: any[];
    allPipelines: any[];
    dashboardActions: typeof DashboardActions;
  }

  export interface State {
    showDialog: boolean;
  }
}

class DashboardPage extends React.Component<WithStyles & DashboardPage.Props, DashboardPage.State> {
  state = {
    showDialog: false,
  };

  componentDidMount() {
    this.props.dashboardActions.fetchAllPipelines();
  }

  render() {

    const { classes } = this.props;

    return (
      <div
        className={classes.root}
      >
        {this.renderGrid()}
        {this.renderDialog()}
        <Button
          variant="fab"
          className={classes.fab}
          color="secondary"
          onClick={() => this.setState({ showDialog: true })}
        >
          <SettingsIcon />
        </Button>
      </div>
    );
  }

  renderPipelineState() {
    return this.props.pipelinesToObserve.map((p: any, i: number) => (
      <div key={p.name} style={{ height: 180, width: 150 }}>
        <PipelineState
          key={i}
          pipeline={p}
          dashboardActions={this.props.dashboardActions}
        />
      </div>
    ));
  }

  renderGrid() {
    return (
      <ResponsiveGridLayout
        width={window.innerWidth}
        autoSize
        isResizable={false}
      >
        {this.renderPipelineState()}
      </ResponsiveGridLayout >
    );
  }

  renderDialog() {
    const { pipelinesToObserve, dashboardActions, allPipelines } = this.props;

    return (
      <Dialog
        open={this.state.showDialog}
        onClick={(e) => e.stopPropagation()}
        onClose={() => this.setState({ showDialog: false })}
      >
        <DialogTitle>Select Pipelines</DialogTitle>
        <DialogContent>
          <PipelineTable
            allPipelines={allPipelines}
            pipelinesToObserve={pipelinesToObserve}
            dashboardActions={dashboardActions}
          />
        </DialogContent>
        <DialogActions>
          <Button tabIndex={0} onClick={() => this.setState({ showDialog: false })} color="primary" autoFocus>
            Ok
                    </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const styles: StyleRulesCallback = theme => ({
  root: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%'
  },

  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

function mapStateToProps(state: RootState) {
  return {
    pipelinesToObserve: state.pipelinesToObserve,
    allPipelines: state.allPipelines
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    dashboardActions: bindActionCreators(DashboardActions as any, dispatch)
  };
}

export default (withStyles(styles)<{}>(connect(mapStateToProps, mapDispatchToProps)(DashboardPage)));
