import UserAvatar from "@/components/userAvatar";
import { BASE_URL } from "@/constants/baseUrl";
import { User } from "@/types/user";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { GetServerSideProps } from "next";
import Link from "next/link";

export const getServerSideProps = (async () => {
  const users = await fetch(`${BASE_URL}/users`).then(res => res.json());
  return { props: { users } }
}) satisfies GetServerSideProps<{
  users: User[]
}>

const Users = ({ users }: { users: User[] }) => {
  return (
    <div>
      <h1 className="font-black text-6xl mb-3">Get Inspired by our Users</h1>
      <div className="flex flex-wrap gap-4 mt-10">
        {users.map((user: User) => (
          <Card key={user.id} className="w-[280px] p-2 rounded-md hover:cursor-pointer hover:shadow-2xl flex flex-col justify-between">
            <CardContent className="flex flex-col gap-2">
              <Typography variant="body2" component="h1" className="capitalize font-bold">UserName: {user.username}</Typography>
              <Typography variant="body2" color="text.secondary" className="capitalize">Name: {user.name}</Typography>
              <Typography variant="body2" color="text.secondary" className="capitalize">Email: {user.email}</Typography>
              <Typography variant="body2" color="text.secondary" className="capitalize">Address: {user.address.city}, {user.address.street}</Typography>
            </CardContent>
            <div className="self-end">
              <UserAvatar seed={String(user.id)} />
            </div>
            <Button size="small">
              <Link href={`/users/${user.id}`} passHref>More about user</Link>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Users;