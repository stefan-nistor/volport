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
import React, { useState } from 'react';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

const statusMap = {
  inprogress: 'warning',
  completed: 'success',
  unassigned: 'error'
};

export const ProjectTasks = (props) => {
  const {
    tasks = [],
    sx,
    volunteers = [],
  } = props;
  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (index) => {
    setExpandedRow(index === expandedRow ? null : index);
  };

  const getVolunteerNames = (volunteerIds) => {
    return volunteerIds.map((volunteerId) => {
      const volunteer = volunteers.find((volunteer) => volunteer.id === volunteerId);
      return volunteer ? (volunteer.firstname + volunteer.lastname) : '';
    });
  };

  return (
    <Card sx={sx}>
      <CardHeader title="Project Tasks" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Volunteers
                </TableCell>
                <TableCell>
                  Task Name
                </TableCell>
                <TableCell sortDirection="desc">
                  Start date
                </TableCell>
                <TableCell>
                  Deadline
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, index) => {
                const volunteerNames = getVolunteerNames(task.volunteerIds);
                return (
                  <React.Fragment key={task.id}>
                    <TableRow
                      hover
                      onClick={() => handleRowClick(index)}
                    >
                      <TableCell>
                        {volunteerNames.join(' ')}
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
                        <SeverityPill color={statusMap[task.status]}>
                          {task.status}
                        </SeverityPill>
                      </TableCell>
                    </TableRow>
                    {expandedRow === index && (
                      <TableRow>
                        <TableCell colSpan={5}>
                          {task.description}
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

ProjectTasks.propTypes = {
  tasks: PropTypes.array,
  volunteers: PropTypes.array,
  sx: PropTypes.object,
};
