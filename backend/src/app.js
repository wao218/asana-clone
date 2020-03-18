const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Workspace = require('./models/workspace');
const Team = require('./models/team');
const userRouter = require('./routers/user');
const workspaceRouter = require('./routers/workspace');
const teamRouter = require('./routers/team');
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(workspaceRouter);
app.use(teamRouter);
module.exports = app;