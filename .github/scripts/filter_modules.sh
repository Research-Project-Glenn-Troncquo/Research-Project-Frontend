#!/bin/bash

npm run test:unit > report.txt
cat report.
grep -E -o "(src.+\/.+\.spec\.ts)" report.tmp.txt