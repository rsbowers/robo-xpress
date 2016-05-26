var fs = require('fs-extra');
var Handlebars = require('handlebars');
var config = require('../roboconfig.json');

var compile = function() {

  // Create output directories
  if (!fs.existsSync(config.paths.output_components)){
    fs.mkdirSync(config.paths.output_components);
  }

  processComponents();
};

// The route-defining operation is publicly accessible.
module.exports = {
  compile: compile
};

// Private functions

var processComponents = function() {

  var processedComponents = {};

  for(var i = 0; i < config.components.length; i++) {
    var component = config.components[i];
    var d = component.directory
    processedComponents['welcome'] = component;

    // Create component directory
    var directory = config.paths.output_components + component.directory;
    if (!fs.existsSync(directory)){
      fs.mkdirSync(directory);
    }

    // Copy: hbs
    if(component['hbs']) {
      fs.copySync(config.paths.input_components + component.hbs, directory + '/' + component.hbs);
    }

    // Copy: json
    if(component['data']) {
      fs.copySync(config.paths.input_data + component.data, directory + '/' + component.data);
    }

    // Copy: js
    if(component['js']) {
      fs.copySync(config.paths.input_js + component.js, directory + '/' + component.js);
    }

    // Compile: hbs -> html
    var dataFile = component.data ? fs.readFileSync(config.paths.input_data + component.data, 'utf8') : {};
    compileComponent(config.paths.input_components + component.hbs, directory + '/' + component.html , JSON.parse(dataFile));
  }

  processStyles(processedComponents);
}

var processStyles = function(processedComponents) {
  console.log('processedComponents',processedComponents);
  var compiledCss = fs.readFileSync(config.paths.input_css, 'utf8').split('/*!==:cms:');
  compiledCss.forEach(function(cms, index){
    var css = cms.split(':==!*/')[1];
    var type = cms.split(':==!*/')[0].split(':')[0];
    var name = cms.split(':==!*/')[0].split(':')[1]

    // Copy module specific CSS to each module's directory
    if(name && type == 'module' && processedComponents[name] && processedComponents[name].css) {
      fs.outputFileSync(config.paths.output_components + processedComponents[name].directory + '/' + processedComponents[name].css, css)
    }

    // Copy global CSS to global directory
    // if(name && type == 'global') {
      // fs.outputFileSync(options.dist+'/cms/cms.'+type+'/css/'+name+'.css', css)
    // }
  })
}

var compileComponent = function(hbs, path, data) {
  var component = fs.readFileSync(hbs);
  var template = Handlebars.compile(component.toString());
  var result = template(data);
  fs.writeFileSync(path, result);
}
