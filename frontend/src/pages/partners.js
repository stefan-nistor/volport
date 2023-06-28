import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
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
import { PartnersSearch } from '../sections/partners/partners-search';
import { PartnersTable } from '../sections/partners/partners-table';
import httpService from '../utils/http-client';
import { faker } from '@faker-js/faker';
import { useAuth } from '../hooks/use-auth';

function generateVolunteers(numVolunteers) {
  const departments = [
    1, 2, 3, 4, 5
  ];

  const partners = [];
  for (let i = 0; i < numVolunteers; i++) {
    const name = faker.company.name();
    const contact = faker.internet.email();
    const fiscalID = faker.number.int({ min: 10000000, max: 99999999 });
    const bank = faker.company.name();
    const bankAccount = faker.finance.iban();
    const observations = faker.commerce.productDescription();

    const partner = {
      name,
      contact,
      fiscalID,
      bank,
      bankAccount,
      observations
    };
    partners.push(partner);
  }
  return partners;
}

// TODO: fetch data from API
const data = []

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
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const partners = usePartners(page, rowsPerPage);
  const partnersIds = usePartnersIds(partners);
  const partnersSelection = useSelection(partnersIds);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    fiscalID: '',
    bank: '',
    bankAccount: '',
    observations: ''
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const { data } = await httpService.get('/api/partner', {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      console.log(data);
      setPartners(data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching partners: ', error);
    }
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

  const handleAddButtonClick = () => {
    // console.log(JSON.stringify(generateVolunteers(56), null,2))
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      console.log(formData);
      const response = await httpService.post('/api/partner', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      console.log(response);
    } catch (error) {
      console.log('Error saving partner: ', error);
    } finally {
      fetchPartners();
      setIsDialogOpen(false);
    }
  };

  return loading ? (<></>) : (
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
            <PartnersTable
              count={data.length}
              items={data}
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