# Fredagsmoro

A collection of random images from the net - collected by Ragnar Bergvik and sent out each Friday to amuse his colleagues.

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

### Grunt commands

#### Utils

* grunt install - run both bower and npm install
* grunt (or grunt eslint) - run eslint
* grunt exec:serve - run a local web on port 8000

#### For a new week

* grunt newweek - rebuild data.json, commit and push to github
* grunt deploy - build and sync
* grunt doit - newweek then deploy

So - to generate a new week in its simplest form - add the images to the right content dir then run

    grunt doit

Sync of course requires that you have the correct ssh keys :)
