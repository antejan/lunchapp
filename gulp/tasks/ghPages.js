export default function (config, gulp, tools) {
    gulp.task('gh-pages', function () {
        return tools.ghPages(config.distFiles);
    });
};
