const express = require("express");
const fs = require("fs");
import {API_KEY} from './constants';

const app = express();

app.set("port", process.env.PORT || 3001);

