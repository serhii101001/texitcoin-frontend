import type { Member } from 'src/__generated__/graphql';

import { useQuery as useGraphQuery } from '@apollo/client';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';

import { useQuery } from 'src/routes/hooks';

import { formatDate } from 'src/utils/format-time';

import ChartWidget from 'src/components/ChartWidget';

import { FETCH_MEMBER_STATISTICS } from '../query';

interface Props {
  me: Member;
}

export default function Reward({ me }: Props) {
  const [query] = useQuery();

  const { page = { page: 1, pageSize: 10 } } = query;

  const { loading, data } = useGraphQuery(FETCH_MEMBER_STATISTICS, {
    variables: {
      page: page && `${page.page},${page.pageSize}`,
      filter: { memberId: me.id },
      sort: 'issuedAt',
    },
  });

  const memberStatistics = data?.memberStatistics.memberStatistics ?? [];

  return (
    <Grid sx={{ mt: 2 }}>
      <Card>
        <CardHeader title="Reward" />
        <ChartWidget
          loading={loading}
          chart={{
            categories: memberStatistics.map((item) => `${formatDate(item?.issuedAt!)}`).reverse(),
            series: [
              {
                name: 'TXC Shared',
                data: memberStatistics.map((item) => Number(item?.txcShared.toFixed(3))).reverse(),
              },
              {
                name: 'Hash Power',
                data: memberStatistics.map((item) => Number(item?.hashPower.toFixed(3))).reverse(),
              },
            ],
            options: {
              plotOptions: {
                bar: {
                  columnWidth: '80%',
                },
              },
            },
          }}
          height={462}
          type="bar"
          card
        />
      </Card>
    </Grid>
  );
}
