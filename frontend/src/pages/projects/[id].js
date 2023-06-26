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

const Page = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [volunteers, setVolunteers] = useState([]);
  const [partners, setPartners] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [departmentLabels, setDepartmentLabels] = useState([]);
  let [departments, setDepartments] = useState([]);
  let [departmentSizes, setDepartmentSizes] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  function calculateDepartmentSizes(volunteers, departments) {
    const departmentSizes = {};

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
    const sizesArray = departments.map((department) => departmentSizes[department.id]);

    return sizesArray;
  }

  function handleCloseDialog() {

  };

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
      const { data } = await httpService.get('/api/department', {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      setDepartments(data);

      const labels = data.map((dept) => dept.acronym);
      setDepartmentLabels(labels);
      setDepartmentSizes(calculateDepartmentSizes(volunteers, departments));
    } catch (error) {
      console.log('Error fetching department data: ', error);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchVolunteers();
    fetchPartners();
    fetchTasks();
    fetchDepartments();
  }, []);

  const handleAddTask = () => {
    setOpenDialog(true);
  };

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
              <OverviewUpcomingEvents
                date="22 July 2023"
                sx={{ height: '100%' }}
                value="AG"
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
                value={75.5}
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
              >
                Add
              </Button>
            </CardActions>
          </Box>
        </Container>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Add Task</DialogTitle>
          <DialogContent>
            {/* Form fields */}
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              // Add necessary event handlers and value
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              // Add necessary event handlers and value
            />
            <TextField
              margin="dense"
              label="Deadline"
              fullWidth
              // Add necessary event handlers and value
            />
            <TextField
              margin="dense"
              label="Volunteer"
              fullWidth
              select
              // Add necessary event handlers and value
            >
              {/* Render dropdown options from volunteers */}
              {volunteers.map((volunteer) => (
                <MenuItem key={volunteer.id} value={volunteer.id}>
                  {volunteer.firstname + ' ' + volunteer.lastname}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleCloseDialog} variant="contained" color="primary">
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