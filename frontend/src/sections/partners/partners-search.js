import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';

export const PartnersSearch = () => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Search partner"
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
    />
  </Card>
);
