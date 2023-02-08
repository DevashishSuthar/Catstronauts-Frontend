import React from 'react';
import { useQuery, gql } from '@apollo/client';

import { Layout, QueryResult } from '../components';
import TrackCard from '../containers/track-card';

/** TRACKS gql query to retreive all tracks */
const TRACKS = gql`
  query getTracks{
      tracksForHome{
        id
        title
        thumbnail
        length
        modulesCount
        author{
          name
          photo
        }
      }
  }
`;

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {
  const { loading, error, data } = useQuery(TRACKS);

  return (
    <Layout grid>
      <QueryResult data={data} error={error} loading={loading}>
        {data && data.tracksForHome ?
          (data.tracksForHome.map((track) => (
            <TrackCard key={track.id} track={track} />
          )))
          : null}
      </QueryResult>
    </Layout>
  );
};

export default Tracks;