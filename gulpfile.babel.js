import fs from 'fs';
import path from 'path';
import configFactory from './gulp/config';
import tools from './gulp/tools';
import gulp from 'gulp';

let tasksDirectory = path.join(__dirname, 'gulp/tasks');
let config = configFactory(gulp, tools);

fs.readdirSync(tasksDirectory).forEach(file => {
    let module = require(path.join(tasksDirectory, file));
    module(config, gulp, tools);
});
