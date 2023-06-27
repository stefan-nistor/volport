import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays } from 'date-fns';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, MenuItem,
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
import { useAuth } from '../hooks/use-auth';

const Page = () => {
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  let [selectedTask, setSelectedTask] = useState(null);

  const [formData, setFormData] = useState({
    id: 0,
    projectId: '',
    name: '',
    startDate: '',
    deadline: '',
    effort: '',
    volunteersIds: [],
    description: ''
  });

  const fetchAllTasks = async () => {
    try {
      const { data } = await httpService.get(`/api/task/completed`, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      setCompletedTasks(data);
    } catch (error) {
      console.error(`Error at fetching project tasks: ${error}`);
    }
  };

  const fetchAssignedVolunteers = async () => {
    try {
      const { data } = await httpService.get('/api/volunteer/assigned', {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      setVolunteers(data);
    } catch (error) {
      console.error('Error fetching volunteers: ', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data } = await httpService.get('/api/project', {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      setProjects(data);
    } catch (error) {
      console.error(`Error at fetching projects: ${error}`);
    }
  };

  const fetchTasks = async (id) => {
    try {
      const { data } = await httpService.get(`/api/task/project/${id}/ongoing`, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      setTasks(data);
    } catch (error) {
      console.error(`Error at fetching project tasks: ${error}`);
    }
  };

  const handleAddButtonClick = () => {
    setFormData({
      id: 0,
      projectId: '',
      name: '',
      startDate: '',
      deadline: '',
      hours: '',
      volunteersIds: [],
      description: ''
    });
    setIsDialogOpen(true);
    fetchProjects();
    setSelectedTask(null);
  };

  const handleSubmit = () => {
    try {

      const updatedTask = { ...selectedTask, effort: formData.hours };
      const postData = JSON.stringify(updatedTask);

      httpService.post('/api/task/', postData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
    } catch (error) {
      console.error(`Error at saving timesheet `, error);
    } finally {
      fetchAllTasks();
      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    fetchAllTasks();
    fetchProjects();
    fetchAssignedVolunteers();
  }, []);

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
                    select
                    label="Project"
                    fullWidth
                    value={formData.projectId}
                    sx={{ m: 1 }}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        projectId: e.target.value
                      });
                    }}
                  >
                    {projects.map((project) => (
                      <MenuItem key={project.id} value={project.id} onClick={() => {
                        fetchTasks(project.id);
                      }}>
                        {`${project.name}`}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Task"
                    fullWidth
                    value={formData.name}
                    sx={{ m: 1 }}
                    onChange={(e) => setFormData({
                      ...formData,
                      name: e.target.value
                    })}
                  >
                    {tasks.map((task) => (
                      <MenuItem key={task.id} value={task.id} onClick={() => {
                        setFormData({ ...formData, name: task.name });
                        setFormData({ ...formData, id: task.id });
                        setSelectedTask(task);
                      }}>
                        {`${task.name}`}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Box sx={{ m: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Start Date"
                        fullWidth
                        sx={{ p: 1 }}
                        value={selectedTask ? selectedTask.startDate : formData.startDate}
                        onChange={(date) => setFormData({ ...formData, startDate: date })}
                        renderInput={(params) => <TextField {...params} />}
                        inputFormat={'dd-MM-yyyy'}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="End Date"
                        fullWidth
                        sx={{ p: 1 }}
                        value={selectedTask ? selectedTask.deadline : formData.deadline}
                        onChange={(date) => setFormData({ ...formData, deadline: date })}
                        renderInput={(params) => <TextField {...params} />}
                        inputFormat={'dd-MM-yyyy'}
                      />
                    </LocalizationProvider>
                  </Box>
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
              </DialogActions>;
            </Dialog>
            <TimesheetTable
              tasks={completedTasks}
              volunteers={volunteers}
              projects={projects}
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
