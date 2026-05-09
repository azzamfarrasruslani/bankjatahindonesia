const fs = require('fs');
const path = require('path');

const featuresPath = path.join(process.cwd(), 'src', 'features');

if (!fs.existsSync(featuresPath)) {
  console.error('Features path not found: ' + featuresPath);
  process.exit(1);
}

const features = fs.readdirSync(featuresPath).filter(f => fs.statSync(path.join(featuresPath, f)).isDirectory());

features.forEach(feat => {
  const indexPath = path.join(featuresPath, feat, 'index.ts');
  if (fs.existsSync(indexPath)) {
    let content = fs.readFileSync(indexPath, 'utf8');
    
    // Replace export * from './components/FileName' with export { default as FileName } from './components/FileName'
    const newContent = content.replace(/export \* from '\.\/components\/([^']+)'/g, (match, p1) => {
      // Check if file exists to be safe
      const compPath = path.join(featuresPath, feat, 'components', p1 + '.tsx');
      if (fs.existsSync(compPath)) {
        const compContent = fs.readFileSync(compPath, 'utf8');
        if (compContent.includes('export default')) {
          return "export { default as " + p1 + " } from './components/" + p1 + "'";
        }
      }
      return match;
    });

    if (content !== newContent) {
      fs.writeFileSync(indexPath, newContent);
      console.log("Updated index.ts for feature: " + feat);
    }
  }
});
