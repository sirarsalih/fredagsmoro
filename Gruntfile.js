/* global module */

module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        shell: {
            "git-commit": {
                command: 'git rev-parse --short HEAD',
                options: {
                  callback: function (err, stdout, stderr, cb) {
                      grunt.config.set('gitCommit', stdout.replace('\n', ''));
                      cb();
                  }
              }
          }
        },
        eslint: {
            target: [
                "Gruntfile.js",
                "js/*.js",
                "test/**/*Spec.js"
            ]
        },
        "bower-install-simple": {
            app: {
                options: {
                    color: true,
                    production: false,
                    cwd: ".",
                    directory: "lib"
                }
            }
        },
        karma: {
            app: {
                configFile: "test/config/karma.conf.js"
            },
            "app-fast": {
                browsers: ["PhantomJS"],
                singleRun: true,
                configFile: "test/config/karma.conf.js"
            }
        },
        rsync: {
            options: {
                args: ["--verbose"],
                exclude: [".git*", ".idea", "node_modules", "package.json", "*.log", ".DS_Store", "scripts", "build", "Gruntfile.js", "README.md", "bower.json", "test"],
                recursive: true
            },
            build: {
                options: {
                    src: "./",
                    dest: "./build",
                    delete: true
                }
            },
            prod: {
                options: {
                    src: "./build/",
                    dest: "/srv/www/fredagsmoro.chrissearle.org/htdocs",
                    host: "bryanek.chrissearle.org",
                    delete: true
                }
            }
        },
        exec: {
            data: {
                command: "scripts/build_data.rb > data.json"
            },
            serve: {
                command: "python -m SimpleHTTPServer 8000"
            },
            fetch: {
                command: 'scripts/fetch.rb'
            },
            dockersha: {
                command: 'docker build -t chris/fredagsmoro_cso:' + grunt.config.get('gitCommit') + ' .'
            },
            docker: {
                command: 'docker build -t chris/fredagsmoro_cso:latest .'
            }
        },
        gitadd: {
            newweek: {
                options: {
                    all: true
                }
            }
        },
        gitcommit: {
            newweek: {
                options: {
                    message: "New Week"
                }
            }
        },
        gitpush: {
            newweek: {
                options: {
                    remote: "origin"
                }
            }
        }
    });

    // Package management
    grunt.loadNpmTasks("grunt-npm-install");
    grunt.loadNpmTasks("grunt-bower-install-simple");
    grunt.loadNpmTasks("grunt-eslint");
    grunt.loadNpmTasks("grunt-karma");
    grunt.loadNpmTasks("grunt-rsync");
    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-git");
    grunt.loadNpmTasks("grunt-shell");

    grunt.registerTask("install", ["bower-install-simple:app", "npm-install"]);
    grunt.registerTask("default", ["eslint"]);
    grunt.registerTask("newweek", ["exec:fetch", "exec:data", "gitadd:newweek", "gitcommit:newweek", "gitpush"]);
    grunt.registerTask("deploy", ["rsync:build", "rsync:prod"]);
    grunt.registerTask("package", ["shell:git-commit", "rsync:build", "exec:dockersha", "exec:docker"]);
    grunt.registerTask("doit", ["newweek", "package"]);
};
