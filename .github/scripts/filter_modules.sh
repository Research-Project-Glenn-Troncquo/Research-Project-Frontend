#!/bin/bash

npm run test:unit > report.tmp.txt
# cat report.tmp.txt
grep -E -o "(src.+\/.+\.spec\.ts)" report.tmp.txt > modules.tmp.txt
# cat modules.tmp.txt

if [[ -f "modules.tmp.txt" && -s "modules.tmp.txt" ]];
then
    git fetch --all

    echo "Genereate new branch $NEW_BRANCH"
    git checkout -b $NEW_BRANCH

    while read module; do
        echo "restore module $module from $PARENT_BRANCH if there are errors"
        sh -c "git checkout origin/$PAREN_BRANCH -- $module "
    done <modules.tmp.txt

    

else
    echo "there are no errors"

fi
