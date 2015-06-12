"use strict";

let gulp = require("gulp");
let babelify = require("babelify");
let browserify = require("browserify");
let source = require("vinyl-source-stream");
let jshint = require("gulp-jshint");
let jscs = require("gulp-jscs");
let del = require("del");
let merge = require("merge-stream");

let bundle = meta => {
	return browserify({
		entries: meta.entries,
		debug: true
	})
	.transform(babelify)
	.bundle()
	.pipe(source(meta.dest))
	.pipe(gulp.dest("./dist"));
};

gulp.task("build", ["lint", "clean"], () => {
	let source = bundle({
		entries: "./src/index.js",
		dest: "index.js"
	});
	// FIXME: test bundle must not include library itself, only test code
	let tests = bundle({
		entries: [
			"./tests/index.js"
		],
		dest: "tests.js"
	});
	return merge(source, tests);
});

gulp.task("clean", cb => {
	del("./dist/**/*", cb);
});

gulp.task("jscs", () => {
	return gulp.src(["gulpfile.js", "src/**/*.js", "tests/**/*.js"])
		.pipe(jscs());
});

gulp.task("jshint", () => {
	return gulp.src(["gulpfile.js", "src/**/*.js", "tests/**/*.js"])
		.pipe(jshint())
		.pipe(jshint.reporter("jshint-stylish"))
		.pipe(jshint.reporter("fail"));
});

gulp.task("lint", ["jshint", "jscs"]);
gulp.task("default", ["build"]);
