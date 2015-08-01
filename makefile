
do:
	: > resources/fs.js
	echo "var files = [" >> resources/fs.js
	find . -type f | grep .. | sed 's#^\./##g' | grep -v '.git' | grep '\.html$$'  | sed 's/.*/"&",/' >> resources/fs.js
	echo "];" >> resources/fs.js

