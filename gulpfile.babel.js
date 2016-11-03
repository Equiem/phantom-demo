/**
 *
 *  Phantom Demo
 *
 */

'use strict';

import path from 'path';
import gulp from 'gulp';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import run from 'gulp-run';
const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// Serve task.
gulp.task('serve', () => {
  browserSync({
    notify: true,
    server: 'styleguide',
    port: 3005
  });
});

// Default task:
gulp.task('default', () => {
  runSequence(
    'serve'
  )
});
