import * as React from 'react';
import Typography from 'material-ui/Typography';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import { RootState } from '../reducers';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Paper, TextField, Button } from 'material-ui';
import * as DashboardActions from '../actions/dashboard';
import { bindActionCreators } from 'redux';
import { Credentials } from '../model/model';

export namespace LoginPage {
  export interface Props extends RouteComponentProps<void> {
    credentials: Credentials;
    dashboardActions: typeof DashboardActions;
  }

  export interface State {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
  }
}

class LoginPage extends React.Component<WithStyles & LoginPage.Props> {

  state = {
    accessKeyId: '',
    secretAccessKey: '',
    region: ''
  };

  static getDerivedStateFromProps(nextProps: Readonly<WithStyles & LoginPage.Props>) {
    let accessKeyId = nextProps.credentials.accessKeyId ? nextProps.credentials.accessKeyId : '';
    let secretAccessKey = nextProps.credentials.secretAccessKey ? nextProps.credentials.secretAccessKey : '';
    let region = nextProps.credentials.region ? nextProps.credentials.region : '';

    return { accessKeyId, secretAccessKey, region };
  }

  render() {

    const { classes } = this.props;
    const { accessKeyId, secretAccessKey, region } = this.state;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="subheading">AWS Credentials</Typography>
          <TextField
            label="Access Key ID"
            margin="normal"
            fullWidth
            value={accessKeyId}
            onChange={(v) => this.setState({ accessKeyId: v.target.value })}
          />
          <TextField
            label="Secret Access Key"
            margin="normal"
            type="password"
            fullWidth
            value={secretAccessKey}
            onChange={(v) => this.setState({ secretAccessKey: v.target.value })}
          />
          <TextField
            label="Region"
            margin="normal"
            value={region}
            onChange={(v) => this.setState({ region: v.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && this.login()}
          />
          <div className={classes.buttonContainer}>
            <Button className={classes.button} onClick={() => this.login()} variant="raised">Login</Button>
          </div>
        </Paper>
      </div>
    );
  }

  login() {

    const { accessKeyId, secretAccessKey, region } = this.state;

    this.props.dashboardActions.setCredentials({ accessKeyId, secretAccessKey, region });
    this.props.dashboardActions.authenticate();
    this.props.history.push('/dashboard');
  }
}

const styles: StyleRulesCallback = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },

  paper: {
    padding: 20,
  },

  buttonContainer: {
    justifyContent: 'flex-end',
    display: 'flex',
    width: '100%',
    marginTop: 20
  }
});

function mapStateToProps(state: RootState) {
  return {
    credentials: state.credentials
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    dashboardActions: bindActionCreators(DashboardActions as any, dispatch)
  };
}

export default (withStyles(styles)<{}>(connect(mapStateToProps, mapDispatchToProps)(LoginPage)));