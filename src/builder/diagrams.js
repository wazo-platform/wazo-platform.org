const { exec } = require('child_process');
const path = require('path');

export default async () => {
  // Retrieve all diagrams
  const diagramOutputDir = path.resolve('public/diagrams/');
  exec(`mkdir -p ${diagramOutputDir}`);
  exec(`rm -rf ${diagramOutputDir}/*`);
  await retrieveGithubFiles();

  // Generate puml to svg
  exec(
    `java -jar $JAVA_HOME/lib/plantuml.jar -tsvg /tmp/*.puml -o ${diagramOutputDir}`
  );
}
