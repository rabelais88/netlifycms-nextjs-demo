import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const CMS_CONFIG = {};
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <p className="text-gray-500 font-semibold text-xl">Loading...</p>
  </div>
);

const CMSInternal: React.FC = () => {
  useEffect(() => {
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
  return <CMS />;
};

export default Admin;
