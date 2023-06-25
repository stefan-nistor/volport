import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  SvgIcon,
  TextField,
  Typography
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { VolunteerTable } from 'src/sections/volunteer/volunteer-table';
import { VolunteerSearch } from 'src/sections/volunteer/volunteer-search';
import httpService from '../utils/http-client';
import { useAuth } from '../hooks/use-auth';

const now = new Date();
const dd = now.getDate();
const mm = now.getMonth() + 1;
const yyyy = now.getFullYear();

const Page = () => {
  const {user} = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);


  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    joinDate: `${yyyy}-${mm}-${dd}`,
    departmentId: '',
  });

  useEffect(() => {
    fetchVolunteers()
  }, [])

  const handleAddButtonClick = () => {
    setIsDialogOpen(true);
  };

  const fetchVolunteers = async () => {
    try {
      const { data } = await httpService.get('/api/volunteer', {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      console.log(data);
      setVolunteers(data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching volunteers: ', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await httpService.post('/api/volunteer', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      console.log(response.data)
    } catch (error) {
      console.log('Error saving volunteer: ', error);
    } finally {
      setIsDialogOpen(false);
      fetchVolunteers();
    }
  };

  return loading ? (<></>) :(
    <>
      <Head>
        <title>
          Volunteers | Volport
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
                  Volunteers
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
              <DialogTitle>Add Volunteer</DialogTitle>
              <DialogContent>
                <Box>
                  <TextField
                    label="First Name"
                    required={true}
                    fullWidth
                    sx={{ m: 1 }}
                    value={formData.firstname}
                    onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                  />
                  <TextField
                    label="Last Name"
                    fullWidth
                    required={true}
                    sx={{ m: 1 }}
                    value={formData.lastname}
                    onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                  />
                  <TextField
                    label="Email Address"
                    fullWidth
                    required={true}
                    sx={{ m: 1 }}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel id="department-label">Department</InputLabel>
                    <Select
                      labelId="department-label"
                      id="department"
                      name="department"
                      required={true}
                      value={formData.departmentId}
                      onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                    >
                      <MenuItem value="">Select Department</MenuItem>
                      <MenuItem value="3">IT</MenuItem>
                      <MenuItem value="5">PR&Media</MenuItem>
                      <MenuItem value="4">Proiecte</MenuItem>
                      <MenuItem value="2">Relații Externe</MenuItem>
                      <MenuItem value="1">Relații Interne</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button color="primary" variant="contained" onClick={(() => handleSubmit())}>
                  Save
                </Button>
              </DialogActions>
            </Dialog>
            <VolunteerSearch/>
            <VolunteerTable
              count={data.length}
              items={data}
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
