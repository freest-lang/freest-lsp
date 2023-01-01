#!/usr/bin/env bash

# install haskell (if needed)
if ! command -v ghc
then
	echo "Please install Haskell first."
	exit -1
fi

# install stack (if needed)
if ! command -v stack
then
	echo "Please install Haskell Stack first."
	exit -1
fi

# download freest-lsp-server
wget https://github.com/freest-lang/freest-lsp-server/archive/refs/heads/main.zip

# unzip
unzip main.zip
# delete zip
rm main.zip

# (stack) install
cd freest-lsp-server-main
stack install
