#!/bin/bash
# this script creates the distribution files

# compresses JavaScript files
cat \
    src/jquery.sp-modal-eventable.js \
    src/jquery.sp-modal-window.js \
    src/jquery.sp-modal-ui.js \
    src/jquery.sp-modal-dialog.js \
    src/jquery.sp-modal-loading.js \
    src/jquery.sp-modal-message.js \
    src/jquery.sp-modal.js \
| uglifyjs --compress --mangle -o dist/jquery.sp-modal.min.js

# compresses CSS files
cat \
    src/jquery.sp-modal-window.css \
    src/jquery.sp-modal-ui.css \
    src/jquery.sp-modal-loading.css \
    src/jquery.sp-modal-message.css \
| uglifycss > dist/jquery.sp-modal.min.css

# copies images from src to dist
rm -rf dist/images
cp -rp src/images dist/images
