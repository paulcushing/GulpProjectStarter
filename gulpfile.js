// Load plugins
var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({ camelize: true }),
	browserSync = require('browser-sync').create();

// Styles
gulp.task('styles', function() {
  return gulp.src('src/css/styles.scss')
	.pipe(plugins.sass({ style: 'expanded', compass: true }))
	.pipe(plugins.autoprefixer('last 2 versions', 'ie 9', 'ios 6', 'android 4'))
	.pipe(gulp.dest('src/css/'))
	.pipe(plugins.minifyCss({ keepSpecialComments: 1 }))
	.pipe(browserSync.stream())
	.pipe(gulp.dest('dist/css/'))
	.pipe(plugins.notify({ message: 'Styles updated!' }));
});

// Site Scripts
gulp.task('scripts', function() {
  return gulp.src([
  		/* Add whatever scripts you want to include. They're inserted in the order listed. */
  		//'src/js/jquery-3.2.1.min.js',
  		//'src/js/popper.js',
  		//'src/js/bootstrap-4.0.0.js',
  		'src/js/custom.js'  /* Your own JS for inclusion */
  	])
	.pipe(plugins.jshint('.jshintrc'))
	.pipe(plugins.jshint.reporter('default'))
	.pipe(plugins.concat('scripts.js'))
	.pipe(gulp.dest('src/js/'))
	.pipe(plugins.rename("scripts-min.js"))
	.pipe(plugins.uglify())
	.pipe(gulp.dest('dist/js/'))
	.pipe(browserSync.stream())
	.pipe(plugins.notify({ message: 'Scripts updated!' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/*.+(png|jpg|gif)')
	.pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 7, progressive: true, interlaced: true })))
	.pipe(browserSync.stream())
	.pipe(gulp.dest('dist/images/'))
	.pipe(plugins.notify({ message: 'Images updated!' }));
});

// Watch
gulp.task('watch', function() {

	// Watch .scss files
	gulp.watch('src/css/*.scss', ['styles']);

	// Watch .js files
	gulp.watch('src/js/*.js', ['scripts']);

	// Watch image files
	gulp.watch('src/images/*', ['images']);

});

// Static Server + watching scss/html files
gulp.task('serve', ['scripts','styles','images'], function() {

    browserSync.init({
        server: './'
    });

	gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/css/*.scss', ['styles']);
    gulp.watch('src/images/*', ['images']);
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

// Default task
gulp.task('default', ['serve']);