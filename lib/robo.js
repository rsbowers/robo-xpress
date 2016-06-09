var fs = require('fs-extra');
var hbs = require('handlebars');
var layouts = require('handlebars-layouts');
var helpers = require('../helpers/index');
var config = require('../roboconfig.json');
var path = require('path');

//
var components = {};
var globalIncludes = {
	'styles': [],
	'scripts': [],
	'outputStyles': '',
	'outputScripts': ''
}
var tmp = config.paths.output_tmp;
var dist = config.paths.output_dist;

// Register helpers
hbs.registerHelper(layouts(hbs));
helpers.init(hbs);

// Register partials
var registerPartials = function(partialsDir) {
	var filenames = fs.readdirSync(partialsDir);

	filenames.forEach(function(filename) {
		var matches = /^([^.]+).hbs$/.exec(filename);
		if (!matches) {
			return;
		}
		var name = matches[1];
		var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
		hbs.registerPartial(name, template);
	});
}

// Register layouts
var registerLayouts = function() {
	var layouts = config.layouts;
	for (var key in layouts) {
		// Skip loop if the property is from prototype
		if (!layouts.hasOwnProperty(key)) continue;
		hbs.registerPartial(key, fs.readFileSync(config.paths.input_layouts + layouts[key], 'utf8'));
	}
}

registerPartials(config.paths.input_components);
registerPartials(config.paths.input_partials);
registerLayouts();

var compile = function() {
	createOutputDirectories();
	processStyles();
	processScripts();
	generateLayoutIncludes();
	processComponents();
	processPages();
	processImages();
};

var fetchPageData = function(page) {
	var output = {};
	if (config.pages[page]) {
		var data = config.pages[page].data;
		for (var key in data) {
			// Skip loop if the property is from prototype
			if (!data.hasOwnProperty(key)) continue;

			// Fetch data
			// console.log('./data/' + data[key]);
			var dataFile = fs.readFileSync('data/' + data[key], 'utf8');
			// console.log(dataFile);
			output[key] = JSON.parse(dataFile);
		}
		return output;
	} else {
		//TODO error handling if no config object
		return {};
	}
}

// The route-defining operation is publicly accessible.
module.exports = {
	compile: compile,
	fetchPageData: fetchPageData
};

//
var ensureDirectories = function(paths) {
	for (var i = 0; i < paths.length; i++) {
		if (!fs.existsSync(paths[i])) {
			fs.mkdirSync(paths[i]);
		}
	}
}

//
var createOutputDirectories = function() {
	// Ensure output directories exist
	var dirs = [
		tmp + config.paths.output_components,
		tmp + config.paths.output_global,
		tmp + config.paths.output_global_styles,
		tmp + config.paths.output_images,
		tmp + config.paths.output_pages
	];
	for (var i = 0; i < config.components.length; i++) {
		// Add to components array
		components[config.components[i].directory] = config.components[i];
		// Ensure directory
		dirs.push(tmp + config.paths.output_components + config.components[i].directory);
	}
	ensureDirectories(dirs);
}

// Handle CSS files
var processStyles = function() {
	var compiledCss = fs.readFileSync(config.paths.input_css, 'utf8').split('/*!==:cms:');
	compiledCss.forEach(function(cms, index) {
		var css = cms.split(':==!*/')[1];
		var type = cms.split(':==!*/')[0].split(':')[0];
		var name = cms.split(':==!*/')[0].split(':')[1];
		var directory = '';
		var isFile = false;

		if (name && type == 'component' && components[name] && components[name].css) {
			// Copy module specific CSS to each module's directory
			isFile = true;
			directory = tmp + config.paths.output_components + components[name].directory;
		} else if (name && type == 'global') {
			// Copy global CSS to global directory
			isFile = true;
			directory = tmp + config.paths.output_global_styles;
			globalIncludes.styles.push(name + '.css');
		}

		if (isFile) {
			// Make directory if it doesn't exist
			fs.outputFileSync(directory + '/' + name + '.css', css);
		}
	});
}

