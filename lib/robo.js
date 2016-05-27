var fs = require('fs-extra');
var hbs = require('handlebars');
var layouts = require('handlebars-layouts');
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

// Register helpers
hbs.registerHelper(layouts(hbs));

// Register partials
hbs.registerPartial('layout', fs.readFileSync(config.paths.input_hbs_layout_component, 'utf8'));

var compile = function() {
	createOutputDirectories();
	processStyles();
	processScripts();
	generateLayoutIncludes();
	processComponents();
};

// The route-defining operation is publicly accessible.
module.exports = {
	compile: compile
};

//
var createOutputDirectories = function() {
	// Create output directories
	// TODO store is loopable json
	if (!fs.existsSync(config.paths.output_components)) {
		fs.mkdirSync(config.paths.output_components);
	}
	if (!fs.existsSync(config.paths.output_global)) {
		fs.mkdirSync(config.paths.output_global);
	}
	if (!fs.existsSync(config.paths.output_global_styles)) {
		fs.mkdirSync(config.paths.output_global_styles);
	}
	for (var i = 0; i < config.components.length; i++) {
		components[config.components[i].directory] = config.components[i];
		// Create component directory
		var directory = config.paths.output_components + config.components[i].directory;
		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory);
		}
	}
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

		if (name && type == 'module' && components[name] && components[name].css) {
			// Copy module specific CSS to each module's directory
			isFile = true;
			directory = config.paths.output_components + components[name].directory;
		} else if (name && type == 'global') {
			// Copy global CSS to global directory
			isFile = true;
			directory = config.paths.output_global_styles;
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
				fs.copySync(config.paths.input_scripts + file, config.paths.output_global_scripts + file);
				globalIncludes.scripts.push(file);
			}
		}
	});
}

// Handle HTML files
var processComponents = function() {
	for (var i = 0; i < config.components.length; i++) {
		var component = config.components[i];
		var directory = config.paths.output_components + component.directory;

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
			config.paths.output_components + component.directory + '/' + component.html,
			config.paths.output_components + component.directory + '/' + component.directory + '-preview.html'
		);
	}
}

//
var generateLayoutIncludes = function() {
	// Script includes
	for(var i=0; i<globalIncludes.scripts.length; i++) {
			globalIncludes.outputScripts += '<script src="../global/js/' + globalIncludes.scripts[i] + '"></script>\r\n';
	}

	// Style includes
	for(var j=0; j<globalIncludes.styles.length; j++) {
			globalIncludes.outputStyles += '<link rel="stylesheet" href="../global/css/' + globalIncludes.styles[j] + '" />\r\n';
	}
}

// Compile a partial
var compileComponent = function(name, inputPartial, data, outputHtml, outputHtmlPrev) {
	var component = fs.readFileSync(inputPartial);

	// Regular compile
	var template = hbs.compile(component.toString());
	var result = template(data);
	fs.writeFileSync(outputHtml, result);

	console.log(components[name]);

	// TODO add handlers for no js or css
	var partialPre = [
		'{{#extend "layout"}}',
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
