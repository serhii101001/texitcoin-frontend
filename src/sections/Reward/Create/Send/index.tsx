import { useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/useBoolean';

import ComponentBlock from 'src/components/Component-Block';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { LoadingScreen } from 'src/components/loading-screen';

import { UPDATE_MEMBER_STATISTICS, FETCH_MEMBERSTATISTICS_QUERY } from '../../query';

interface Props {
  date: Date;
}

export default function SendMany({ date }: Props) {
  const confirm = useBoolean();

  const [fetchMemberStatistics, { data }] = useLazyQuery(FETCH_MEMBERSTATISTICS_QUERY, {
    variables: { filter: { issuedAt: date } },
  });

  const [updateMemberStatistics] = useMutation(UPDATE_MEMBER_STATISTICS);

  const memberStatistics = data?.memberStatistics.memberStatistics ?? [];

  const initial = ['sendmany "" "{'];
  const sendmany = [
    ...initial,
    ...memberStatistics!.map(
      (item, index) =>
        `\\"${item?.member?.txcCold}\\": ${item?.txcShared}${index === memberStatistics.length - 1 ? '}"' : ','}`
    ),
  ];

  useEffect(() => {
    setTimeout(() => {
      fetchMemberStatistics();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <Paper>
        <ComponentBlock
          sx={{
            display: 'block',
            alignItems: 'unset',
            overflow: 'auto',
            maxHeight: 800,
            backgroundColor: '#f2f2f2',
          }}
        >
          {sendmany.length === 1 ? (
            // <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
            //   There are no any mined blocks.
            // </Typography>
            <LoadingScreen />
          ) : (
            sendmany.map((item) => <Typography variant="body1">{item}</Typography>)
          )}
        </ComponentBlock>
      </Paper>

      <Stack direction="row" sx={{ mt: 3 }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" onClick={() => confirm.onTrue()}>
          Send
        </Button>
      </Stack>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Confirm"
        content="Are you sure?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              confirm.onFalse();

              if (memberStatistics.length) {
                await updateMemberStatistics({
                  variables: { data: { id: memberStatistics[0]!.statisticsId, status: true } },
                });
              }
            }}
          >
            Confirm
          </Button>
        }
      />
    </>
  );
}
