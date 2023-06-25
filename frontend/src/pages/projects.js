import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ProjectCard } from 'src/sections/projects/project-card';
import { ProjectsSearch } from 'src/sections/projects/projects-search';
import { useAuth } from '../hooks/use-auth';
import { useEffect, useState } from 'react';
import httpService from '../utils/http-client';

export const projects = [
  {
    id: '2569ce0d517a7f06d3ea1f24',
    createdAt: '27/03/2019',
    description: 'Locul în care inveți alături de oameni pasionați, unde reușești sa manuiești tehnologii actuale si sa îți dezvolți abilitați noi. Într-un cuvânt FII Practic reprezintă DEZVOLTARE!',
    logo: '/assets/logos/logo-fp.png',
    title: 'FII Practic',
    volunteers: '36',
    partners: '22'
  },
  {
    id: 'ed2b900870ceba72d203ec15',
    createdAt: '31/03/2019',
    description: 'FII Code este un concurs la nivel național pentru elevi și studenți în care aceștia își pot etala cunoștințele în algoritmică, tehnologii web si mobile.',
    logo: '/assets/logos/logo-fc.webp',
    title: 'FII Code',
    volunteers: '28',
    partners: '19'
  },
  {
    id: 'a033e38768c82fca90df3db7',
    createdAt: '03/04/2019',
    description: 'Evenimentul aduce in fata voastra specialisti cu impact foarte relevant in industria IT din Iasi.',
    logo: '/assets/logos/logo-fiiitist.webp',
    title: 'FII IT-ist',
    volunteers: '22',
    partners: '11'
  },
  {
    id: '1efecb2bf6a51def9869ab0f',
    createdAt: '04/04/2019',
    description: 'Eveniment caritabil organizat de studenţi pentru a fi alături de cei care au nevoie. Ne place sa aducem zâmbetul pe buze, să citim fericirea în ochii unui copil, să aducem spiritul sărbătorilor in sufletele tuturor.',
    logo: '/assets/logos/logo-bc.webp',
    title: 'Balul de Caritate',
    volunteers: '42',
    partners: '5'
  },
  {
    id: '1ed68149f65fbc6089b5fd07',
    createdAt: '04/04/2019',
    description: 'Pentru că, pe an ce trece, bobocii FII sunt din ce în ce mai talentați și mai frumoși, organizăm in cinstea lor Balul Bobocilor, o petrecere tematică al cărei principal punct de interes este concursul Miss/Mister Boboc.',
    logo: '',
    title: 'Balul Bobocilor',
    volunteers: '19',
    partners: '4'
  },
  {
    id: '5dab321376eff6177407e887',
    createdAt: '04/04/2019',
    description: 'Este o competiție de jocuri in rețea, organizată in fiecare primăvară pentru studenții FII. Pentru câteva zile, laboratoarele sunt cadrul în care toată lumea se distrează, se relaxează și interacționează.',
    logo: '/assets/logos/logo-lanparty.webp',
    title: 'LAN Party',
    volunteers: '17',
    partners: '3'
  }
];

const Page = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await httpService.get('/api/project', {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });

      console.log(data);
      setProjects(data);
      setLoading(false);
    } catch (error) {
      console.log(`Error at fetching projects: ${error}`);
    }
  };

  return loading ? (<></>) : (
    <>
      <Head>
        <title>
          Projects | Volport
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
                  Projects
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                ></Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon/>
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <ProjectsSearch/>
            <Grid
              container
              spacing={3}
            >
              {projects.map((project) => (
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                  key={project.id}
                >
                  <ProjectCard project={project}/>
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Pagination
                count={3}
                size="small"
              />
            </Box>
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
