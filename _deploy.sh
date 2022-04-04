#!/usr/bin/bash
bundle exec jekyll build
rsync -e ssh -azv _site/* wallandbinkley:./wallandbinkley.com/paroleresources/
