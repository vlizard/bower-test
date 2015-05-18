"use strict";

var gulp = require("gulp");
var babelify = require("babelify");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var jshint = require("gulp-jshint");
var jscs = require("gulp-jscs");
var del = require("del");
var merge = require("merge-stream");

var bundle = function(meta) {
	return browserify({
		entries: meta.entries,
		debug: true
	})
	.transform(babelify)
	.bundle()
	.pipe(source(meta.dest))
	.pipe(gulp.dest("./dist"));
};

gulp.task("build", ["lint", "clean"], function() {
	var source = bundle({
		entries: "./src/index.js",
		dest: "index.js"
	});
	// FIXME: test bundle must not include library itself, only test code
	var tests = bundle({
		entries: [
			"./tests/index.js"
		],
		dest: "tests.js"
	});
	return merge(source, tests);
});

gulp.task("clean", function(cb) {
	del("./dist/**/*", cb);
});

gulp.task("jscs", function() {
	return gulp.src(["gulpfile.js", "src/**/*.js", "tests/**/*.js"])
		.pipe(jscs());
});

gulp.task("jshint", function() {
	return gulp.src(["gulpfile.js", "src/**/*.js", "tests/**/*.js"])
		.pipe(jshint())
		.pipe(jshint.reporter("jshint-stylish"))
		.pipe(jshint.reporter("fail"));
});

gulp.task("lint", ["jshint", "jscs"]);
gulp.task("default", ["build"]);
