import { useMemo } from 'react';
import { useQuery as useGraphQuery } from '@apollo/client';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

import { useQuery } from 'src/routes/hooks';

// import ChartWidget from 'src/components/ChartWidget';
// import CollapsibleTable from 'src/components/CollapsibleTable';

import type { IStatisticsFilters, IStatisticsPrismaFilter } from 'src/types/statistics';

import { Summary } from './Summary';
import { FETCH_BLOCKS_QUERY } from './query';

const defaultFilter: IStatisticsFilters = {
  search: '',
  newBlocks: 0,
  totalBlocks: 0,
  newHashPower: 0,
  totalHashPower: 0,
  members: 0,
};

export default function StatisticsSection() {
  const [query] = useQuery<IStatisticsFilters>();

  const { filter = defaultFilter } = query;

  const graphQueryFilter = useMemo(() => {
    const filterObj: IStatisticsPrismaFilter = {};

    if (filter.search) {
      filterObj.OR = [{}];
    }

    return filterObj;
  }, [filter]);

  const { data: blocksData } = useGraphQuery(FETCH_BLOCKS_QUERY, {
    variables: {
      page: '1,100',
      filter: graphQueryFilter,
      sort: 'blockNo',
    },
  });

  const blocks = blocksData?.blocks ?? { blocks: [], total: 0 };

  console.log('blocks => ', blocks);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Summary />
      </Grid>
      {/* <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <ChartWidget
            key="hashRate"
            title="Hashrate"
            chart={{
              categories: blocks!.blocks!.map((item) => item?.blockNo).reverse(),
              series: [
                {
                  data: [
                    {
                      name: 'Hashrate',
                      data: blocks!
                        .blocks!.map((item) => Math.floor((item?.hashRate! || 1) / 1000000))
                        .reverse(),
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <ChartWidget
            key="difficulty"
            title="Network Difficulty"
            chart={{
              colors: ['#ffb136'],
              categories: blocks!.blocks!.map((item) => item?.blockNo).reverse(),
              series: [
                {
                  data: [
                    {
                      name: 'Pos Difficulty',
                      data: blocks!.blocks!.map((item) => Math.floor(item?.difficulty!)).reverse(),
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <CollapsibleTable />
      </Grid> */}
    </Container>
  );
}