// Handle JS files
var processScripts = function() {
	var scriptFiles = fs.readdirSync(config.paths.input_scripts);

	// readdir returns directories as well, so let's remove those.
	scriptFiles.forEach(function(file) {
		if (fs.statSync(config.paths.input_scripts + file).isFile()) {
			var basename = path.basename(file, path.extname(file));
			if (file !== '.DS_Store' && !components[basename]) {
				fs.copySync(config.paths.input_scripts + file, tmp + config.paths.output_global_scripts + file);
				globalIncludes.scripts.push(file);
			}
		}
	});
}

// Handle Component HTML files
var processComponents = function() {
	for (var i = 0; i < config.components.length; i++) {
		var component = config.components[i];
		var directory = tmp + config.paths.output_components + component.directory;

		// Copy: hbs
		if (component['hbs']) {
			fs.copySync(config.paths.input_components + component.hbs, directory + '/' + component.hbs);
		}

		// Copy: json
		if (component['data']) {
			fs.copySync(config.paths.input_data + component.data, directory + '/' + component.data);
		}

		// Copy: js
		if (component['js']) {
			fs.copySync(config.paths.input_scripts + component.js, directory + '/' + component.js);
		}

		// Compile: hbs -> html
		var dataFile = component.data ? fs.readFileSync(config.paths.input_data + component.data, 'utf8') : {};
		compileComponent(
			component.directory,
			config.paths.input_components + component.hbs,
			JSON.parse(dataFile),
			tmp + config.paths.output_components + component.directory + '/' + component.html,
			tmp + config.paths.output_components + component.directory + '/' + component.directory + '-preview.html'
		);
	}
}

// Handle Page HTML files
var processPages = function() {
	var pages = [];

	// Convert key/value to array
	// TODO use lodash for this
	var pagesObj = config.pages;
	for (var key in pagesObj) {
		// Skip loop if the property is from prototype
		if (!pagesObj.hasOwnProperty(key)) continue;

		pages.push(key);
	}

	for (var i = 0; i < pages.length; i++) {
		var page = pagesObj[pages[i]];
		var dataFile = {};
		compilePage(
			pages[i],
			config.paths.input_pages + page.hbs,
			dataFile,
			tmp + config.paths.output_pages + page.html,
			page
		);
	}
}

//
var generateLayoutIncludes = function() {
	// Script includes
	for (var i = 0; i < globalIncludes.scripts.length; i++) {
		globalIncludes.outputScripts += '<script src="../global/js/' + globalIncludes.scripts[i] + '"></script>\r\n';
	}

	// Style includes
	for (var j = 0; j < globalIncludes.styles.length; j++) {
		globalIncludes.outputStyles += '<link rel="stylesheet" href="../global/css/' + globalIncludes.styles[j] + '" />\r\n';
	}
}

//
var processImages = function() {
	fs.copySync(config.paths.input_images, tmp + config.paths.output_images);
}

// Compile a partial
var compileComponent = function(name, inputPartial, data, outputHtml, outputHtmlPrev) {
	var component = fs.readFileSync(inputPartial);

	// Regular compile
	var template = hbs.compile(component.toString());
	var result = template(data);
	fs.writeFileSync(outputHtml, result);

	// TODO add handlers for no js or css
	var partialPre = [
		'{{#extend "' + components[name].layout + '"}}',
		'{{#content "styles"}}',
		globalIncludes.outputStyles,
		'<link rel="stylesheet" href="' + components[name].css + '" />',
		'{{/content}}',
		'{{#content "body"}}'
	].join('\r\n');

	var partialPost = [
		'{{#content "scripts"}}',
		globalIncludes.outputScripts,
		'<script src="' + components[name].js + '"></script>',
		'{{/content}}',
		'{{/content}}',
		'{{/extend}}'
	].join('\r\n');

	// Preview compile
	var templatePrev = hbs.compile(partialPre + component.toString() + partialPost);
	var resultPrev = templatePrev(data);
	fs.writeFileSync(outputHtmlPrev, resultPrev);
}

// Compile a page
var compilePage = function(name, inputPartial, data, outputHtml, pageObj) {
	var page = fs.readFileSync(inputPartial);

	// Regular compile
	var template = hbs.compile('{{#extend "' + pageObj.layout + '"}}{{#content "body"}}' + page.toString() + '{{/content}}{{/extend}}');
	var result = template(data);
	fs.writeFileSync(outputHtml, result);
}
