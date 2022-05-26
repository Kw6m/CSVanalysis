/**
Example JSON:
{
    "Timestamp": "5/8/2022 16:31:23",
    "What is your gender": "Male",
    "What is your age": "36-50",
    "What continent do you live on": "North America",
    "Do you identify with any of these communities?": "LGBT",
    "What is your sexuality": "Gay",
    "Education level": "Secondary education (No diploma)",
    "Are you a virgin? If so skip the next question": "No",
    "Have you practiced any fetishes during sex? If so specify.": "Yes - watersports, Dom/sub, financial sub",
    "Please select any fetishes you enjoy": "Wax, Masochism, Urine, Cum play, Voyeurism, Exhibitionism, Cuckholding, Forced orgasm, Orgasm control, 24/7 power play, Power play, Humiliation, Role play, Male anal play, Financial Sub",
    "What is your ethnicity": "White"
}
**/
// Parse JSON (csv.json) into categories. Allow for searches of multiple categories and return back matching entries.
function isMap(map) {
    if (
      map &&
      typeof map.clear === 'function' &&
      typeof map.delete === 'function' &&
      typeof map.get === 'function' &&
      typeof map.has === 'function' &&
      typeof map.set === 'function'
    ) {
      return true;
    }
  
    return false;
  }
const fs = require('fs');
const discord = require('discord.js');
const client = new discord.Client();

client.on('ready',() => {
    //console.log('Client is logged in!');
});

function safeParseJson(file) {
 try {
    let json = fs.readFileSync(file, 'utf8');
    let parsed = JSON.parse(json);
    return parsed
 }catch(e) {
    //console.log(e);
    return null;
 }
}

const data = safeParseJson('csv.json');

function findSpecificKinks(data, kinks) { /// kinks must be an array, the fetishes stored in json are to be split by a comma
    let results = new Map();
    // detect if data is a map and if so, use the map
    if (isMap(data)) {
        //console.log(data.size)
        for(let i = 0; i < data.size; i++) {
            //console.log(i, data.get(i));
            let entry = data.get(i)
            if (entry) {
            let fetishes = entry["Please select any fetishes you enjoy"].split(', ');
            for(let j = 0; j < fetishes.length; j++) {
                if (kinks.includes(fetishes[j])) {
                    results.set(i, entry);
                }
            }
        }
        }
    
    } else {
    for(let i = 0; i < data.length; i++) {
        let entry = data[i];
        let fetishes = entry['Please select any fetishes you enjoy'].split(', ');
        for (let j = 0; j < kinks.length; j++) {
            //console.log(kinks[j])
            let kink = kinks[j];
            if (fetishes.includes(kink)) {
                results.set(i, entry);
            }
        }
    }
}
    return results;

}
function sortByAgeGroup(data,agegroup) {

    let results = new Map();
    // detect if data is a map and if so, use the map
    if (isMap(data)) {
        //console.log(data.size)
        for(let i = 0; i < data.size; i++) {
            //console.log(i, data.get(i));
            let entry = data.get(i)
            if (entry) {
            
            let age = entry["What is your age"];
            if (agegroup.includes(age)) {
                results.set(i, entry);
            }
        }
        }
    }else{
    for(let i = 0; i < data.length; i++) {
        let entry = data[i];
        let age = entry['What is your age'];
        if (age == agegroup) {
            results.set(i, entry);
        }
    }
}
    return results;
}

function sortByGender(data,gender) {
    let results = new Map();
    // detect if data is a map and if so, use the map
    if (isMap(data)) {
        //console.log(data.size)
        for(let i = 0; i < data.size; i++) {
            //console.log(i, data.get(i));
            let entry = data.get(i)
            if (entry) {
            let age = entry["What is your gender"];
            console.log(gender.includes(age))
            if (gender.includes(age)) {
                results.set(i, entry);
            }
        }
        return results;
        }
    }else{
    for(let i = 0; i < data.length; i++) {
        let entry = data[i];
        let age = entry['What is your gender'];
        if (age == gender) {
            results.set(i, entry);
        }
    }
    return results;
}
}

////console.log(sortByAgeGroup(data,'18-22').entries())
console.log(findSpecificKinks(sortByAgeGroup(sortByGender(data,'Other'),"18-22"),["Knots"]));