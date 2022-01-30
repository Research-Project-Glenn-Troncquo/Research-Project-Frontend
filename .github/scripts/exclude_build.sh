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
grep -E -o '/[^\/]*$' modules.tmp.txt > folders.tmp.txt
grep -E -o '[a-zA-Z]+' folders.tmp.txt > screens.tmp.txt



cat modules.tmp.txt

if [[ -f "modules.tmp.txt" && -s "modules.tmp.txt" ]];
    then

    while read screen; do
        rm -r src/app/screens/login
        ng generate component screens/$screen
        ng generate module screens/$screen
        cp .github/templates/template.html src/app/screens/$screen/$screen.component.html


        echo "$screen"     

    done <screens.tmp.txt
    
    cat modules.tmp.txt



    remove_temporary_files

else
    
    remove_temporary_files

fi
