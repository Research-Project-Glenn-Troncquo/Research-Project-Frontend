#!/bin/bash

npm run test:unit > report.txt
# cat report.txt
grep -E -o "(src.+\/.+\.spec\.ts)" report.txt > modules.report.txt
# cat modules.report.txt

if [[ -f "modules.report.txt" && -s "modules.report.txt" ]];
then
    git fetch --all

else
    echo "there are no errors"

fi
