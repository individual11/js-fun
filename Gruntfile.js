// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
 
var LIVERELOAD_PORT = 35729;
var RUNNING_PORT = 1337; // <- if you change this, you need to change in public/js/app.js and recompile
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});


var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

 
module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    less: {
      options: {
        //report:'gzip'
      },
      production: {
        options: {
          cleancss: true
        },
        files: {
          "public/css/core.css": "public/less/core.less"
        }
      }
    },
    
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'public/css/core.css': 'public/bower_components/sass-bootstrap/lib/bootstrap.scss',
        }
      }
    },

    stylus: {
      compile: {
        options: {
          compress:true
        },
        files: {
          'public/css/core.css': 'public/bower_components/bootstrap-stylus/stylus/bootstrap.styl'
        }
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: false,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      files:{
        src:['public/js/app.js']
      } 
    },

    concat: {
      options: {
        separator: ';',
        stripBanners:true
      },
      dist: {
        src: ['public/js/app.js'],
        dest: 'public/js/concat.js',
      },
    },
    
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'public/js/app.min.js': ['public/js/concat.js']
        }
      }
    },
  
    // Watch Config
    watch: {
        options: {
            livereload: true,
            nospawn:true
        },
        scripts:{
          files:['public/js/**/*.js'],
          tasks:['buildScripts']
        },
        css:{
          files:['public/bower_components/bootstrap/less/**/*.less', "public/less/**/*.less"],
          tasks:['buildCSS']
        },
        json:{
          files:['public/json/**/*.json'],
          tasks:['compileJSON', 'buildCSS']
        },
        files: ['index.html']
    },

    connect: {
      server: {
        options: {
          port: RUNNING_PORT,
          base: './'
        }
      }
    },

    wait:{
      options: {
          delay: 1000
      },
      pause:{
        options:{
          before:function(options){
            console.log('pausing %dms before launching page', options.delay);
          },
          after : function() {
              console.log('pause end, heading to page (using default browser)');
          }
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:' + RUNNING_PORT
      }
    }

  });

  grunt.registerTask('compileJSON', 'Compiling color palette from JSON',function(){
    var swatches = grunt.file.readJSON('public/json/color-swatches.json');
    var content = '/* COLOR SWATCHES FROM public/json/color-swatches.json */\n';
    for(var key in swatches){
      content += "." + key + "{ background:" + swatches[key] + "; a{ color:lighten(" + swatches[key] + ", 10%); }}\n";
      content += "." + key + "-color{ color:" + swatches[key] + " !important; }\n";
    }
    grunt.file.write('public/less/color-swatches.less', content);
  });

  grunt.registerTask('buildScripts', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('buildCSS', ['less']);

  grunt.registerTask('build', ['compileJSON', 'buildCSS', 'buildScripts']);

  grunt.registerTask('launch', ['connect:server', 'wait', 'open', 'watch']);

  grunt.registerTask('default', ['build', 'launch']);

};