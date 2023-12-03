import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Common from "../Share/Common";
import ShowUsers from "../Pages/ShowUsers";
import UpdateUser from "../Pages/UpdateUser";
import AddUser from "../Pages/AddUser";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Common/>,
      children:[
        {
            path: '/',
            element:<ShowUsers></ShowUsers>,
            loader: ()=> fetch('http://localhost:2000/users')
        },
        {
            path: 'updateUser/:id',
            element: <UpdateUser></UpdateUser>,
            loader: ({params}) => fetch(`http://localhost:2000/users/${params.id}`)
        },
        {
            path: 'addUser',
            element: <AddUser></AddUser>
        }
      ]
    },
  ]);
  export default router