import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';

export const PartnersTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (index) => {
    setExpandedRow(index === expandedRow ? null : index);
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Contact
                </TableCell>
                <TableCell>
                  Fiscal ID
                </TableCell>
                <TableCell>
                  Bank
                </TableCell>
                <TableCell>
                  Bank account
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((partner, index) => {
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

PartnersTable.propTypes = {
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
