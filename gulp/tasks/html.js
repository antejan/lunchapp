export default function (config, gulp, tools) {
    gulp.task('html', function () {
        return tools
            .html(config.html.src, {
                baseUrl: config.html.baseUrl
            })
            .pipe(gulp.dest(config.html.dest));
    });
};
