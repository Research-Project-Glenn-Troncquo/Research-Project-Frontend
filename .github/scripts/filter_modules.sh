#!/bin/bash

npm run test:unit > report.txt
cat report.txt
grep -E -o "(src.+\/.+\.spec\.ts)" report.tmp.txt > modules.report.txt
cat modules.txt