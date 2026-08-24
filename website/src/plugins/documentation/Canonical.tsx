import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const Canonical = ({ path }: { path: string }) => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Head>
      <link rel="canonical" href={`${siteConfig.url}${path}`} />
    </Head>
  );
};

export default Canonical;
