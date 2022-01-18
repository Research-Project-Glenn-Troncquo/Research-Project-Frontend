#!/bin/bash

npm run test:unit > report.txt
cat report.txt
grep -E -o "(src.+\/.+\.spec\.ts)" report.txt > modules.report.txt
cat modules.txt

if [[ -f "modules.txt" && -s "modules.txt" ]];