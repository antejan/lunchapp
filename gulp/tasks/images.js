import changed from 'gulp-changed';

export default function (config, gulp) {
    gulp.task('images', function () {
        return gulp.src(config.images.src)
            .pipe(changed(config.images.dest))
            .pipe(gulp.dest(config.images.dest));
    });
};
