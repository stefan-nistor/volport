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
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/use-auth';
import httpService from '../../utils/http-client';
import { VolunteerTable } from '../../sections/volunteer/volunteer-table';

const Page = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [volunteers, setVolunteers] = useState([]);
  const [partners, setPartners] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchProject();
    fetchVolunteers();
    fetchTasks();
  }, []);

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
                value={project.volunteerIds.length}
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
                value={project.partnerIds.length}
              />
            </Grid>
            <Grid
              xs={12}
              lg={8}
            >
              <OverviewOngoingTasks
                orders={[
                  {
                    id: 'f69f88012978187a6c12897f',
                    ref: 'DEV1049',
                    amount: 30.5,
                    customer: {
                      name: 'Ekaterina Tankova'
                    },
                    createdAt: 1555016400000,
                    status: 'pending',
                    project: 'FII Practic',
                    task: 'Site UI'
                  },
                  {
                    id: '9eaa1c7dd4433f413c308ce2',
                    ref: 'DEV1048',
                    amount: 25.1,
                    customer: {
                      name: 'Cao Yu'
                    },
                    createdAt: 1555016400000,
                    status: 'delivered',
                    project: 'FII Code',
                    task: 'Find Partners'
                  },
                  {
                    id: '01a5230c811bd04996ce7c13',
                    ref: 'DEV1047',
                    amount: 10.99,
                    customer: {
                      name: 'Alexa Richardson'
                    },
                    createdAt: 1554930000000,
                    status: 'refunded',
                    project: 'Balul Bobocilor',
                    task: 'Prepare new-comers'
                  },
                  {
                    id: '1f4e1bd0a87cea23cdb83d18',
                    ref: 'DEV1046',
                    amount: 96.43,
                    customer: {
                      name: 'Anje Keizer'
                    },
                    createdAt: 1554757200000,
                    status: 'pending',
                    project: 'FII IT-ist',
                    task: 'Find goodies'
                  },
                  {
                    id: '9f974f239d29ede969367103',
                    ref: 'DEV1045',
                    amount: 32.54,
                    customer: {
                      name: 'Clarke Gillebert'
                    },
                    createdAt: 1554670800000,
                    status: 'delivered',
                    project: 'FII Practic',
                    task: 'Arrange classrooms'
                  },
                  {
                    id: 'ffc83c1560ec2f66a1c05596',
                    ref: 'DEV1044',
                    amount: 16.76,
                    customer: {
                      name: 'Adam Denisov'
                    },
                    createdAt: 1554670800000,
                    status: 'delivered',
                    project: 'LAN Party',
                    task: 'Prepare game rules'
                  }
                ]}
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
          <VolunteerTable
            count={project.volunteerIds.length}
            items={volunteers}
          />
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