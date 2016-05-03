module.exports = function(grunt) {

  // LiveReload的默认端口号，你也可以改成你想要的端口号
  var lrPort = 35729;
  // 使用connect-livereload模块，生成一个与LiveReload脚本
  // <script src="http://127.0.0.1:35729/livereload.js?snipver=1" type="text/javascript"></script>
  var lrSnippet = require('connect-livereload')({
    port: lrPort
  });

  // **生成dist-html时注释掉
  var includereplaceSnippet = require('includereplace')(grunt, {
    prefix: '@@',
    suffix: '',
    globals: {},
    includesDir: 'D:\\Esh-FrontEnd\\html',
    docroot: '.',
    encoding: 'utf-8'
  });


  // 使用 middleware(中间件)，就必须关闭 LiveReload 的浏览器插件
  var lrMiddleware = function(connect, options) {
    return [
      // 把脚本，注入到静态文件中
      lrSnippet,
      // **生成dist-html时注释掉
      includereplaceSnippet,
      // 静态文件服务器的路径
      connect.static(options.base[0]),
      // 启用目录浏览(相当于IIS中的目录浏览)
      connect.directory(options.base[0])
    ];
  }


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      options: {
        // 服务器端口号
        port: 8180,
        // 服务器地址(可以使用主机名localhost，也能使用IP)
        hostname: '182.168.1.134',
        // 物理路径(默认为. 即根目录) 使用'.'或'..'为路径的时，可能会返回403 Forbidden. 此时将该值改为相对路径 。
        base: '.'
      },
      livereload: {
        options: {
          // 通过LiveReload脚本，让页面重新加载。
          middleware: lrMiddleware
        }
      }
    },
    /* 压缩优化图片大小 */
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: 'images/original',
          src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
          dest: 'images/production' // 优化后的图片保存位置，默认覆盖
        }]
      }
    },
    eshsprity: {
      //输出任务
      sprity: {}
    },
    watch: {

      /* 监控icon合并图片,生成less */
      icon: {
        files: ['images/icon/**/*.{png,jpg,jpeg}'],
        options: {
          livereload: true
        },
        tasks: ['eshsprity']
      },
      // 监控图片文件夹压缩图片
      img: {
        files: ['images/original/**/*.{png,jpg,jpeg}'],
        options: {
          livereload: true
        },
        tasks: ['imagemin']
      },
      //less动态编译
      less: {
        files: ['less/**/*.less'],
        event: ['changed', 'added'],
        options: {
          livereload: false
        },
        tasks: ['less']
      },
      css: {
        options: {
          event: ['changed', 'added'],
          livereload: true
        },
        files: ['css/**/*.css']
      },
      //监控js文件运行jshint任务
      js: {
        options: {
          spawn: false
        },
        files: ['js/**/*.js'],
        tasks: ['jshint']
      },
      //监控html文件
      html: {
        options: {
          livereload: true
        },
        files: ['html/**/*.html']
      }
    },
    includereplace: {
      your_target: {
        options: {
          prefix: '@@',
          suffix: '',
          globals: {},
          includesDir: 'D:\\Esh-FrontEnd\\html',
          docroot: '.',
          encoding: 'utf-8'
        },
        src: 'html/**/*.html',
        dest: 'dist-html/'
      }
    },
    jshint: {
      all: {
        src: ''
      }
    },
    less: {
      compileCore: {
        options: {
          strictMath: true,
          outputSourceFiles: true
        },
        expand: true,
        cwd: './less/',
        src: ['production/**/*.less'],
        dest: './css/',
        ext: '.css'
      },
    }
  });


  grunt.event.on('watch', function(action, filepath) {
    grunt.config('jshint.all.src', filepath);
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-eshsprity');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-include-replace');


  grunt.registerTask('mh', ['includereplace']);
  grunt.registerTask('all', ['eshsprity', 'imagemin']);
  grunt.registerTask('default', ['connect', 'watch']);

  // grunt.registerTask('default', ['watch']);

};