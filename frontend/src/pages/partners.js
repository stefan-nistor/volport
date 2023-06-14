import React, { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container, Dialog, DialogActions,
  DialogContent,
  DialogTitle, FormControl, InputLabel, MenuItem, Select,
  Stack,
  SvgIcon, TextField,
  Typography
} from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { VolunteerTable } from 'src/sections/volunteer/volunteer-table';
import { VolunteerSearch } from 'src/sections/volunteer/volunteer-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { PartnersSearch } from '../sections/partners/partners-search';
import { PartnersTable } from '../sections/partners/partners-table';
import httpService from '../utils/http-client';

const now = new Date();

// TODO: fetch data from API
const data = [
  {
    id: '5e887ac47eed253091be10cb',
    address: {
      city: 'Cleveland',
      country: 'USA',
      state: 'Ohio',
      street: '2849 Fulton Street'
    },
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'carson.darrin@volport.com',
    name: 'Carson Darrin',
    phone: '304-428-3097'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    address: {
      city: 'Atlanta',
      country: 'USA',
      state: 'Georgia',
      street: '1865  Pleasant Hill Road'
    },
    avatar: '/assets/avatars/avatar-fran-perez.png',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: 'fran.perez@volport.com',
    name: 'Fran Perez',
    phone: '712-351-5711'
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    address: {
      city: 'North Canton',
      country: 'USA',
      state: 'Ohio',
      street: '4894  Lakeland Park Drive'
    },
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    email: 'jie.yan.song@volport.com',
    name: 'Jie Yan Song',
    phone: '770-635-2682'
  },
  {
    id: '5e86809283e28b96d2d38537',
    address: {
      city: 'Madrid',
      country: 'Spain',
      name: 'Anika Visser',
      street: '4158  Hedge Street'
    },
    avatar: '/assets/avatars/avatar-anika-visser.png',
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    email: 'anika.visser@volport.com',
    name: 'Anika Visser',
    phone: '908-691-3242'
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    address: {
      city: 'San Diego',
      country: 'USA',
      state: 'California',
      street: '75247'
    },
    avatar: '/assets/avatars/avatar-miron-vitold.png',
    createdAt: subDays(subHours(now, 7), 3).getTime(),
    email: 'miron.vitold@volport.com',
    name: 'Miron Vitold',
    phone: '972-333-4106'
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    address: {
      city: 'Berkeley',
      country: 'USA',
      state: 'California',
      street: '317 Angus Road'
    },
    avatar: '/assets/avatars/avatar-penjani-inyene.png',
    createdAt: subDays(subHours(now, 5), 4).getTime(),
    email: 'penjani.inyene@volport.com',
    name: 'Penjani Inyene',
    phone: '858-602-3409'
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    address: {
      city: 'Carson City',
      country: 'USA',
      state: 'Nevada',
      street: '2188  Armbrester Drive'
    },
    avatar: '/assets/avatars/avatar-omar-darboe.png',
    createdAt: subDays(subHours(now, 15), 4).getTime(),
    email: 'omar.darobe@volport.com',
    name: 'Omar Darobe',
    phone: '415-907-2647'
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    address: {
      city: 'Los Angeles',
      country: 'USA',
      state: 'California',
      street: '1798  Hickory Ridge Drive'
    },
    avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
    createdAt: subDays(subHours(now, 2), 5).getTime(),
    email: 'siegbert.gottfried@volport.com',
    name: 'Siegbert Gottfried',
    phone: '702-661-1654'
  },
  {
    id: '5e8877da9a65442b11551975',
    address: {
      city: 'Murray',
      country: 'USA',
      state: 'Utah',
      street: '3934  Wildrose Lane'
    },
    avatar: '/assets/avatars/avatar-iulia-albu.png',
    createdAt: subDays(subHours(now, 8), 6).getTime(),
    email: 'iulia.albu@volport.com',
    name: 'Iulia Albu',
    phone: '313-812-8947'
  },
  {
    id: '5e8680e60cba5019c5ca6fda',
    address: {
      city: 'Salt Lake City',
      country: 'USA',
      state: 'Utah',
      street: '368 Lamberts Branch Road'
    },
    avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
    createdAt: subDays(subHours(now, 1), 9).getTime(),
    email: 'nasimiyu.danai@volport.com',
    name: 'Nasimiyu Danai',
    phone: '801-301-7894'
  }
];

const usePartners = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const usePartnersIds = (partner) => {
  return useMemo(
    () => {
      return partner.map((partner) => partner.id);
    },
    [partner]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const partners = usePartners(page, rowsPerPage);
  const partnersIds = usePartnersIds(partners);
  const partnersSelection = useSelection(partnersIds);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    fiscalID: '',
    bank: '',
    bankAccount: '',
    observations:''
  });

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

  const handleAddButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    const postData = JSON.stringify(formData);
    httpService.post('/api/partners', postData, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        setIsDialogOpen(false);
      }
    });
  };

  return (
    <>
      <Head>
        <title>
          Partners | Volport
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
                  Partners
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
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
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
                      <PlusIcon />
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
              <DialogTitle>Add Partner</DialogTitle>
              <DialogContent>
                <Box>
                  <TextField
                    label="Name"
                    required={true}
                    fullWidth
                    sx={{ m: 1 }}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <TextField
                    label="Contact"
                    fullWidth
                    required={true}
                    sx={{ m: 1 }}
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  />
                  <TextField
                    label="Fiscal ID"
                    fullWidth
                    required={true}
                    sx={{ m: 1 }}
                    value={formData.fiscalID}
                    onChange={(e) => setFormData({ ...formData, fiscalID: e.target.value })}
                  />
                  <TextField
                    label="Bank"
                    fullWidth
                    required={true}
                    sx={{ m: 1 }}
                    value={formData.bank}
                    onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                  />
                  <TextField
                    label="Bank account"
                    fullWidth
                    required={true}
                    sx={{ m: 1 }}
                    value={formData.bankAccount}
                    onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                  />
                <TextField
                    label="Observations"
                    fullWidth
                    required={false}
                    sx={{ m: 1 }}
                    value={formData.observations}
                    onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
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
            <PartnersSearch />
            <PartnersTable
              count={data.length}
              items={partners}
              onDeselectAll={partnersSelection.handleDeselectAll}
              onDeselectOne={partnersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={partnersSelection.handleSelectAll}
              onSelectOne={partnersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={partnersSelection.selected}
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
