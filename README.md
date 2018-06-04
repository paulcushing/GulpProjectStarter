# Gulp Project Starter
Blank starter setup for using Gulp to serve and package for distribution. This is really just built to steamline the creation of one-off sites to include scss compilation, image compression, script & css concatination, and minification. 

## Install
Assuming you already have installed node.js...

`git clone https://github.com/paulcushing/GulpProjectStarter.git`

`npm install`

Review `package.json` and `gulpfile.js` to alter the project name and ensure the paths are correct for your project.

## Use
Run `gulp` or `gulp serve` to watch for changes and run browsersync to automatically update browser when changes are made. 

To only update the individual file types, use:<br/>
`gulp styles`<br/>
`gulp scripts`<br/>
`gulp images`<br/>


