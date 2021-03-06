#!/usr/bin/env bash

# This is the project root.
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

# Log a message.
function log {
    echo -e " \033[32m*\033[0m ${1}"
}
# write an error message.
function error {
    echo -e "\033[31m${1}\033[0m"
}


#
# Utilities to check core dependencies
#
function check_npm_installed {
    if [ -z "$(which npm)" ] ;
    then
        error "Node and npm are required"
        exit 1;
    fi
}

function check_bundler_installed {
    if [ -z "$(which bundle)" ] ;
    then
        if [ -z "$(which gem)" ] ;
        then
            error "Ruby and gem are required (install with ruby executable in your path)"
            exit 1;
        fi

        log "Install bundler."
        gem install bundler
    fi
}

function check_deps {
    check_npm_installed
#    check_bundler_installed
}

#
# utilities to install packages.
#

function install_npm {
    if [ -z "$(which grunt)" ] ;
    then
        log "Install grunt cli"
        npm install grunt-cli
    fi
    log "Install npm dependencies"
    npm install
}

function install_bower {
    log "Install bower dependencies"
    $DIR/node_modules/.bin/bower install
}

function install_gem {
    log "Install gem files";
    bundle install
}

function install {
    check_deps
    install_npm
    install_bower
    #install_gem
}

if [ install -eq 0 ] ; then
    log "Everything went fine."
else
    error "An error append, please check command output for more information."
fi
