import UserAvatar from '@/components/userAvatar';
import { BASE_URL } from '@/constants/baseUrl';
import { Post } from '@/types/post';
import { Paper, Grid, Divider } from '@mui/material';
import { Fragment } from 'react';

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const getStaticPaths = async () => {
  const posts = await fetch(`${BASE_URL}/posts`).then(data => data.json());
  const paths = posts.map((post: Post) => {
    return { params: { id: String(post.id) } }
  })

  return {
    paths,
    fallback: false,
  }
};

export const getStaticProps = (async (context: { params: { id: string } }) => {
  const id = context.params?.id;
  const post = await fetch(`${BASE_URL}/posts/${id}`).then(data => data.json());
  const comments = await fetch(`${BASE_URL}/posts/${id}/comments`).then(data => data.json());
  return { props: { post, comments } }
});

const PostPage = ({ post, comments }: { post: Post, comments: Comment[] }) => {
  return (
    <div className='pb-10'>
      <h1 className="font-black text-6xl mb-3">Get Inspired by users post</h1>
      <div className="flex flex-wrap gap-2 mt-12 max-w-[50%]">
        <h1 className='font-bold text-2xl'>{post?.title}</h1>
        <p className='font-semibold text-xl'>{post?.body}</p>
        <div className="flex justify-between items-end">
          <p className="font-semibold mr-5">Posted by:</p>
          <UserAvatar seed={String(post?.userId)} />
        </div>
      </div>
      <h2 className='font-semibold text-xl mt-10'>Comments:</h2>
      <Paper className='mt-5 p-5 max-w-[70%]'>
        {comments?.map((comment: Comment, index) => {
          const showDivider = index !== comments.length - 1;
          return (
            <Fragment key={comment.id}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <UserAvatar seed={String(comment.id)} />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4 className='font-medium'>{comment.name}</h4>
                  <h4 className='font-medium mb-5'>{comment.email}</h4>
                  <p style={{ textAlign: "left" }}>{comment.body}</p>
                </Grid>
              </Grid>
              {showDivider && <Divider variant="fullWidth" style={{ margin: "30px 0" }} />}
            </Fragment>
          )
        })}
      </Paper>
    </div>
  );
};

export default PostPage;