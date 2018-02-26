#!/bin/bash

# Installs node.js only (no development dependencies) for both Ubuntu and OS X

#
# See https://git.coolaj86.com/coolaj86/node-installer.sh
#

# curl -fsSL bit.ly/nodejs-min | bash
# wget -nv bit.ly/nodejs-min -O - | bash

# curl -fsSL https://example.com/setup-min.bash | bash
# wget -nv https://example.com/setup-min.bash -O - | bash

# Not every platform has or needs sudo, gotta save them O(1)s...
sudo_cmd=""
((EUID)) && [[ -z "$ANDROID_ROOT" ]] && sudo_cmd="sudo"

deps_flag="$1"
set -e
set -u
#set -o pipefail

if [ -z "${PREFIX-}" ]; then
  PREFIX=""
fi

NODEJS_NAME="node"
NODEJS_BASE_URL="https://nodejs.org"
BASE_URL="https://git.coolaj86.com/coolaj86/node-installer.sh/raw/master"
#NO_FAIL2BAN=""
NO_FAIL2BAN="nope"
OS="unsupported"
ARCH=""
NODEJS_VER=""
SETUP_FILE=""

clear

#########################
# Which OS and version? #
#########################

if [ "$(uname | grep -i 'Darwin')" ]; then
  OSX_VER="$(sw_vers | grep ProductVersion | cut -d':' -f2 | cut -f2)"
  OSX_MAJOR="$(echo ${OSX_VER} | cut -d'.' -f1)"
  OSX_MINOR="$(echo ${OSX_VER} | cut -d'.' -f2)"
  OSX_PATCH="$(echo ${OSX_VER} | cut -d'.' -f3)"

  #
  # Major
  #
  if [ "$OSX_MAJOR" -lt 10 ]; then
    echo "unsupported OS X version (os 9-)"
    exit 1
  fi

  if [ "$OSX_MAJOR" -gt 10 ]; then
    echo "unsupported OS X version (os 11+)"
    exit 1
  fi

  #
  # Minor
  #
  if [ "$OSX_MINOR" -le 5 ]; then
    echo "unsupported OS X version (os 10.5-)"
    exit 1
  fi

  # Snow
  if [ "$OSX_MINOR" -eq 6 ]; then
    OS='snow'
  fi

  # Lion
  if [ $OSX_MINOR -eq 7 ]; then
    OS='lion'
  fi

  # Mountain Lion
  if [ "$OSX_MINOR" -eq 8 ]; then
    OS='mountain'
  fi

  # Mavericks, Yosemite
  if [ "$OSX_MINOR" -ge 9 ]; then
    OS='mavericks'
  fi

  if [ -n "$(sysctl hw | grep 64bit | grep ': 1')" ]; then
    ARCH="64"
  else
    ARCH="32"
  fi
elif [ "$(uname | grep -i 'Linux')" ]; then
  if [ ! -f "/etc/issue" ]; then
    echo "unsupported linux os"
    exit 1
  fi

  if [ -n "$(uname -a | grep 64)" ]; then
    ARCH="64"
  else
    ARCH="32"
  fi

  if [ "$(cat /etc/issue | grep -i 'Ubuntu')" ]; then
    OS='ubuntu'
  elif [ "$(cat /etc/issue | grep -i 'Linux Mint')" ]; then
    OS='ubuntu'
  elif [ "$(cat /etc/issue | grep -i 'elementary OS')" ]; then
    OS='ubuntu'
  elif [ "$(cat /etc/issue | grep -i 'Debian')" ]; then
    OS='ubuntu'
  elif [ "$(cat /etc/issue | grep -i 'Trisquel')" ]; then
    OS='ubuntu'
  elif [ "$(cat /etc/issue | grep -i 'Zorin')" ]; then
    OS='ubuntu'
  elif [ "$(cat /etc/issue | grep -i 'Raspbian')" ]; then
    OS='raspbian'
  elif [ "$(cat /etc/issue | grep -i 'Fedora')" ]; then
    OS='fedora'
  elif [ "$(cat /etc/issue | grep -i 'Marvell')" ]; then
    OS='marvell'
  fi
else
  echo "unsupported unknown os (non-mac, non-linux)"
  exit 1
fi

