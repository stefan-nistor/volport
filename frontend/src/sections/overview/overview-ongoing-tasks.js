import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

export const OverviewOngoingTasks = (props) => {
  const { tasks = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Ongoing Tasks" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Volunteer
                </TableCell>
                <TableCell>
                  Project Name
                </TableCell>
                <TableCell>
                  Task Name
                </TableCell>
                <TableCell sortDirection="desc">
                  Start date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => {
                const createdAt = format(task.createdAt, 'dd/MM/yyyy');
                return (
                  <TableRow
                    hover
                    key={task.id}
                  >
                    <TableCell>
                      {task.customer.name}
                    </TableCell>
                    <TableCell>
                      {task.project}
                    </TableCell>
                    <TableCell>
                      {task.task}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewOngoingTasks.prototype = {
  tasks: PropTypes.array,
  sx: PropTypes.object
};
