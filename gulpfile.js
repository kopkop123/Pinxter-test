var gulp = require('gulp'), // Подключаем Gulp
    less = require('gulp-less'), // Подключаем Less пакет
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    // concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    // uglify = require('gulp-uglifyjs') // Подключаем gulp-uglifyjs (для сжатия JS)
    autoprefixer = require('gulp-autoprefixer'), // Подключаем библиотеку для автоматического добавления префиксов
    cssnano = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename = require('gulp-rename'); // Подключаем библиотеку для переименования файлов;
    // imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    // pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    // cache = require('gulp-cache'), // Подключаем библиотеку кеширования
    // pug = require('gulp-pug'), // Подключаем препроцессор для html
    // del = require('del'); // Подключаем библиотеку для удаления файлов и папок

gulp.task('less', function() { // Создаем таск less
    return gulp.src('app/less/index.less') // Берем источник
    .pipe(less())  // Преобразуем Less в CSS посредством gulp-less
    .pipe(autoprefixer({browsers: ['last 15 versions'],  cascade: true })) // Создаем префиксы
    .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
    .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('css-minify-and-rename', ['less'], function() { // Создаем таск css-minify-and-rename
    return gulp.src('app/css/index.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(autoprefixer({browsers: ['last 15 versions'],  cascade: true })) // Создаем префиксы
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css')) // Выгружаем в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

// gulp.task('scripts', function() { // Создаем таск scripts
//     return gulp.src([ // Берем все необходимые библиотеки
//         'app/js/libs/jquery.bxslider.min.js', // Берем Bxslider
//         'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
//     ])
//     .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
//     .pipe(uglify()) // Сжимаем JS файл
//     .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
// });

// gulp.task('pug', function() { // Создаем таск pug
//     return gulp.src('app/templates/*.pug') // Берем источник
//     .pipe(pug()) // Преобразуем Pug в Html посредством gulp-pug
//     .pipe(gulp.dest('app')); // Выгружаем результата в папку app
// });

// gulp.task('browser-sync', function() { // Создаем таск browser-sync
//     browserSync({ // Выполняем browserSync
//         server: { // Определяем параметры сервера
//             baseDir: 'app' // Директория для сервера - app
//         },
//         notify: false // Отключаем уведомления
//     });
// });

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

// gulp.task('clean', function() {
//     return del.sync('dist'); // Удаляем папку dist перед сборкой
// });

// gulp.task('clear', function() {
//     return cache.clearAll(); // Чистим кэш вручную
// });

// gulp.task('img', function() {
//     return gulp.src('app/img/**/*') // Берем все изображения из app
//     .pipe(cache(imagemin({ // Сжимаем их с наилучшими настройками с учетом кеширования
//         interlaced: true,
//         progressive: true,
//         svgoPlugins: [{removeViewBox: false}],
//         use: [pngquant()]
//     })))
//     .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
// });

// gulp.task('watch', ['browser-sync', 'scripts', 'css-minify-and-rename', 'less'], function() { // Создаем таск watch
//     gulp.watch('app/less/**/*.less', ['less', 'css-minify-and-rename']); // Наблюдение за less файлами в папке less
//     gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
//     gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
//     gulp.watch('app/templates/**/*.pug', ['pug'], browserSync.reload); // Наблюдение за Pug файлами в папке templates
// });

gulp.task('watch', ['less', 'browser-sync'], function() { // Создаем таск watch
    gulp.watch('app/less/**/*.less', ['less']); // Наблюдение за less файлами в папке less
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});


// gulp.task('build', ['clean', 'img', 'less', 'scripts'], function() {
//     var buildCss = gulp.src([ // Переносим библиотеки в продакшен
//         'app/css/index.min.css'
//     ])
//     .pipe(gulp.dest('dist/css'));

//     var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
//     .pipe(gulp.dest('dist/fonts'));

//     var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
//     .pipe(gulp.dest('dist/js'));

//     var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
//     .pipe(gulp.dest('dist'));
// });

gulp.task('default', ['watch']); // Дефолтный таск

// Еще нужно добавить задание минификации изображений, очистку кэша, и выгрузку на продакшен
// Инструкция в текстовом формате http://webdesign-master.ru/blog/tools/2016-03-09-gulp-beginners.html
// Инструкция на youtube https://www.youtube.com/watch?v=vW51JUVT66w
