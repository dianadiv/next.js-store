import UserAvatar from '@/components/userAvatar';
import { BASE_URL } from '@/constants/baseUrl';
import { Post } from '@/types/post';
import { Paper, Grid, Avatar, Divider } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Comments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comments[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      fetch(`${BASE_URL}/posts/${id}`),
      fetch(`${BASE_URL}/posts/${id}/comments`)
    ])
      .then(async ([postResponse, commentsResponse]) => {
        const post = await postResponse.json();
        const comments = await commentsResponse.json();
        return [post, comments];
      })
      .then(([post, comment]) => {
        setPost(post);
        setComments(comment);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <h1>Loading...</h1>;
 
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
        {comments?.map((comment: Comments, index) => {
          const showDivider = index !== comments.length - 1;
          return (
            <>
              <Grid container wrap="nowrap" spacing={2} key={comment.id}>
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
            </>
          )
        })}
      </Paper>
    </div>
  );
};

export default PostPage;