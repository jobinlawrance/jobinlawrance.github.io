// Gulp.js configuration
var
    // modules
    gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    newer = require('gulp-newer'),
    htmlclean = require('gulp-htmlclean'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    assets = require('postcss-assets'),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'),
    cssnano = require('cssnano'),
    moduleImporter = require('sass-module-importer'),
    RevAll = require('gulp-rev-all'),
    revReplace = require('gulp-rev-replace'),
    revdel = require('gulp-rev-delete-original'),
    fontmin = require('gulp-fontmin'),
    gutil = require('gulp-util'),
    fileinclude = require('gulp-file-include'),
    gutil = require('gulp-util'),

    // development mode?
    devBuild = (process.env.NODE_ENV !== 'production'),

    // folders
    folder = {
        src: 'src/',
        build: 'build/'
    };

// image processing
gulp.task('images', function () {
    var out = folder.build;

    return gulp.src(folder.src + '/**/*.{jpeg,jpg,png,ico,svg}')
        .pipe(newer(out))
        .pipe(devBuild ? gutil.noop() : imagemin({
            optimizationLevel: 5
        }))
        .pipe(gulp.dest(out));
});

gulp.task('videos', function () {

    var out = folder.build + 'videos/'
    var src = folder.src + 'videos/';

    return gulp.src(src + '**/*.{mp4,webm}')
        .pipe(newer(out))
        .pipe(gulp.dest(out));
})

// HTML processing
gulp.task('html', function () {

    var out = folder.build;

    return gulp.src(folder.src + '/**/*.html')
        .pipe(newer(out))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(devBuild ? gutil.noop() : htmlclean())
        .pipe(gulp.dest(out));
});

// CSS processing
gulp.task('css', function () {

    var postCssOpts = [
        // assets({ loadPaths: ['images/'] }),
        autoprefixer({
            browsers: ['last 2 versions', '> 2%']
        }),
        mqpacker
    ];

    if (!devBuild) {
        postCssOpts.push(cssnano);
    }

    return gulp.src(folder.src + 'scss/*.scss')
        .pipe(sass({
            importer: moduleImporter(),
            outputStyle: 'nested',
            // imagePath: 'images/',
            precision: 3,
            errLogToConsole: true
        }))
        .pipe(postcss(postCssOpts))
        .pipe(gulp.dest(folder.build + 'css/'));

});

gulp.task('revision', gulp.series('css', function () {

    var sources = [folder.build + "**/*.css"]

    if (!devBuild) {
        sources.push(folder.build + "**/*.{mp4,webm}")
    }

    return gulp.src(sources)
        .pipe(RevAll.revision({
            includeFilesInManifest: ['.css', '.js', '.jpg', '.mp4', '.webm']
        }))
        .pipe(revdel())
        .pipe(gulp.dest(folder.build))
        .pipe(RevAll.manifestFile())
        .pipe(gulp.dest(folder.build))
}));

gulp.task("revreplace", gulp.series('revision', function () {
    var manifest = gulp.src("./" + folder.build + "/rev-manifest.json");

    return gulp.src(folder.build + "/**/*.html")
        .pipe(revReplace({
            manifest: manifest,
            replaceInExtensions: ['.js', '.css', '.html', '.hbs', '.jpg', '.png', '.mp4', '.webm']
        }))
        .pipe(gulp.dest(folder.build));
}));

gulp.task('fontmin', function () {
    return gulp.src(folder.src + 'font/*.ttf')
        .pipe(fontmin())
        .pipe(gulp.dest(folder.build + 'fonts'));
});

function getTasks() {
    var tasks = ['fontmin', 'images', 'videos', 'html', 'css'];

    if (!devBuild) {
        tasks.push('revision', 'revreplace');
    }

    return tasks;
};

gulp.task('watch', function() {
    
      // image changes
      gulp.watch(folder.src + 'images/**/*', ['images']);
    
      // html changes
      gulp.watch(folder.src + '/**/*.html', ['html']);
    
      // javascript changes
      gulp.watch(folder.src + 'videos/**/*', ['videos']);
    
      // css changes
      gulp.watch(folder.src + 'scss/**/*', ['css']);
    
    });

gulp.task('run', gulp.series(getTasks()))

gulp.task('default', gulp.series('run'));