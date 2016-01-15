var gulp = require('gulp'),
	jade = require('gulp-jade'),
	lessImport = require('gulp-less-import'),
	sourcemaps = require('gulp-sourcemaps'),
	less = require('gulp-less-sourcemap'),
	path = require('path'),
	watch = require('gulp-watch'),
//	minifyCSS = require('gulp-minify-css'),
 	connect = require('gulp-connect'),
	imagemin = require('gulp-imagemin');

gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});

// Compress Task
 gulp.task('compress-img', function() {
	gulp.src('build/img/*')
		.pipe(imagemin({
			progressive: true
		}))
	.pipe(gulp.dest('build/img/'));
});

gulp.task('jade', function() {
	gulp.src('build/jade/page/*.jade')
		.pipe(jade({
			locals: {}
		}))
		.pipe(gulp.dest('src/html/'))
		.pipe(connect.reload());
});

gulp.task('less', function() {
	gulp.src('./build/less/style.less')
		.pipe(sourcemaps.init())
		.pipe(lessImport('./build/less/style.less'))
		.pipe(less({
			sourceMap: {
				sourceMapRootpath: './build/less' // Optional absolute or relative path to your LESS files 
			}
		}))
		.on('error', function(err){ console.log(err.message); })
		.pipe(sourcemaps.write())
		// .pipe(minifyCSS())
		.pipe(gulp.dest('./src/css/'))
		.pipe(connect.reload());
});


gulp.task('watch', function(){
	gulp.watch('build/jade/**/*.jade', ['jade']);
	gulp.watch('build/js/**/*.js', ['jade']);
	gulp.watch('build/**/*.less', ['less']);
});
 
 
gulp.task('default', ['watch','connect', 'compress-img']);
