do:
	pandoc -s --mathjax -t revealjs -V theme:alice --template ./template.html -o index.html index.md
