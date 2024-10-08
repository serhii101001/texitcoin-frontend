import { gql } from 'src/__generated__';

export const GENERAL_QUERY = gql(/* GraphQL */ `
  query Query($data: LiveStatsArgs!) {
    liveBlockStats(data: $data) {
      dailyData {
        count
        field
      }
      meta
      total
    }
    liveMiningStats {
      dailyData {
        count
        field
      }
      meta
      total
    }
    liveUserStats(data: $data) {
      dailyData {
        count
        field
      }
      meta
      total
    }
  }
`);

export const FETCH_BLOCKS_QUERY = gql(/* GraphQL */ `
  query Blocks($page: String, $filter: JSONObject, $sort: String) {
    blocks(page: $page, filter: $filter, sort: $sort) {
      blocks {
        id
        blockNo
        hashRate
        difficulty
        issuedAt
        createdAt
        updatedAt
        deletedAt
      }
      total
    }
  }
`);

export const FETCH_STATISTICS_QUERY = gql(/* GraphQL */ `
  query Statistics($page: String, $filter: JSONObject, $sort: String) {
    statistics(page: $page, filter: $filter, sort: $sort) {
      statistics {
        id
        totalHashPower
        newBlocks
        totalBlocks
        totalMembers
        txcShared
        issuedAt
        from
        to
        status
        createdAt
        updatedAt
        deletedAt
      }
      total
    }
  }
`);

export const FETCH_MEMBERSTATISTICS_QUERY = gql(/* GraphQL */ `
  query TXCMemberStatistics($page: String, $filter: JSONObject, $sort: String) {
    memberStatistics(page: $page, filter: $filter, sort: $sort) {
      memberStatistics {
        id
        hashPower
        txcShared
        issuedAt
        percent
        createdAt
        updatedAt
        deletedAt
        member {
          username
          email
          assetId
        }
        statistics {
          newBlocks
          status
        }
      }
      total
    }
  }
`);
