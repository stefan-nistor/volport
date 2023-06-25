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
import { useState } from 'react';
import { OverviewOngoingTasks } from '../sections/overview/overview-ongoing-tasks';
import { PARTNERS, TASKS, VOLUNTEERS } from '../constants/api';
import { countVolunteersByDepartment } from '../utils/get-dept-size';

const now = new Date();


const Page = () => {

  const { user } = useAuth();
  let [partners, setPartners] = useState([]);

  const fetchPartners = async () => {
    try{
      const { data } = await httpService.get('/partners', {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      console.log(data);
      } catch(error){
      console.log('Error fetching partners: ', error)
    }
  };

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
                date=""
                sx={{ height: '100%' }}
                value="None"
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
                value={VOLUNTEERS.length}
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
                value={PARTNERS.length}
              />
            </Grid>
            <Grid
              xs={12}
              lg={8}
            >
            {/* place list of my tasks*/}
              <OverviewOngoingTasks
                tasks={TASKS}
                sx={{height:'100%'}}
              />

            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <OverviewDepartmentDistribution
                chartSeries={[
                  countVolunteersByDepartment(VOLUNTEERS, 'IT'),
                  countVolunteersByDepartment(VOLUNTEERS, 'PR&M'),
                  countVolunteersByDepartment(VOLUNTEERS, 'Proiecte'),
                  countVolunteersByDepartment(VOLUNTEERS, 'Relații interne'),
                  countVolunteersByDepartment(VOLUNTEERS, 'Relații externe')
                ]}
                labels={['IT', 'PR&M', 'PRO', 'RI', 'RE']}
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
