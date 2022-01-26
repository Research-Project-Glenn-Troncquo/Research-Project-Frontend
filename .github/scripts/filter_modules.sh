#!/bin/bash

remove_temporary_files() {
    echo "removing temporary files"
    rm *.tmp.txt
}

npm run test:unit > report.tmp.txt 2> /dev/null &
wait
cat report.tmp.txt
grep -E -o "(src.+\/.+\.spec\.ts)" report.tmp.txt | xargs -I {} dirname {} > modules.tmp.txt

cat modules.tmp.txt

if [[ -f "modules.tmp.txt" && -s "modules.tmp.txt" ]];
then
    git fetch --all

    echo "Genereate new branch $NEW_BRANCH"
    git checkout -b $NEW_BRANCH

    while read module; do
        echo "restoring module $module from $PARENT_BRANCH ..."
        sh -c "git checkout origin/$PARENT_BRANCH -- $module "
    done <modules.tmp.txt

    git config --global user.email "github_actions"
    git config --global user.name "github_actions"

    git add .
    git commit -m "restore modules from $PARENT_BRANCH because of test failures."
    git push origin $NEW_BRANCH

    $TEST=testje

    curl --request POST --url "https://api.trello.com/1/cards?idList=61f16f2aa1468557c219ebfa&key=74d79d8a81bca9fc82038ff912c6891a&token=2bace6d2535988d020e84a2615964f5f7f26c19c4888f9ce94fe0430850d3d14&name=testingerror&desc=$TEST"

    # touch do_pr 
    # grep -E -o "[^)]+FAILED[^)]" report.tmp.txt > do_pr.txt
    grep -E -o "[^)]+FAILED$" report.tmp.txt > do_pr.txt

    cat do_pr.txt

    remove_temporary_files

else
    
    remove_temporary_files

fi
