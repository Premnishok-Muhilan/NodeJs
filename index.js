//BACKEND SERVER USING EXPRESS.JS
//Fake server uisng variable which holds an array of json objects for the todos.

//Copied from mockapi.io
let todos = [
  {
    createdAt: "2024-08-17T03:37:40.905Z",
    description: 'Gt2Q2"}\\{g',
    status: true,
    id: "2",
  },
  {
    createdAt: "2024-08-16T10:02:23.593Z",
    description: "}F<mN!'z/z",
    status: true,
    id: "3",
  },
  {
    createdAt: "2024-08-17T02:40:51.766Z",
    description: '^hE"=#$q^l',
    status: false,
    id: "4",
  },
  {
    createdAt: "2024-08-17T08:27:37.561Z",
    description: "pNLmy`b[?v",
    status: false,
    id: "5",
  },
  {
    createdAt: "2024-08-17T04:09:01.334Z",
    description: "DEV#jnDcT'",
    status: false,
    id: "6",
  },
  {
    createdAt: "2024-08-17T07:29:24.970Z",
    description: "Y5B'LH\\oo4",
    status: true,
    id: "7",
  },
  {
    createdAt: "2024-08-16T15:56:31.008Z",
    description: "iua|ZU!c$g",
    status: false,
    id: "8",
  },
  {
    createdAt: "2024-08-16T22:34:14.893Z",
    description: "h{wU:'.;b?",
    status: false,
    id: "9",
  },
  {
    createdAt: "2024-08-16T16:54:11.548Z",
    description: ".+$Lz<i0/C",
    status: true,
    id: "10",
  },
  {
    createdAt: "2024-08-17T06:05:32.679Z",
    description: "&1!bVimG9=",
    status: true,
    id: "11",
  },
  {
    createdAt: "2024-08-16T19:50:43.980Z",
    description: "hF\\82Vn@){",
    status: true,
    id: "12",
  },
  {
    createdAt: "2024-08-17T09:06:24.039Z",
    description: '"_)0PolmNq',
    status: false,
    id: "13",
  },
  {
    createdAt: "2024-08-16T20:47:59.181Z",
    description: "=wlVxr{2Nl",
    status: false,
    id: "14",
  },
  {
    createdAt: "2024-08-16T11:30:26.456Z",
    description: "rk#2_.J^:F",
    status: false,
    id: "15",
    name: "New body from update",
  },
  {
    createdAt: "2024-08-16T16:26:26.470Z",
    description: "HTTP POST using Postman",
    status: false,
    id: "16",
  },
];

//import the express module
const express = require("express");
//create an express application
const app = express();

// use the express middleware for parsing json data
//The POST method doesn't work without parsing json data in backend
app.use(express.json());

//Define route handler
//Avoiding this would result in "Cannot GET /" error
app.get("/api/v1", (request, response) => {
  response.send("Hello using experss JS");
});

//Route handler for todos
//GET all todos
app.get("/api/v1/todos", (request, response) => {
  response.json(todos);
  console.log(todos);
});

//GET specific todo with id
app.get("/api/v1/todos/:id", (request, response) => {
  const id = request.params.id;
  const todo = todos.find((todo) => todo.id === id);
  response.json(todo);
});

//POST todo
app.post("/api/v1/todos", (request, response) => {
  //request.body will have the json object from the request
  const todo = request.body;
  console.log(todo);
  todos.push(todo);
  response.json(todo);
});

//PUT todo with id
app.put("/api/v1/todos/:id", (request, response) => {
  const id = request.params.id;
  const todo = todos.find((todo) => todo.id === id);

  todo.description = request.body.description;
  todo.status = request.body.status;

  //Retrieve all todos except the one we need to modify
  const filteredTodos = todos.filter((todo) => todo.id !== id);
  //Add the updated todo to the filteredTodos
  filteredTodos.push(todo);

  //Assign filteredTodos to todos
  //In order for this to work,
  //change from const todo to let todo at the top
  todos = filteredTodos;

  response.json(todo);
});

//DELETE todo with id
app.delete("/api/v1/todos/:id", (request, response) => {
  const id = request.params.id;
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  todos.splice(todoIndex, 1);
  response.json({ message: `Todo ${id} deleted` });
});

//start the server and listen on port
app.listen(3001, () => {
  console.log("Express server listening on port 3001");
});
