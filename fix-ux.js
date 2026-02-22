const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'src', 'app'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Contrast fixes for readability
    content = content.replace(/text-foreground\/40/g, 'text-foreground/60');
    content = content.replace(/text-foreground\/50/g, 'text-foreground/70');
    content = content.replace(/text-white\/40/g, 'text-foreground/60');
    content = content.replace(/text-white\/50/g, 'text-foreground/70');

    // Primary button typography fixes
    content = content.replace(/bg-primary text-black/g, 'bg-primary text-primary-foreground');
    content = content.replace(/bg-primary border-primary text-black/g, 'bg-primary border-primary text-primary-foreground');
    content = content.replace(/group-hover:bg-primary group-hover:text-black/g, 'group-hover:bg-primary group-hover:text-primary-foreground');
    content = content.replace(/hover:text-black/g, 'hover:text-primary-foreground');

    // Glow reduction to prevent "dirty" white backgrounds
    content = content.replace(/bg-primary\/20(?=.*?blur)/g, 'bg-primary/5');
    content = content.replace(/bg-secondary\/20(?=.*?blur)/g, 'bg-secondary/5');

    // Background card contrast depth adjustments
    content = content.replace(/bg-card\/20/g, 'bg-card');

    if (original !== content) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
console.log('Done!');