case "${OS}" in
  fedora)
    echo "FEDORA not yet supported (feel free to pull request)"
    exit 1
    ;;
  ubuntu)
    SETUP_FILE="ubuntu"
    ;;
  raspbian)
    SETUP_FILE="ubuntu"
    ;;
  marvell)
    SETUP_FILE="ubuntu"
    ;;
  yosemite)
    # mavericks
    SETUP_FILE="mavericks"
    ;;
  mavericks)
    SETUP_FILE="mavericks"
    ;;
  mountain)
    echo "Mountain Lion not yet supported (feel free to pull request)"
    exit 1
    ;;
  lion)
    echo "Lion not yet supported (feel free to pull request)"
    exit 1
    ;;
  snow)
    echo "Snow Leopard not yet supported (feel free to pull request)"
    exit 1
    ;;
  *)
    echo "unsupported unknown os ${OS}"
    exit 1
    ;;
esac

#######################
# Download installers #
#######################

if [ "--dev-deps" == "$deps_flag" ]; then
  echo "Preparing to install node.js (and common development dependencies) for ${OS}" "${ARCH}"
else
  echo "Preparing to install node.js (minimal) for ${OS}" "${ARCH}"
fi

INSTALL_DEPS_FILE="setup-deps-${SETUP_FILE}.bash"
INSTALL_FILE="setup-node-${SETUP_FILE}.bash"
if [ ! -e "/tmp/${INSTALL_FILE}" ]; then
  if [ -n "$(type -p curl)" ]; then
    curl --silent -L "${BASE_URL}/${INSTALL_FILE}" \
      -o "/tmp/${INSTALL_FILE}" || echo 'error downloading os setup script'
  elif [ -n "$(type -p wget)" ]; then
    wget --quiet "${BASE_URL}/${INSTALL_FILE}" \
      -O "/tmp/${INSTALL_FILE}" || echo 'error downloading os setup script'
  else
    echo "Found neither 'curl' nor 'wget'. Can't Continue."
    exit 1
  fi
fi

if [ "--dev-deps" == "$deps_flag" ]; then
  if [ ! -e "/tmp/${INSTALL_DEPS_FILE}" ]; then
    if [ -n "$(type -p curl)" ]; then
      curl --silent -L "${BASE_URL}/${INSTALL_DEPS_FILE}" \
        -o "/tmp/${INSTALL_DEPS_FILE}" || echo 'error downloading os deps script: '"${BASE_URL}/${INSTALL_DEPS_FILE}"
    elif [ -n "$(type -p wget)" ]; then
      wget --quiet "${BASE_URL}/${INSTALL_DEPS_FILE}" \
        -O "/tmp/${INSTALL_DEPS_FILE}" || echo 'error downloading os deps script: '"${BASE_URL}/${INSTALL_DEPS_FILE}"
    else
      echo "Found neither 'curl' nor 'wget'. Can't Continue."
      exit 1
    fi
  fi
fi

if [ ! -e "/tmp/${INSTALL_FILE}" ]
then
  echo "Error Downloading Install File"
  exit 1
fi

if [ "--dev-deps" == "$deps_flag" ]; then
  if [ ! -e "/tmp/${INSTALL_DEPS_FILE}" ]
  then
    echo "Error Downloading Deps File"
    exit 1
  fi
fi

#########################
# Which node.js VERSION ? #
#########################

if [ -f "/tmp/NODEJS_VER" ]; then
  NODEJS_VER=$(cat /tmp/NODEJS_VER | grep v)
elif [ -f "/tmp/IOJS_VER" ]; then
  NODEJS_VER=$(cat /tmp/IOJS_VER | grep v)
fi

if [ -n "$NODEJS_VER" ]; then
  NODEJS_VERT=$(echo ${NODEJS_VER} | cut -c 2- | cut -d '.' -f1)

  if [ $NODEJS_VERT -ge 1 ] && [ $NODEJS_VERT -lt 4 ]
  then
    echo "Selecting io.js instead of node.js for this version (>= 1.0.0 < 4.0.0)"
    NODEJS_BASE_URL="https://iojs.org"
    NODEJS_NAME="iojs"
  fi
fi

if [ -z "$NODEJS_VER" ]; then
  if [ -n "$(type -p curl)" ]; then
    NODEJS_VER=$(curl -fsL "$NODEJS_BASE_URL/dist/index.tab" | head -n 2 | tail -1 | cut -f 1) \
      || echo 'error automatically determining current node.js version'
  elif [ -n "$(type -p wget)" ]; then
    NODEJS_VER=$(wget --quiet "$NODEJS_BASE_URL/dist/index.tab" -O - | head -n 2 | tail -1 | cut -f 1) \
      || echo 'error automatically determining current node.js version'
  else
    echo "Found neither 'curl' nor 'wget'. Can't Continue."
    exit 1
  fi
