CSS
====================================

Development process:

1. edit SASS files from /sass
2. preprocessor autocompiles to /css/style.css
3. postprocessor autocompiles to /css/style.min.css


Preprocessor:
-------------------------------------
1. install Ruby with installer from http://rubyinstaller.org/downloads/
2. install SASS in command line: 
	gem install sass
3. install Compass in command line: 
	gem install compass
4. while working have the following watcher run from command line: 
	compass watch
	Type this in the assets folder (where config.rb is present)

	
Postprocessor:
-------------------------------------
1. install Node.js with installer from http://nodejs.org/
2. install grunt-cli in command line: 
	npm install -g grunt-cli
3. install dependencies in command line:
	npm install
4. while working have the following watcher run from command line (yes, in parallel with the compass watcher):
	grunt watch
	

NOTES:
It's best while synchronizing with SVN to stop the watchers.

The following folders should NOT be submitted to SVN:
- the sass cache folders
- the /cmq temporary folder (is used during postprocessing)
- the grunt folder /node_modules

The rest should be submitted to SVN as the developer will need them:
SASS folder
config.rb
Gruntfile.js
package.json
readme.txt