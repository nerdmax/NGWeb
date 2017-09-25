const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');

gulp.task('auto', ['browser-sync'], () => {});

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    files: [
      // 'models/**/*.*',
      'views/**/*.*',
      // 'controllers/**/*.*',
      'public/**/*.*',
      'gulpflag.html'
    ],
    port: 3001,
    notify: true
  });
});
gulp.task('nodemon', (cb) => {
  let started = false;

  return nodemon({
    script: 'app.js',
    nodeArgs: ['--debug'],
    ignore: [
      'gulpfile.js',
      'node_modules/',
      'public/',
      'views/'
    ]
  }).on('start', () => {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
  // .on('restart', () => {
  //   // Wait until the project is ready
  //   setTimeout(() => {
  //     reload({ stream: false });
  //   }, 3000);
  // });
});
