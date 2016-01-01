export default function (config, gulp, tools) {
    gulp.task('default', ['clean'], function (done) {
        console.log('run');
        tools.run('watch', done);
    });
};
