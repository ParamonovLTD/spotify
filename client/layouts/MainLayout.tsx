import React from 'react';
import Navbar from '../components/Navbar';
import { Container } from '@mui/material';
import Player from '../components/Player';
import Head from 'next/head';

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> =
  ({
     title,
     description,
     keywords,
     children
  }) => {
  return (
    <>
      <Head>
        <title>{title || 'Spotify'}</title>
        <meta name="description" content={'Spotify' + description} />
        <meta name="robots" content='index, follow' />
        <meta name="keywords" content={keywords + 'Музыка, РОССИЯ'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Container style={{ marginTop: '90px', paddingBottom: 60 }}>
        {children}
      </Container>
      <Player />
    </>
  );
};

export default MainLayout;