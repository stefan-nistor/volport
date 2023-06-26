import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button,
  Card, CardActions, CardHeader, Divider, SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow, TableSortLabel
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

export const PartnersTable = (props) => {
  const {
    title = "",
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const [expandedRow, setExpandedRow] = useState(null);
  const [sortColumn, setSortColumn] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleRowClick = (index) => {
    setExpandedRow(index === expandedRow ? null : index);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedItems = items.sort((a, b) => {
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

  const isSortColumnActive = (column) => column === sortColumn;
  const getSortDirection = (column) => {
    if (isSortColumnActive(column)) {
      return sortOrder;
    }
    return 'asc';
  };


  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={isSortColumnActive('name')}
                    direction={getSortDirection('name')}
                    onClick={() => handleSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={isSortColumnActive('contact')}
                    direction={getSortDirection('contact')}
                    onClick={() => handleSort('contact')}
                  >
                    Contact
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={isSortColumnActive('fiscalID')}
                    direction={getSortDirection('fiscalID')}
                    onClick={() => handleSort('fiscalID')}
                  >
                    Fiscal ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={isSortColumnActive('bank')}
                    direction={getSortDirection('bank')}
                    onClick={() => handleSort('bank')}
                  >
                    Bank
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={isSortColumnActive('bankAccount')}
                    direction={getSortDirection('bankAccount')}
                    onClick={() => handleSort('bankAccount')}
                  >
                    Bank account
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedItems.map((partner, index) => {
                const isSelected = selected.includes(partner.id);
                return (
                  <React.Fragment key={partner.id}>
                    <TableRow
                      hover
                      onClick={() => handleRowClick(index)}
                      selected={isSelected}
                    >
                      <TableCell>
                        {partner.name}
                      </TableCell>
                      <TableCell>
                        {partner.contact}
                      </TableCell>
                      <TableCell>
                        {partner.fiscalID}
                      </TableCell>
                      <TableCell>
                        {partner.bank}
                      </TableCell>
                      <TableCell>
                        {partner.bankAccount}
                      </TableCell>
                    </TableRow>
                    {expandedRow === index && (
                      <TableRow>
                        <TableCell colSpan={5}>
                          {partner.observations}
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

PartnersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  title: PropTypes.string,
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
