import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

interface IPostFrontmatter {
  title: string;
  date: string;
}

const PostsUid: NextPage<IPostsUidProps> = ({ mdxSource, post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <MDXRemote {...mdxSource} />
    </div>
  );
};

interface IPostsUidProps {
  mdxSource: MDXRemoteSerializeResult;
  post: IPostFrontmatter;
}

export const getStaticPaths: GetStaticPaths = async ({}) => {
  const folderPath = path.join(process.cwd(), 'content', 'posts');
  const filePaths = await (
    await fs.readdir(folderPath)
  ).map((filePath) => filePath.slice(0, -3));
  return {
    paths: filePaths.map((fp) => ({ params: { uid: fp } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<IPostsUidProps> = async ({
  params,
}) => {
  const uid = `${params?.uid ?? ''}`;
  const filePath = path.join('content', 'posts', `${uid}.md`);
  const content = await fs.readFile(filePath, 'utf8');
  const { frontmatter, ...mdxSource } = await serialize(content, {
    parseFrontmatter: true,
  });
  const post = frontmatter as unknown as IPostFrontmatter;
  post.date = post.date.toString();
  return { props: { mdxSource, post } };
};

export default PostsUid;
