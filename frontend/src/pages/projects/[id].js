import Head from 'next/head';

import {
  Box,
  Button,
  CardActions,
  CardHeader,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  SvgIcon,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewUpcomingEvents } from 'src/sections/overview/overview-upcoming-events';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalVolunteers } from 'src/sections/overview/overview-total-volunteers';
import { OverviewTotalPartners } from 'src/sections/overview/overview-total-partners';
import { OverviewDepartmentDistribution } from 'src/sections/overview/overview-department-distribution';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/use-auth';
import httpService from '../../utils/http-client';
import { VolunteerTable } from '../../sections/volunteer/volunteer-table';
import { PartnersTable } from '../../sections/partners/partners-table';
import { ProjectTasks } from '../../sections/projects/project-tasks';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { ProjectTitle } from '../../sections/partners/project-title';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const now = new Date();
let dd = now.getDate();
let mm = now.getMonth() + 1;
const yyyy = now.getFullYear();
if (dd < 10) {
  dd = `0${dd}`;
}

if (mm < 10) {
  mm = `0${mm}`;
}

const Page = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [volunteers, setVolunteers] = useState([]);
  const [allVolunteers, setAllVolunteers] = useState([]);
  const [partners, setPartners] = useState([]);
  const [allPartners, setAllPartners] = useState([]);
  const [tasks, setTasks] = useState([]);
  let [departmentLabels, setDepartmentLabels] = useState([]);
  let [departmentSizes, setDepartmentSizes] = useState([]);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [openVolunteerDialog, setOpenVolunteerDialog] = useState(false);
  const [openPartnerDialog, setOpenPartnerDialog] = useState(false);
  const [deadline, setDeadline] = useState('');
  const [progress, setProgress] = useState(0.0);

  const [taskFormData, setTaskFormData] = useState({
    name: '',
    description: '',
    deadline: `${yyyy}-${mm}-${dd}`,
    startDate: `${yyyy}-${mm}-${dd}`,
    projectId: id,
    volunteerIds: [],
    status: 'unassigned'
  });

  const [volunteerFormData, setVolunteerFormData] = useState({
    volunteerIds: []
  });

  const [partnerFormData, setPartnerFormData] = useState({
    partnerIds: []
  });

  function calculateDepartmentSizes(volunteers, departments) {
    let departmentSizes = {};

    // Initialize department sizes with 0
    departments.forEach((department) => {
      departmentSizes[department.id] = 0;
    });

    // Count the number of volunteers in each department
    volunteers.forEach((volunteer) => {
      const departmentId = volunteer.departmentId;
      if (departmentSizes.hasOwnProperty(departmentId)) {
        departmentSizes[departmentId]++;
      } else {
        console.error(`Invalid departmentId ${departmentId} for volunteer`);
      }
    });

    // Create an array of sizes based on department IDs
    let sizesArray = departments.map((department) => departmentSizes[department.id]);

    return sizesArray;
  }

  const fetchProject = async () => {
    try {
      setLoading(true);
      const { data } = await httpService.get(`/api/project/${id}`, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      console.log(data);
      setProject(data);
      setLoading(false);
    } catch (error) {
      console.log(`Error at fetching project: ${error}`);
    }
  };

  const fetchVolunteers = async () => {
    try {
      setLoading(true);
      const { data } = await httpService.get(`/api/project/${id}/volunteers`, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });

      console.log(data);
      setVolunteers(data);
      setLoading(false);
    } catch (error) {
      console.log(`Error at fetching project volunteers: ${error}`);
    }
  };

  const fetchAllVolunteers = async () => {
    try {
      setLoading(true);
      const { data } = await httpService.get(`/api/volunteer`, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      setAllVolunteers(data);
      setLoading(false);
    } catch (error) {
      console.log(`Error at fetching all volunteers: ${error}`);
    }
  };

  const fetchAllPartners = async () => {
    try {
      setLoading(true);
      const { data } = await httpService.get(`/api/partner`, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      setAllPartners(data);
      setLoading(false);
    } catch (error) {
      console.log(`Error at fetching all partners: ${error}`);
    }
  }

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const { data } = await httpService.get(`/api/project/${id}/partners`, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });

      console.log(data);
      setPartners(data);
      setLoading(false);
    } catch (error) {
      console.log(`Error at fetching project partners: ${error}`);
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await httpService.get(`/api/task/project/${id}/`, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });

      console.log(data);
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.log(`Error at fetching project tasks: ${error}`);
    }
  };

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const { data } = await httpService.get(`/api/project/${id}/departments`, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      setDepartmentLabels(Object.keys(data));
      setDepartmentSizes(Object.values(data));
      setLoading(false);
    } catch (error) {
      console.log('Error fetching department data: ', error);
    }
  };

  const fetchNextDeadline = async () => {
    try {
      const {data} = await httpService.get(`/api/task/deadline/${id}`, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      setDeadline(data);
    } catch (error) {
      console.error('Error fetching next deadline: ', error);
    }
  };
  const fetchProgress = async () => {
    try {
      const {data} = await httpService.get(`/api/task/progress/${id}`, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      setProgress(data);
    } catch (error) {
      console.error('Error fetching department data: ', error);
    }
  };

  useEffect(() => {
    fetchProgress();
    fetchProject();
    fetchPartners();
    fetchVolunteers();
    fetchDepartments();
    fetchTasks();
    fetchAllVolunteers();
    fetchAllPartners();
  }, []);

  const handleAddTask = () => {
    setOpenTaskDialog(true);
  };

  const handleAddVolunteer = () => {
    setOpenVolunteerDialog(true);
  };

  const handleAddPartner = () => {
    setOpenPartnerDialog(true);
  };

  const handleSubmitTask = async () => {
    try {
      if (taskFormData.volunteerIds.length > 0) {
        taskFormData.status = 'inprogress';
      }
      console.log(taskFormData);
      const response = await httpService.post('/api/task', taskFormData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.log('Error saving task: ', error);
    } finally {
      fetchTasks();
      fetchProgress()
      setOpenTaskDialog(false);
    }
  };

  const handleSubmitVolunteer = async () => {
    try {
      const response = await httpService.post(`/api/project/${id}`, volunteerFormData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
    } catch (error) {
      console.log('Error saving task: ', error);
    } finally {
      fetchVolunteers();
      fetchDepartments();
      setOpenVolunteerDialog(false);
    }
  };

  const handleSubmitPartner = async () => {
    try {
      const response = await httpService.post(`/api/project/${id}`, partnerFormData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
    } catch (error) {
      console.log('Error saving task: ', error);
    } finally {
      fetchPartners();
      setOpenPartnerDialog(false);
    }
  }

  return loading ? (<></>) : (
    <>
      <Head>
        <title>
          {project.name} | Volport
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
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <ProjectTitle
                sx={{ height: '100%' }}
                project={project}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalVolunteers
                difference={16}
                positive={false}
                sx={{ height: '100%' }}
                value={volunteers.length}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTasksProgress
                sx={{ height: '100%' }}
                value={progress}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalPartners
                sx={{ height: '100%' }}
                value={partners.length}
              />
            </Grid>
            <Grid
              xs={12}
              lg={8}
            >
              <ProjectTasks
                tasks={tasks}
                volunteers={volunteers}
                sx={{ height: '100%' }}
              />
              <Divider/>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                  color="inherit"
                  endIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon/>
                    </SvgIcon>
                  )}
                  size="small"
                  variant="text"
                  onClick={handleAddTask}
                >
                  Add
                </Button>
              </CardActions>
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <OverviewDepartmentDistribution
                chartSeries={departmentSizes}
                labels={departmentLabels}
                sx={{ height: '100%' }}
              />
            </Grid>
          </Grid>
          <Divider/>
          <Box>
            <CardHeader title="Volunteers"/>
            <VolunteerTable
              count={volunteers.length}
              items={volunteers}
              title="Volunteers"
            />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button
                color="inherit"
                endIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon/>
                  </SvgIcon>
                )}
                size="small"
                variant="text"
                onClick={handleAddVolunteer}
              >
                Add
              </Button>
            </CardActions>
          </Box>
          <Box>
            <CardHeader title="Partners"/>
            <PartnersTable
              count={partners.length}
              items={partners}
              title="Partners"
            />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button
                color="inherit"
                endIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon/>
                  </SvgIcon>
                )}
                size="small"
                variant="text"
                onClick={handleAddPartner}
              >
                Add
              </Button>
            </CardActions>
          </Box>
        </Container>

        <Dialog open={openTaskDialog} onClose={handleSubmitTask}>
          <DialogTitle>Add Task</DialogTitle>
          <DialogContent>
            {/* Form fields */}
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              value={taskFormData.name}
              onChange={(e) => setTaskFormData({ ...taskFormData, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              value={taskFormData.description}
              onChange={(e) => setTaskFormData({ ...taskFormData, description: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Volunteer"
              fullWidth
              select
              value={taskFormData.volunteerIds}
              onChange={(e) => setTaskFormData({ ...taskFormData, volunteerIds: [e.target.value] })}
            >
              {volunteers.map((volunteer) => (
                <MenuItem key={volunteer.id} value={volunteer.id}>
                  {volunteer.firstname + ' ' + volunteer.lastname}
                </MenuItem>
              ))}
            </TextField>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Deadline"
                fullWidth
                sx={{ p: 1 }}
                value={taskFormData.deadline}
                onChange={(date) => setTaskFormData({ ...taskFormData, deadline: date })}
                renderInput={(params) => <TextField {...params} />}
                inputFormat={'yyyy-MM-dd'}
              />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenTaskDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmitTask} variant="contained" color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openVolunteerDialog} onClose={handleSubmitVolunteer}>
          <DialogTitle>Add Volunteer</DialogTitle>
          <DialogContent>
            <Box>
              <TextField
                select
                label="Volunteer"
                fullWidth
                value={volunteerFormData.volunteerIds}
                sx={{ m: 1 }}
                onChange={(e) => setVolunteerFormData({
                  ...volunteerFormData,
                  volunteerIds: [e.target.value]
                })}
              >
                {allVolunteers.map((volunteer) => (
                  <MenuItem key={volunteer.id} value={volunteer.id}>
                    {`${volunteer.firstname} ${volunteer.lastname}`}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenVolunteerDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmitVolunteer} variant="contained"
                    color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openPartnerDialog}>
          <DialogTitle>Add Partner</DialogTitle>
          <DialogContent>
            <Box>
              <TextField
                select
                label="Partner"
                fullWidth
                value={partnerFormData.partnerIds}
                sx={{ m: 1 }}
                onChange={(e) => setPartnerFormData({
                  ...partnerFormData,
                  partnerIds: [e.target.value]
                })}
              >
                {allPartners.map((partner) => (
                  <MenuItem key={partner.id} value={partner.id}>
                    {`${partner.name}`}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPartnerDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmitPartner} variant="contained"
                    color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
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