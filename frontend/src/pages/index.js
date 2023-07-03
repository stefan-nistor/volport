import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewUpcomingEvents } from 'src/sections/overview/overview-upcoming-events';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalVolunteers } from 'src/sections/overview/overview-total-volunteers';
import { OverviewTotalPartners } from 'src/sections/overview/overview-total-partners';
import { OverviewDepartmentDistribution } from 'src/sections/overview/overview-department-distribution';
import httpService from '../utils/http-client';
import { useAuth } from '../hooks/use-auth';
import { useEffect, useState } from 'react';
import { OverviewOngoingTasks } from '../sections/overview/overview-ongoing-tasks';
import { TASKS } from '../constants/api';

const now = new Date();

const Page = () => {
  const { user } = useAuth();
  let [partnersNum, setPartnersNum] = useState(0);
  let [volunteerNum, setVolunteerNum] = useState(0);
  let [departments, setDepartments] = useState([]);
  let [departmentLabels, setDepartmentLabels] = useState([]);
  let [departmentSizes, setDepartmentSizes] = useState([]);
  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [deadline, setDeadline] = useState('');
  const [progress, setProgress] = useState(0.0);

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
  }

  const fetchPartnersNumber = async () => {
    try {
      const { data } = await httpService.get('/api/partner/number', {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      console.log(data);
      setPartnersNum(data);
    } catch (error) {
      console.error('Error fetching partners number: ', error);
    }
  };

  const fetchVolunteerNumber = async () => {
    try {
      const { data } = await httpService.get('/api/volunteer/number', {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      setVolunteerNum(data);
    } catch (error) {
      console.error('Error fetching volunteer number: ', error);
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

      const sizesPromises = data.map((dept) =>
        httpService.get(`/api/department/size/${dept.id}`, {
          headers: {
            'Authorization': `Bearer ${user.accessToken}`
          }
        })
      );
      const sizesResponses = await Promise.all(sizesPromises);
      const sizes = sizesResponses.map((response) => response.data);
      setDepartmentSizes(sizes);
    } catch (error) {
      console.error('Error fetching department data: ', error);
    }
  };

  const fetchOngoingTasks = async () => {
    try {
      const { data } = await httpService.get('/api/task/ongoing', {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      setOngoingTasks(data);
    } catch (error) {
      console.error('Error fetching department data: ', error);
    }
  };

  const fetchNextDeadline = async () => {
    try {
      const {data} = await httpService.get('/api/task/deadline', {
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
      const {data} = await httpService.get('/api/task/progress', {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      setProgress(data);
    } catch (error) {
      console.error('Error fetching department data: ', error);
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
      console.log('Error fetching department data: ', error);
    }
  }


  useEffect(() => {
    fetchVolunteerNumber();
    fetchPartnersNumber();
    fetchDepartments();
    fetchAssignedVolunteers();
    fetchProjects();
    fetchOngoingTasks();
    fetchNextDeadline();
    fetchProgress();
  }, []);

  return (
    <>
      <Head>
        <title>
          Overview | Volport
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
                sx={{ height: '100%' }}
                value={Object.keys(deadline)[0]}
                date={Object.values(deadline)[0]}
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
                value={volunteerNum}
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
                value={partnersNum}
              />
            </Grid>
            <Grid
              xs={12}
              lg={8}
            >
              {/* place list of my tasks*/}
              <OverviewOngoingTasks
                tasks={ongoingTasks}
                sx={{ height: '100%' }}
                volunteers={volunteers}
                projects={projects}
              />

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
