import * as React from 'react';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import withRoot from './withRoot';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { Router, Route, RouteComponentProps } from 'react-router';
import { createBrowserHistory } from 'history';
import { RootState } from './reducers/index';
import { connect } from 'react-redux';

export namespace App {
    export interface Props extends RouteComponentProps<void> {
    }

    export interface State {
        mobileOpen: boolean;
    }
}

const history = createBrowserHistory();

class App extends React.Component<WithStyles & App.Props, App.State> {

    state = {
        mobileOpen: true,
    };

    routes = (
        <div className={this.props.classes.content}>
            <Route exact={true} path="/" component={LoginPage} />
            <Route exact={true} path="/login" component={LoginPage} />
            <Route exact={true} path="/dashboard" component={DashboardPage} />
        </div>
    );

    render() {

        return (
            <Router history={history}>
                <div className={this.props.classes.root}>
                    <div className={this.props.classes.appFrame}>
                        {this.routes}
                    </div>
                </div>
            </Router>
        );
    }
}

const styles: StyleRulesCallback = theme => ({
    root: {
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        position: 'absolute',
    },
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
    },
});

function mapStateToProps(state: RootState) {
    return {
    };
}

export default (withRoot(withStyles(styles)<{}>(connect(mapStateToProps)(App))));
