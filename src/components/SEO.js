import React from 'react';
import Helmet from 'react-helmet';
import socialImage from '../assets/social.png';

const data = {
  title: 'Beers in the Middle',
  description:
    "Find the best places to meet friends based on everyone's average location!",
  siteUrl: 'https://beersinthemiddle.com',
};

const SEO = () => (
  <Helmet>
    <html lang="en" />
    <meta property="og:image" content={socialImage} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={data.title} />
    <meta property="og:description" content={data.description} />
    <meta property="og:site_name" content={data.title} />
    <meta property="og:url" content={data.siteUrl} />
    <meta name="twitter:site" content="omonk" />
    <meta name="description" content={data.description} />
  </Helmet>
);

export default SEO;
