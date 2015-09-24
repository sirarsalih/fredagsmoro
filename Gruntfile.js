/* global module */

module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        eslint: {
            target: [
                "Gruntfile.js",
                "site/js/*.js",
                "test/**/*Spec.js"
            ]
        },
        "bower-install-simple": {
            app: {
                options: {
                    color: true,
                    production: false,
                    cwd: ".",
                    directory: "site/lib"
                }
            }
        },
        exec: {
            data: {
                command: "scripts/build_data.rb > site/data.json"
            },
            serve: {
                command: "node server.js"
            },
            fetch: {
                command: "scripts/fetch.rb"
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
        gitpull: {
            update: {
                options: {
                    remote: "origin"
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
    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-git");

    grunt.registerTask("install", ["bower-install-simple:app", "npm-install"]);
    grunt.registerTask("default", ["eslint"]);
    grunt.registerTask("newweek", ["gitpull:update", "exec:fetch", "exec:data", "gitadd:newweek", "gitcommit:newweek", "gitpush"]);
    grunt.registerTask("doit", ["newweek"]);
    grunt.registerTask("serve", ["exec:serve"]);
};
