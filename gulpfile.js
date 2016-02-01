
var gulp = require('gulp'),
	jade = require('gulp-jade'),
	lessImport = require('gulp-less-import'),
	sourcemaps = require('gulp-sourcemaps'),
	less = require('gulp-less-sourcemap'),
	path = require('path'),
	watch = require('gulp-watch'),
//	minifyCSS = require('gulp-minify-css'),
 	connect = require('gulp-connect'),
	imagemin = require('gulp-imagemin'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	awspublish = require('gulp-awspublish');
	sitemap = require('gulp-sitemap');

gulp.task('connect', function() {
  connect.server({
    root: 'src/',
    livereload: true
  });
});

// Compress Task
 gulp.task('compress-img', function() {
	gulp.src('build/img/**')
		.pipe(imagemin({
			progressive: true
		}))
	.pipe(gulp.dest('src/img/'));
	gulp.src('build/img/favicon.ico')
		.pipe(gulp.dest('src/'));
});

gulp.task('jade', function() {
	gulp.src('build/jade/page/*.jade')
		.pipe(jade({
			locals: {}
		}))
		.pipe(sitemap({
			siteUrl: 'http://www.flowcontrol.com'
		}))
		.pipe(gulp.dest('src/'))
		.pipe(connect.reload());
});

gulp.task('scripts', function() {
	gulp.src('build/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('src/js'))
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
		.pipe(gulp.dest('src/css/'))
		.pipe(connect.reload());
	gulp.src('./build/css/*.css')
		.pipe(gulp.dest('src/css/'));
});

gulp.task('publish', function() {
	var publisher = awspublish.create({
		params: {
			Bucket: 'flowcontrol.com'
		}
	});
	gulp.src('src/**/*')
		.pipe(publisher.publish())
		.pipe(publisher.cache())
		.pipe(awspublish.reporter())
});

gulp.task('resources', function() {
	gulp.src('./build/resources/**/*')
		.pipe(gulp.dest('src/resources'));
});

gulp.task('watch', function(){
	gulp.watch('build/jade/**/*.jade', ['jade']);
	gulp.watch('build/**/*.less', ['less']);
	gulp.watch('build/js/*.js', ['scripts']);
});

gulp.task('build', ['scripts', 'jade', 'compress-img', 'less', 'resources']);
gulp.task('default', ['scripts', 'jade', 'compress-img', 'less', 'resources','watch','connect']);