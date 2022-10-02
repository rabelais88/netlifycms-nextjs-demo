import { GetServerSideProps, NextPage } from 'next';
import React, { useEffect } from 'react';
import type { PreviewTemplateComponentProps, CMS } from 'netlify-cms-core';

const _PostsPreviewUid: React.FC<PreviewTemplateComponentProps> = ({
  entry,
}) => {
  const title = entry.getIn(['data', 'title']);
  const date = entry.getIn(['data', 'date']);
  const body = entry.getIn(['data', 'body']);
  return <div>{title}</div>;
};

const PostsPreviewUid: NextPage<IPostsPreviewUid> = ({ uid }) => {
  useEffect(() => {
    let CMS: CMS;
    (async () => {
      const CMS = (await import('netlify-cms-app')).default;
      CMS.init();

      CMS.registerPreviewTemplate('post', _PostsPreviewUid);
    })();
  }, []);
  return <div></div>;
};

interface IPostsPreviewUid {
  uid: string;
}

export const getServerSideProps: GetServerSideProps<IPostsPreviewUid> = async ({
  params,
}) => {
  return { props: { uid: `${params?.uid ?? ''}` } };
};

export default PostsPreviewUid;
