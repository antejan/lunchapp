export default function (config, gulp, tools) {
    gulp.task('karma:watch', function (done) {
        tools.test.karma.watch(done, config.karma);
    });

    gulp.task('karma:run', function (done) {
        tools.test.karma.run(done, config.karma);
    });

    gulp.task('test', ['karma:run']);
    gulp.task('karma', ['karma:watch']);
};
