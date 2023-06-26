import Head from 'next/head';

import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewUpcomingEvents } from 'src/sections/overview/overview-upcoming-events';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalVolunteers } from 'src/sections/overview/overview-total-volunteers';
import { OverviewTotalPartners } from 'src/sections/overview/overview-total-partners';
import { OverviewDepartmentDistribution } from 'src/sections/overview/overview-department-distribution';
import { useRouter } from 'next/router';
import { OverviewOngoingTasks } from '../../sections/overview/overview-ongoing-tasks';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/use-auth';
import httpService from '../../utils/http-client';
import { VolunteerTable } from '../../sections/volunteer/volunteer-table';
import { PartnersTable } from '../../sections/partners/partners-table';

const Page = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [volunteers, setVolunteers] = useState([]);
  const [partners, setPartners] = useState([]);
  const [tasks, setTasks] = useState([]);

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

  useEffect(() => {
    fetchProject();
    fetchVolunteers();
    fetchPartners();
    fetchTasks();
  }, []);

  console.log(partners)
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
              <OverviewOngoingTasks
                orders={[]}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <OverviewDepartmentDistribution
                chartSeries={[63, 15, 22, 19, 30]}
                labels={['IT', 'PRM', 'PRO', 'RI', 'RE']}
                sx={{ height: '100%' }}
              />
            </Grid>
          </Grid>
          <Box>
            <VolunteerTable
              count={volunteers.length}
              items={volunteers}
              title="Volunteers"
            />
          </Box>
          <Box>
            <PartnersTable
              count={partners.length}
              items={partners}
              title="Partners"
            />
          </Box>
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