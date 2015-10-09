# Fredagsmoro

A collection of random images from the net - collected by Karl Øgaard (previously Ragnar Bergvik) and sent out each Friday to amuse their colleagues.

## Live Site

[http://fredagsmoro.chrissearle.org](http://fredagsmoro.chrissearle.org)

## Installation

### Prerequisites

* npm
* a fairly recent ruby

### Installation

Run:

    npm install
    grunt install

### Setup

You will need

* To have the correct dropbox folder shared (for receiving new images)
* Copy scripts/dropbox_sample.yml to scripts/dropbox.yml and set the fully specified path to the dropbox folder
* For docker packaging - a running local docker daemon
* For docker deployment - access to docker.home.chrissearle.org repository

### Grunt commands

#### Utils

* grunt install - run both bower and npm install
* grunt (or grunt eslint) - run eslint
* grunt serve - run a local web on port 5000

#### For a new week

* grunt newweek - update from github, grab files from dropbox, rebuild data, push to github
* grunt docker:package - package up in a docker container - creates both fredagsmoro_cso:<git tag> and moves fredagsmoro_cso:latest to point to it
* grunt docker:deploy - push the packages from docker:package to docker.home.chrissearle.org repo
