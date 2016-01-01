export default function (config, gulp) {
    gulp.task('build', ['html', 'webpack', 'less']);
};

