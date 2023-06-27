import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';

export const TimesheetTable = (props) => {
  const {
    tasks = [],
    volunteers = [],
    projects = []
  } = props;
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


  const statusMap = {
    pending: 'warning',
    approved: 'success',
    declined: 'error'
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Volunteer
                </TableCell>
                <TableCell>
                  Project name
                </TableCell>
                <TableCell>
                  Task name
                </TableCell>
                <TableCell>
                  Start Date
                </TableCell>
                <TableCell>
                  End Date
                </TableCell>
                <TableCell>
                  Effort
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
                      {task.startDate}
                    </TableCell>
                    <TableCell>
                      {task.deadline}
                    </TableCell>
                    <TableCell>
                      {task.effort}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

TimesheetTable.propTypes = {
  tasks: PropTypes.array,
  volunteers: PropTypes.array,
  projects: PropTypes.array
};
