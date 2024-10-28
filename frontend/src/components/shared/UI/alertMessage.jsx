import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function AlertMessage({severity="info", children, marBot}) {
  return (
    <Stack sx={{ m:6, mb:marBot}} spacing={2}>
      <Alert severity={severity}>{children}</Alert>
    </Stack>
  );
}
