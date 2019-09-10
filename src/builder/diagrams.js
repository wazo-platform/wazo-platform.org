const { execSync } = require('child_process');
const path = require('path');

module.exports = async () => {
  // Retrieve all diagrams
  const diagramOutputDir = path.resolve('./public/diagrams/');
  execSync(`mkdir -p ${diagramOutputDir}`);
  execSync(`rm -rf ${diagramOutputDir}/*`);

  // Generate puml to svg
  execSync(`
    for f in $(find content -name '*.puml'); do cp $f ${diagramOutputDir}/$(basename $(dirname $f))-$(basename $f); done; 
    java -jar $JAVA_HOME/lib/plantuml.jar -tsvg ${diagramOutputDir}/*.puml; rm -f ${diagramOutputDir}/*.puml
  `);
};
