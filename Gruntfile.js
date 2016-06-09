'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  //
  require('./lib/grunt-robo')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'bin/www'
      }
    },
    sass: {
      dist: {
        files: {
          'public/css/main.css': 'public/css/main.scss'
        }
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      server: {
        files: [
          'bin/www',
          'app.js',
          'routes/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      js: {
        files: ['public/js/*.js'],
        options: {
          livereload: reloadPort
        }
      },
      css: {
        files: [
          'public/css/*.scss'
        ],
        tasks: ['sass'],
        options: {
          livereload: reloadPort
        }
      },
      views: {
        files: ['views/*.handlebars'],
        options: {
          livereload: reloadPort
        }
      }
    },
    bowercopy: {
      options: {
        srcPrefix: 'bower_components'
      },
      scripts: {
        options: {
          destPrefix: 'public/vendor'
        },
        files: {
          'jquery.js': 'jquery/dist/jquery.js',
          'html5shiv.js': 'html5shiv/dist/html5shiv.js'
        }
      }
    },
    clean: {
      build: {
        files: [{
          dot: true,
          src: [
            'dist/*',
            'tmp/*'
          ]
        }]
      }
    },
    robo: {
      compile: {}
    },
    useminPrepare: {
      options: {
        dest: 'dist/site'
      },
      html: 'tmp/site/index.html'
    },
    usemin: {
      options: {
        // assetsDirs: [
        //   'dist/site',
        //   'dist/site/images',
        //   'dist/site/styles'
        // ]
      },
      html: ['dist/site/{,*/}*.html', 'tmp/site/{,*/}*.html'],
      css: ['dist/site/styles/{,*/}*.css']
    },
    htmlmin: {
      dist: {
        options: {
          // collapseBooleanAttributes: true,
          // collapseWhitespace: true,
          // conservativeCollapse: true,
          // removeAttributeQuotes: true,
          // removeCommentsFromCDATA: true,
          // removeEmptyAttributes: true,
          // removeOptionalTags: true,/
          // true would impact styles with attribute selectors
          // removeRedundantAttributes: false,
          // useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: 'tmp/site',
          src: '{,*/}*.html',
          dest: 'dist/site'
        }]
      }
    },
    copy: {
      temp: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'public',
          dest: 'tmp/site',
          src: [
            'css/{,*/}*.css',
            'js/{,*/}*.js'
          ]
        }]
      }
    }
  });

  grunt.config.requires('watch.server.files');
  files = grunt.config('watch.server.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function (err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded) {
            grunt.log.ok('Delayed live reload successful.');
          } else {
            grunt.log.error('Unable to make a delayed live reload.');
          }
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', [
    'sass',
    'bowercopy',
    'develop',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:build',
    'sass',
    'bowercopy',
    'robo:compile',
    'copy:temp',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'usemin',
    'htmlmin'
  ]);
};
