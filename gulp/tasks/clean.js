export default function (config, gulp, tools) {
    gulp.task('clean', function () {
        return tools.clean(config.dist, {read: false});
    });
};
