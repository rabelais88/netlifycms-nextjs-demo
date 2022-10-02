import { GetServerSideProps, NextPage } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

const PostsUid: NextPage = () => {
  return <div></div>;
};

interface IPostsUidProps {}

export const getServerSideProps: GetServerSideProps<IPostsUidProps> = async ({
  params,
}) => {
  const uid = `${params?.uid ?? ''}`;
  const filePath = path.join('content', 'posts', `${uid}.mdx`);
  const content = await fs.readFile(filePath, 'utf8');
  console.log(content);
  return { props: {} };
};

export default PostsUid;
