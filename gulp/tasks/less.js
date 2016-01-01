export default function (config, gulp, tools) {
    gulp.task('less', function () {
        return tools
            .less(config.less.src, config.less.options)
            .pipe(gulp.dest(config.less.dest));
    });
};
