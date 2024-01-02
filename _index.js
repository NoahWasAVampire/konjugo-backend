var fs = require('fs'),
    path = require('path'),    
    filePath = path.join(__dirname, 'spa');


var array = fs.readFileSync(filePath).toString().split("\n");

var lemmas = [];

var commands = [];

let inserts = 0;
for(i in array) {
    array[i] = array[i].split("\t");

    if(!lemmas.includes(array[i][0])){
        lemmas.push(array[i][0]);
    }
}

for(i in lemmas) {
    commands.push(`insert into word (lemma, translated) values('${lemmas[i].replace("'","")}', '');`);
}

for(i in array) {
    if(array[i].length > 2) {

        if(array[i][2].startsWith("V"))
            commands.push(`insert into flection (wordId, flected, attributes) SELECT wordId,'${array[i][1].replace("'","")}','${array[i][2]}' from word where lemma = '${array[i][0]}';`)
            
    }
};


console.log("sw");
var file = fs.createWriteStream('inserts.sql');
file.on('error', function(err) { /* error handling */ });
commands.forEach(function(v) { file.write(`${v}\n`); });
file.end();


console.log("fertig");

/*
console.log("start 1");
db.serialize(() => {
    for(i in lemmas) {
        db.run(`insert into word (lemma, translated) values('${lemmas[i]}', '')`);
    }

    console.log("done first");
});

db.close();

for(i in array) {
    if(array[i].length > 2) {
        db.serialize(()=>{
            db.run(`insert into flections (word_id, written, 'attributes') SELECT word_id,'${array[i][1]}','${array[i][2]}' from word where lemma = '${array[i][0]}'`, (err)=>{
                console.log(err);
            });
        });
        db.close();
    }
}
*/


