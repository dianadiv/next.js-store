import UserAvatar from "@/components/userAvatar";
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from "next/navigation";
import { Post } from "@/types/post";
import { BASE_URL } from "@/constants/baseUrl";

export const getServerSideProps = (async () => {
  const res = await fetch(`${BASE_URL}/posts`)
  const data = await res.json();
  return { props: { data } }
}) satisfies GetServerSideProps<{ data: Post }>

const Posts = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  return (
    <div>
      <h1 className="font-black text-6xl mb-3">Get Inspired</h1>
      <p className="font-normal text-xl block w-8/12">Browsing for your next long-haul trip,everyday journey, or just fancy a a look at what is new?
        From community favourites to abput-to-sell-out items, see them all here</p>
      <div className="flex justify-between flex-wrap gap-2 mt-10">
        {data.map((item: Post) => (
          <Card key={item.id} className="w-[280px] p-2 rounded-md hover:cursor-pointer hover:shadow-2xl flex flex-col justify-between">
            <div>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="/images/post.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h1" className="capitalize">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary" className="capitalize">{item.body.slice(0, 80)} ...</Typography>
              </CardContent>
            </div>
            <div>
              <div className="flex justify-between items-end p-4">
                <p className="font-semibold">Posted by:</p>
                <UserAvatar seed={String(item.userId)} />
              </div>
              <CardActions className="p-3">
                <Button size="small" onClick={() => router.push(`/posts/${item.id}`)}>Read post</Button>
              </CardActions>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Posts;