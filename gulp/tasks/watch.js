export default function (config, gulp) {
    gulp.task('watch', ['build'], function () {
        gulp.watch(config.html.src, ['html']);
        gulp.watch(['src/less/*.{css,less}', 'src/less/**/*.{css,less}'], ['less']);
    });
};

