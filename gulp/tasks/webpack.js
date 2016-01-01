export default function (config, gulp, tools) {
    gulp.task('webpack', function () {
        return tools.webpack(config.webpack);
    });
};

