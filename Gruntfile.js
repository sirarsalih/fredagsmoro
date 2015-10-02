/* global module */

module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        gitinfo: {},
        eslint: {
            target: [
                "Gruntfile.js",
                "build/site/js/*.js"
            ]
        },
        "bower-install-simple": {
            app: {
                options: {
                    color: true,
                    production: false,
                    cwd: ".",
                    directory: "build/site/lib"
                }
            }
        },
        exec: {
            data: {
                command: "scripts/build_data.rb > build/site/data.json"
            },
            serve: {
                command: "node server.js"
            },
            fetch: {
                command: "scripts/fetch.rb"
            },
            dropbox: {
                command: "scripts/dropbox.rb"
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
        },
        dockersha: {
            cwd: 'build',
            command: 'docker build -t docker.home.chrissearle.org:5000/fredagsmoro_cso:<%=  gitinfo.local.branch.current.shortSHA %> .'
        },
        docker: {
            cwd: 'build',
            command: 'docker tag -f docker.home.chrissearle.org:5000/fredagsmoro_cso:<%=  gitinfo.local.branch.current.shortSHA %> docker.home.chrissearle.org:5000/fredagsmoro_cso:latest'
        },
        deploydockersha: {
            cwd: 'build',
            command: 'docker push docker.home.chrissearle.org:5000/fredagsmoro_cso:<%=  gitinfo.local.branch.current.shortSHA %>'
        },
        deploydocker: {
            cwd: 'build',
            command: 'docker push docker.home.chrissearle.org:5000/fredagsmoro_cso:latest'
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
    grunt.registerTask("newweek", ["gitpull:update", "exec:dropbox", "exec:data", "gitadd:newweek", "gitcommit:newweek", "gitpush"]);
    grunt.registerTask("doit", ["newweek"]);
    grunt.registerTask("serve", ["exec:serve"]);
};
