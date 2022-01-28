#!/bin/bash

# npm run build


npm install -g @angular/cli

remove_temporary_files() {
    echo "removing temporary files"
    rm *.tmp.txt
}

npm run test:unit > report.tmp.txt 2> /dev/null &
wait
cat report.tmp.txt
grep -E -o "(src.+\/.+\.spec\.ts)" report.tmp.txt | xargs -I {} dirname {} > modules.tmp.txt
grep -E -o "\/([^\/]+)\/?$" modules.tmp.txt | xargs -I {} dirname {} > modules.tmp.

rm -r src/app/screens/login
ng generate component screens/login
ng generate module screens/login


cat modules.tmp.txt

if [[ -f "modules.tmp.txt" && -s "modules.tmp.txt" ]];
then

    # while read module; do
        

    # done <modules.tmp.txt
    
    cat modules.tmp.txt
    echo "why are we in the loop?"


    remove_temporary_files

else
    
    remove_temporary_files

fi
