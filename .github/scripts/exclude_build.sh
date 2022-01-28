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


cat modules.tmp.txt

if [[ -f "modules.tmp.txt" && -s "modules.tmp.txt" ]];
then

    while read module; do
        rm -r src/app/screens/login
        ng generate component screens/$module
        ng generate module screens/$modue
        cp ../templates/template.html ../../src/app/screens/$module/$module.component.html


        echo "$module"     

    done <modules.tmp.txt
    
    cat modules.tmp.txt



    remove_temporary_files

else
    
    remove_temporary_files

fi
