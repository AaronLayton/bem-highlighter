var gulp = require("gulp");
var gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins();

gulp.task("lint", function(){
	return gulp.src('bem.js')
		.pipe($.jslint({
			browser : true,
			continue : true,
			devel : true,
			indent : 2,
			maxerr : 50,
			newcap : true,
			momen : true,
			pluspus : true,
			regexp : true,
			sloppy : true,
			vars : false,
			white : true
		}));
});

gulp.task('watch', function () {
	gulp.watch('bem.js', ['lint']);
});

gulp.task("default",['watch']);