/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { User } from "@/types/user";
import { BASE_URL } from "@/constants/baseUrl";
import UserAvatar from "@/components/userAvatar";
import { CircularProgress, Divider, Grid, Paper, Typography } from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import DoneAllIcon from '@mui/icons-material/DoneAll';

interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

const UserDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User>({} as User);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLodaing] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLodaing(true);
    Promise.all([
      fetch(`${BASE_URL}/users/${id}`),
      fetch(`${BASE_URL}/users/${id}/todos`)
    ])
      .then(async ([userResponse, todosResponse]) => {
        const user = await userResponse.json();
        const todos = await todosResponse.json();
        return [user, todos];
      })
      .then(([user, todos]) => {
        setUser(user);
        setTodos(todos);
      })
      .finally(() => setLodaing(false))
  }, [id]);

  if (loading) return (
    <div className="pt-24">
      <CircularProgress size={140} sx={{ margin: 'auto', display: 'flex' }} />
    </div>
  );

  return (
    <div>
      <h1 className="font-black text-6xl mb-3">Get Inspired by User</h1>
      <div className="flex flex-col gap-2 mt-12 max-w-[50%] relative">
        <Typography variant="body2" component="h1" className="font-bold text-2xl">UserName: {user?.username}</Typography>
        <Typography variant="body2" color="text.secondary" className="font-bold text-xl">Name: {user?.name}</Typography>
        <Typography variant="body2" color="text.secondary" className="font-bold text-xl">Email: {user?.email}</Typography>
        <Typography variant="body2" color="text.secondary" className="font-bold text-xl">Address: {user?.address?.city}, {user?.address?.street}</Typography>
        <div className="absolute bottom-0 right-0">
          <UserAvatar seed={String(user?.id)} />
        </div>
      </div>
      <h2 className='font-semibold text-xl mt-10'>Todos:</h2>
      <Paper className='mt-5 p-5 max-w-[50%]'>
        {todos.map((todo: Todo, index) => {
          const showDivider = index !== todos.length - 1;
          return (
            <Fragment key={todo.id}>
              <Grid container wrap="nowrap" spacing={1}>
                <Grid item><CategoryIcon /></Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4 className='font-medium'>{todo.title}</h4>
                  <DoneAllIcon color={todo.completed ? 'success' : 'error'} fontSize="large"/>
                </Grid>
              </Grid>
              {showDivider && <Divider variant="fullWidth" style={{ margin: "5px 0" }} />}
            </Fragment>)
        })}
      </Paper>
    </div>
  )
}

export default UserDetails;