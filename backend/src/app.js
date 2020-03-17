const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Workspace = require('./models/workspace');
const userRouter = require('./routers/user');
const workspaceRouter = require('./routers/workspace');
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(workspaceRouter);
module.exports = app;