import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const ProjectTitle = (props) => {
  const { project = {}, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-center"
          direction="row"
          justifyContent="space-between"
          spacing={1}
        >
          <Typography variant="h4">{project.name}</Typography>
          <Avatar
            sx={{
              backgroundColor: '',
              height: 56,
              width: 56
            }}
            src={project.logo}
          >
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

ProjectTitle.propTypes = {
  project: PropTypes.object,
  sx: PropTypes.object
};
