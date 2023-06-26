import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import {
  Avatar,
  Box,
  Card, IconButton,
  CardHeader,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { DEPARTMENTS } from 'src/constants/api';

export const VolunteerTable = (props) => {
  const {
    count = 0,
    items = [],
    selected = [],
    title = ""
  } = props;

  const [sortColumn, setSortColumn] = useState('joinDate');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedItems = useMemo(() => {
    if (sortColumn) {
      return [...items].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
        if (valueA < valueB) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return items;
  }, [items, sortColumn, sortOrder]);

  const handleDelete = (volunteerId) => {
    // Implement the delete operation here using the volunteerId
    // Update the state or make an API call to remove the volunteer from the list
  };

  return (
    <Card>
      <CardHeader title={title} />
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell onClick={() => handleSort('firstname')}>
                  <TableSortLabel
                    active={sortColumn === 'firstname'}
                    direction={sortColumn === 'firstname' ? sortOrder : 'asc'}
                  >
                    First Name
                  </TableSortLabel>
                </TableCell>
                <TableCell onClick={() => handleSort('email')}>
                  <TableSortLabel
                    active={sortColumn === 'email'}
                    direction={sortColumn === 'email' ? sortOrder : 'asc'}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell onClick={() => handleSort('departmentId')}>
                  <TableSortLabel
                    active={sortColumn === 'departmentId'}
                    direction={sortColumn === 'departmentId' ? sortOrder : 'asc'}
                  >
                    Department
                  </TableSortLabel>
                </TableCell>
                <TableCell onClick={() => handleSort('joinDate')}>
                  <TableSortLabel
                    active={sortColumn === 'joinDate'}
                    direction={sortColumn === 'joinDate' ? sortOrder : 'asc'}
                  >
                    Signed Up
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedItems.map((volunteer) => {
                const createdAt = volunteer.joinDate;
                const name = volunteer.firstname + ' ' + volunteer.lastname;
                return (
                  <TableRow key={volunteer.id}>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={volunteer.avatar}>
                          {getInitials(name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {volunteer.email}
                    </TableCell>
                    <TableCell>
                      {DEPARTMENTS.find(department => department.id
                        === volunteer.departmentId)?.name || ''}
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
    </Card>
  );
};

VolunteerTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  title: PropTypes.string
};
