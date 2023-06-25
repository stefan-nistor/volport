import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { CalendarIcon } from '@heroicons/react/24/solid';

export const OverviewUpcomingEvents = (props) => {
  const { date = false, sx, value } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Next deadline
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon component={CalendarIcon} />
          </Avatar>
        </Stack>
        {date && (
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ mt: 1 }}
          >
            <Typography>{date}</Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

OverviewUpcomingEvents.propTypes = {
  date: PropTypes.string,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired
};
