#!/bin/bash

npm run test:unit > report.txt
# cat report.txt
grep -E -o "(src.+\/.+\.spec\.ts)" report.txt > modules.report.txt
# cat modules.report.txt

if [[ -f "modules.txt" && -s "modules.txt" ]];
then
    echo "there are modules with errors"

else
    echo "there are no errors"

fi
