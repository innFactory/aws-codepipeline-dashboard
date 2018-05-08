import { Button } from 'material-ui';
import SettingsIcon from 'material-ui-icons/Settings';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import withStyles, { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import * as React from 'react';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import * as DashboardActions from '../actions/dashboard';
import { PipelineTable } from '../components';
import PipelineState from '../components/PipelineState';
import { RootState } from '../reducers/index';

export namespace DashboardPage {
  export interface Props extends RouteComponentProps<void> {
    pipelinesToObserve: any[];
    allPipelines: any[];
    dashboardActions: typeof DashboardActions;
  }

  export interface State {
    showDialog: boolean;
    layout: Array<any>;
  }
}

class DashboardPage extends React.Component<WithStyles & DashboardPage.Props, DashboardPage.State> {
  state = {
    showDialog: false,
    height: 150,
    layout: new Array<Object>(),
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

    return this.props.pipelinesToObserve.map((p: any, i: number) => {
      var layout = {
        i: p.name,
        minW: 1,
        maxW: 3,
        minH: 1,
        maxH: 3,
        x: 0,
        y: i,
        w: 2,
        h: 1,
        isResizable: true
      };
      return (
        <div
          key={p.name}
          style={{}}
          data-grid={layout}
        >
          <PipelineState
            key={i}
            pipeline={p}
            dashboardActions={this.props.dashboardActions}
          />
        </div>
      );
    });
  }

  renderGrid() {
    return (
      <ResponsiveGridLayout
        width={window.innerWidth}
        isResizable={false}
        useCSSTransforms
        rowHeight={this.state.height}
        isRearrangeable={false}
        preventCollision={true}
        verticalCompact={false}
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
