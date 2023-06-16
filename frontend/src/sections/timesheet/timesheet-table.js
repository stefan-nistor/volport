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
import { getInitials } from 'src/utils/get-initials';
import { SeverityPill } from '../../components/severity-pill';

export const TimesheetTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

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
                  Hours
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((task) => {
                const isSelected = selected.includes(task.id);

                return (
                  <TableRow
                    hover
                    key={task.id}
                    selected={isSelected}
                  >
                    <TableCell>
                      {task.project}
                    </TableCell>
                    <TableCell>
                      {task.name}
                    </TableCell>
                    <TableCell>
                      {task.startDate}
                    </TableCell>
                    <TableCell>
                      {task.endDate}
                    </TableCell>
                    <TableCell>
                      {task.hours}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[task.status]}>
                        {task.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

TimesheetTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