fi

#
# node
#
if [ -z "${NODE_PATH-}" ]; then
  if [ -n "$(type -p node | grep node 2>/dev/null)" ]; then
    # /usr/local/bin/node => /usr/local
    node_install_path="$(dirname $(dirname $(type -p node)))"
    echo "NODE_PATH is not set. Using existing node install path: '$node_install_path'"
  else
    node_install_path=$PREFIX/usr/local
    echo "NODE_PATH is not set. Using default install path '$node_install_path'"
  fi
else
  node_install_path=$(dirname $(dirname $NODE_PATH))
  echo "NODE_PATH is '$NODE_PATH', so install path is '$node_install_path'"
fi
if [ -e "$node_install_path/bin/node" ]; then
# node of some version is already installed
  if [ "${NODEJS_VER}" == "$($node_install_path/bin/node -v 2>/dev/null)" ]; then
    echo node ${NODEJS_VER} is already installed
  else
    echo ""
    echo "HEY, LISTEN:"
    echo ""
    echo "node.js is already installed as node $($node_install_path/bin/node -v | grep v)"
    echo ""
    echo "to reinstall please first run: rm $node_install_path/bin/node"
    echo ""
  fi

  NODEJS_VER=""
fi

if [ -n "${NODEJS_VER}" ]; then
  bash "/tmp/${INSTALL_FILE}" "${NODEJS_VER}"
fi

$sudo_cmd chown -R $(whoami) $node_install_path/lib/node_modules

echo ""

if [ "--dev-deps" == "$deps_flag" ]; then

  ################
  # DEPENDENCIES #
  ################

  #if [ -z "$(which fail2ban-server | grep fail2ban)" ]; then
  #  echo ""
  #  echo "Your server didn't come with fail2ban preinstalled!!!"
  #  echo "Among other things, fail2ban secures ssh so that your server isn't reaped by botnets."
  #  echo ""
  #  echo "Since you're obviously connecting this computer to a network, you should install fail2ban before continuing"
  #  echo ""
  #  echo "Install fail2ban? [Y/n]"
  #  echo "(if unsure, just hit [enter])"
  #  read INSTALL_FAIL2BAN
  #
  #  if [ "n" == "${INSTALL_FAIL2BAN}" ] || [ "no" == "${INSTALL_FAIL2BAN}" ] || [ "N" == "${INSTALL_FAIL2BAN}" ] || [ "NO" == "${INSTALL_FAIL2BAN}" ]; then
  #    echo ""
  #    echo "I don't think you understand: This is important."
  #    echo ""
  #    echo "Your server will be under constant attack by botnets via ssh."
  #    echo "It only takes a few extra seconds to install and the defaults are adequate for protecting you."
  #    echo ""
  #    echo "Change your mind?"
  #    echo "Ready to install fail2ban? [Y/n]"
  #    read INSTALL_FAIL2BAN
  #    if [ "n" == "${INSTALL_FAIL2BAN}" ] || [ "no" == "${INSTALL_FAIL2BAN}" ] || [ "N" == "${INSTALL_FAIL2BAN}" ] || [ "NO" == "${INSTALL_FAIL2BAN}" ]; then
  #      clear
  #      echo "you make me sad :-("
  #      sleep 0.5
  #      echo "but whatever, it's your funeral..."
  #      sleep 1
  #      NO_FAIL2BAN="nope"
  #    else
  #      echo "Phew, dodged the bullet on that one... Will install fail2ban.. :-)"
  #    fi
  #  fi
  #fi

  bash "/tmp/${INSTALL_DEPS_FILE}" "${NO_FAIL2BAN}"

  # yarn
  #if [ -z "$(type -p yarn)" ]; then
  #  echo "installing yarn..."
  #  npm install --silent yarn -g > /dev/null
  #fi

  # jshint
  if [ -z "$(type -p jshint)" ]; then
    echo "installing jshint..."
    #yarn global add jshint > /dev/null
    $node_install_path/bin/npm install -g jshint > /dev/null
  fi

  echo ""
fi
