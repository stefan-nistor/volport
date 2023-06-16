import React, { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  SvgIcon,
  TextField,
  Typography
} from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from 'src/utils/apply-pagination';
import httpService from '../utils/http-client';
import { TimesheetTable } from '../sections/timesheet/timesheet-table';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const now = new Date();

// TODO: Fetch data from API
const data = [
  {
    id: '5e887ac47eed253091be10cb',
    project: 'FII Practic',
    name: 'Call Center',
    startDate: subDays(now, 3).getDate() + '-' + now.getMonth() + '-' + now.getFullYear(),
    endDate: now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear(),
    hours: 8,
    status: 'approved'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    project: 'FII Code',
    name: 'Mentor',
    startDate: subDays(now, 3).getDate() + '-' + now.getMonth() + '-' + now.getFullYear(),
    endDate: now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear(),
    hours: 8,
    status: 'pending'
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    project: 'Balul de Caritate',
    name: 'Cor',
    startDate: subDays(now, 3).getDate() + '-' + now.getMonth() + '-' + now.getFullYear(),
    endDate: now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear(),
    hours: 8,
    status: 'declined'
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    project: 'FII Practic',
    name: 'Mentor',
    startDate: subDays(now, 3).getDate() + '-' + now.getMonth() + '-' + now.getFullYear(),
    endDate: now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear(),
    hours: 8,
    status: 'approved'
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    project: 'FII IT-ist',
    name: 'Supervisior',
    startDate: subDays(now, 3).getDate() + '-' + now.getMonth() + '-' + now.getFullYear(),
    endDate: now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear(),
    hours: 8,
    status: 'approved'
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    project: 'Balul Bobocilor',
    name: 'Tickets',
    startDate: subDays(now, 3).getDate() + '-' + now.getMonth() + '-' + now.getFullYear(),
    endDate: now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear(),
    hours: 8,
    status: 'approved'
  },
];

const useVolunteers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useVolunteerIds = (volunteer) => {
  return useMemo(
    () => {
      return volunteer.map((volunteer) => volunteer.id);
    },
    [volunteer]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const volunteers = useVolunteers(page, rowsPerPage);
  const volunteersIds = useVolunteerIds(volunteers);
  const volunteersSelection = useSelection(volunteersIds);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    projectName: '',
    taskName: '',
    startDate: '',
    endDate: '',
    hours: '',
    // uuid of principal
    doneBy:'',
  });

  const handleAddButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    const postData = JSON.stringify(formData);
    httpService.post('/api/tasks/', postData, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        setIsDialogOpen(false);
      }
    });
  };

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Timesheet | Volport
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Timesheet
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon/>
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon/>
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon/>
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleAddButtonClick}
                >
                  Add
                </Button>
              </div>
            </Stack>
            <Dialog
              open={isDialogOpen} onClose={() => setIsDialogOpen(false)}
            >
              <DialogTitle>Add Task on Timesheet</DialogTitle>
              <DialogContent>
                <Box>
                  <TextField
                    label="Project Name"
                    required={true}
                    fullWidth
                    sx={{ m: 1 }}
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  />
                  <TextField
                    label="Task Name"
                    fullWidth
                    required={true}
                    sx={{ m: 1 }}
                    value={formData.taskName}
                    onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
                  />
                  {
                  //TODO: Fix alignment with date pickers
                  }
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Start Date"
                      required={true}
                      fullWidth
                      sx={{ m: 1 }}
                      value={formData.startDate}
                      onChange={(date) => setFormData({ ...formData, startDate: date })}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="End Date"
                      required={true}
                      fullWidth
                      sx={{ m: 1 }}
                      value={formData.endDate}
                      onChange={(date) => setFormData({ ...formData, endDate: date })}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <TextField
                    label="Hours"
                    type="number"
                    fullWidth
                    required={true}
                    sx={{ m: 1 }}
                    value={formData.hours}
                    onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button color="primary" variant="contained" onClick={(() => handleSubmit())}>
                  Save
                </Button>
              </DialogActions>
            </Dialog>
            <TimesheetTable
              count={data.length}
              items={volunteers}
              onDeselectAll={volunteersSelection.handleDeselectAll}
              onDeselectOne={volunteersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={volunteersSelection.handleSelectAll}
              onSelectOne={volunteersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={volunteersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
