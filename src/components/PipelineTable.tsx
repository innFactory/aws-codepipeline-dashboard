import * as React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import Checkbox from 'material-ui/Checkbox/Checkbox';
import * as DashboardActions from '../actions/dashboard';

export namespace PipelineTable {
    export interface Props {
        allPipelines: any[];
        pipelinesToObserve: any[];
        dashboardActions: typeof DashboardActions;
    }
}

class PipelineTable extends React.Component<WithStyles & PipelineTable.Props> {

    constructor(props?: (WithStyles & PipelineTable.Props), context?: any) {
        super(props as any, context);
    }

    onRowClick(pipeline: any) {
        const { dashboardActions, pipelinesToObserve } = this.props;

        const index = pipelinesToObserve.findIndex(p => p.name === pipeline.name);

        console.log(index);

        if (index < 0) {
            dashboardActions.setPipelinesToObserve([...pipelinesToObserve, pipeline]);
        } else {
            let tempArray = [...pipelinesToObserve];
            tempArray.splice(index, 1);
            dashboardActions.setPipelinesToObserve(tempArray);
        }
    }

    render() {
        const { classes, pipelinesToObserve, allPipelines } = this.props;

        return (
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Display</TableCell>
                        <TableCell>Pipeline</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allPipelines.map(p => {
                        return (
                            <TableRow
                                key={p.name}
                                hover
                                onClick={event => this.onRowClick(p)}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={pipelinesToObserve.findIndex(pi => pi.name === p.name) >= 0}
                                    />
                                </TableCell>
                                <TableCell>{p.name}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }
}

const styles: StyleRulesCallback = theme => ({
    table: {
        width: '100%',
    },
});

export default withStyles(styles)<PipelineTable.Props>(PipelineTable);