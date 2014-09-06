all: lib/plot.coffee lib/plot.js lib/game.js lib/color.js lib/images.js include/vnc.js lib/page.js

lib/plot.coffee: lib/plot.txt
	echo "window.plot = [" > $@
	cat $^ | grep -v '^$$' | sed 's/"/\&quot;/g' | coffee tools/plot-format.coffee | sed 's/^\(.*\)$$/  \1/' >> $@
	echo ']' >> $@

%.js: %.coffee
	coffee -c $^

clean:
	rm lib/plot.coffee lib/*.js
