#!/bin/bash

remove_temporary_files(){
    echo "removing temporary files"
    rm *.tmp.txt
}

npm run test:unit > report.tmp.txt
# cat report.tmp.txt
grep -E -o "(src.+\/.+\.spec\.ts)" report.tmp.txt | xargs -I {} dirname {} > modules.tmp.txt
# cat modules.tmp.txt

if [[ -f "modules.tmp.txt" && -s "modules.tmp.txt" ]];
then
    git fetch --all

    echo "Genereate new branch $NEW_BRANCH"
    git checkout -b $NEW_BRANCH

    while read module; do
        echo "restore module $module from $PARENT_BRANCH if there are errors"
        sh -c "git checkout origin/$PARENT_BRANCH -- $module "
    done <modules.tmp.txt

    remove_temporary_files

    git add .
    git commit -m "restore modules from $PARENT_BRANCH because of test failures."
    git push origin $NEW_BRANCH

    touch do_pr
    

else
    echo "there are no errors"
    remove_temporary_files

fi
