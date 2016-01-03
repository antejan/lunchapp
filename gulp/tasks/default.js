export default function (config, gulp, tools) {
    gulp.task('default', ['clean'], function (done) {
        tools.run('watch', done);
    });
};
