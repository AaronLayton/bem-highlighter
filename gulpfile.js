var gulp = require("gulp");
var gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins();

gulp.task("lint", function(){
	return gulp.src('bem.js')
		.pipe($.jslint());
});