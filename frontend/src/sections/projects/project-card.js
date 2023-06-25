import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import Link from 'next/link';
import { BriefcaseIcon } from '@heroicons/react/20/solid';

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
            {project.name}
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
              <BriefcaseIcon />
            </SvgIcon>
            <Typography
              color="text.secondary"
              display="inline"
              variant="body2"
            >
              {project.partners} Partners
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
              {project.volunteers} Volunteers
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
