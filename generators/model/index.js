var yeoman = require('yeoman-generator');
var fs = require('fs');

module.exports = yeoman.generators.Base.extend({
  initializingStep: function() {
    this.questions = [];
    this.modelName = 'model';
    this.modelClassName = 'ClassName';
    this.modelInstanceName = 'instanceName';
    this.modelFolderPath = 'groupName';
    this.modelRequirePathFromTest = '';
  },

  promptingStep: function() {
    this.questions.push({ type    : 'input',
                          name    : 'modelName',
                          message : 'model Name (dash delimited, leave off -model)',
                          default : this.modelName });

    this.questions.push({ type    : 'input',
                          name    : 'modelFolderPath',
                          message : 'model Folder Path (relative path, no starting or training slashes)',
                          default :  this.modelFolderPath });

    var done = this.async();

    var generator = this;

    var handleAnswers = function(answers) {
      generator.modelName = answers.modelName.toLowerCase();
      generator.modelClassName = generator._.classify(answers.modelName);
      generator.modelInstanceName = generator._.camelize(generator.modelName);
      generator.modelFolderPath = answers.modelFolderPath.toLowerCase();
      generator.modelRequirePathFromTest = getTestRequirePrefix(generator.modelFolderPath) + 'app/models/' + generator.modelFolderPath + '/' + generator.modelName + '-model';

      done();
    };

    this.prompt(this.questions, handleAnswers.bind(this));
  },

  configuringStep: function() {
  },

  defaultStep: function() {
  },

  writingStep: function() {
    copymodel(this);
    copymodelTest(this);
  },

  conflictsStep: function() {
  },

  installStep: function() {
  },

  endStep: function() {
  }
});

function getTestRequirePrefix(modelFolderPath) {
  var requirePrefix = '../../../';

  if(modelFolderPath.length !== 0) {
    var folderCount = (modelFolderPath.match(/\//g) || []).length + 1;

    for(var i = 0; i < folderCount; i++) {
      requirePrefix = '../' + requirePrefix;
    }
  }

  return requirePrefix;
}

function copymodel(generator) {
  var modelDestination = generator.destinationRoot() +
                              '/app/models/' +
                              generator.modelFolderPath +
                              '/' +
                              generator.modelName.toLowerCase() +
                              '-model.js';

  copyTemplate(generator, 'app/models/_model.js', modelDestination);
}

function copymodelTest(generator) {
  var modelTestDestination = generator.destinationRoot() +
                                  '/test/spec/models/' +
                                  generator.modelFolderPath +
                                  '/' +
                                  generator.modelName.toLowerCase() +
                                  '-model.tests.js';

  copyTemplate(generator, 'test/spec/models/_model.tests.js', modelTestDestination);
}

function copyTemplate(generator, template, path) {
  if(fs.existsSync(path)) {
    console.log('The file "' + path + '" already exists!');
  }
  else {
    generator.template(template, path);
  }
}
