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
  const { tasks = [], sx, volunteers, projects } = props;

  const getVolunteerNames = (volunteerIds) => {
    return volunteerIds.map((volunteerId) => {
      const volunteer = volunteers.find((volunteer) => volunteer.id === volunteerId);
      return volunteer ? (volunteer.firstname + ' ' + volunteer.lastname) : '';
    });
  };

  const getProjectName = (projectId) => {
    const project = projects.find((project) => project.id === projectId);
    return project ? project.name : null;
  }

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
                  Deadline
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => {
                const volunteerName = getVolunteerNames(task.volunteerIds);
                const projectName = getProjectName(task.projectId);
                return (
                  <TableRow
                    hover
                    key={task.id}
                  >
                    <TableCell>
                      {volunteerName}
                    </TableCell>
                    <TableCell>
                      {projectName}
                    </TableCell>
                    <TableCell>
                      {task.name}
                    </TableCell>
                    <TableCell>
                      {task.deadline}
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
  sx: PropTypes.object,
  volunteers: PropTypes.array,
  projects: PropTypes.array,
};
