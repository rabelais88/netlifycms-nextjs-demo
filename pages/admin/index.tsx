import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';

const CMS_CONFIG = {};
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <p className="text-gray-500 font-semibold text-xl">Loading...</p>
  </div>
);

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

const CMSInternal: React.FC = () => {
  console.log('cms internal');
  useEffect(() => {
    if (window?.netlifyIdentity) {
      window?.netlifyIdentity.on('init', (user: any) => {
        if (!user) {
          window?.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
    import('netlify-cms-app').then((_CMS: any) => {
      _CMS.init({ CMS_CONFIG });
    });
  }, []);
  return null;
};

const CMS = dynamic(() => Promise.resolve(CMSInternal), {
  ssr: false,
  loading: Loading,
});

const Admin: NextPage = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
      </Head>
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      <CMS />
    </>
  );
};

export default Admin;
