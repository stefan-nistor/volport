import PropTypes from 'prop-types';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import Link from 'next/link';

export const ProjectCard = (props) => {
  const { project } = props;

  return (
    <Link href={`/projects/${project.id}`} passHref>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          cursor: 'pointer' // Add cursor pointer to indicate clickability
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pb: 3
            }}
          >
            <Avatar
              src={project.logo}
              variant="square"
            />
          </Box>
          <Typography
            align="center"
            gutterBottom
            variant="h5"
          >
            {project.title}
          </Typography>
          <Typography
            align="center"
            variant="body1"
          >
            {project.description}
          </Typography>
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{ p: 2 }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
          >
            <SvgIcon
              color="action"
              fontSize="small"
            >
              <ClockIcon />
            </SvgIcon>
            <Typography
              color="text.secondary"
              display="inline"
              variant="body2"
            >
              Updated 2hr ago
            </Typography>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
          >
            <SvgIcon
              color="action"
              fontSize="small"
            >
              <UsersIcon />
            </SvgIcon>
            <Typography
              color="text.secondary"
              display="inline"
              variant="body2"
            >
              {project.downloads} Volunteers
            </Typography>
          </Stack>
        </Stack>
      </Card>
      <style jsx global>{`
        a {
          text-decoration: none; // Remove underline effect
        }
      `}</style>
    </Link>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired
};