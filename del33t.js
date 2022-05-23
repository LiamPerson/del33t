// Only edit this v
const d1ct10n4ry = {
    a: ["4", "@", '*'],
    b: ['8'],
    e: ['3', '*'],
    f: ['ph'],
    g: ['6'],
    i: ["1", "!", "l", "|", '*'],
    l: ["1", "!", "|"],
    o: ['0', '*'],
    s: ['5', 'z', '$'],
    t: ['7', '+'],
    u: ['v', '4', '*'],
    " ": ["_", "-"],
}
// Only edit this ^

// Construct `overlapping letter` & `no-overlapping letter` combination maps
let allL33tLetters = [...new Set(Object.values(d1ct10n4ry).reduce((prev, cur) => [...prev, ...cur], []))];
let overlap = {} // Map of l33t character => [actual letters] ...  e.g: { 4: ['a', 'u'] }
let noOverlap = {} // Map of l33t character => actual character ... e.g: { 5: 's' }
for(let l3773r of allL33tLetters) {
    l3773r = l3773r.toLowerCase();
    let instances = [];
    // Search for l33t letter in main dictionary for instances. There is 1 per letter.
    for(const letter of Object.keys(d1ct10n4ry)) {
        if(d1ct10n4ry[letter].includes(l3773r)) instances.push(letter);
    }
    // If the letter is part of the alphabet, add itself as an instance of what it could be
    if(l3773r !== l3773r.toUpperCase()) instances.push(l3773r)
    // If there is more than 1 letter it could be
    if(instances.length > 1) {
        overlap[l3773r] = instances;
    } else {
        noOverlap[l3773r] = instances[0];
    }
}

// Anything above here can be stored in a file or memory. This just 
// constructs the overlap and noOverlap maps.




/**
 * De-l33tifies a string into its possibilities. 1337 => [leet, ieet]
 * @param {String} string 
 * @param {Number} accuracy How many permutation attempts you want to try per overlap letter.
 * @returns {Array.<String>}
 */
function del33t(string, accuracy = 10) {
    // Convert all non-ambiguous letters
    for(const noOverlapChar of Object.keys(noOverlap)) {
        string = string.replaceAll(noOverlapChar, noOverlap[noOverlapChar]);
    }
    // Get overlapChars in string with their locations
    const charLocations = {};
    for(const overlapChar of Object.keys(overlap)) {
        let lastLocation = 0;
        if(string.includes(overlapChar)) {
            charLocations[overlapChar] = [];
            while(string.includes(overlapChar, lastLocation)) {
                const index = string.indexOf(overlapChar, lastLocation);
                charLocations[overlapChar].push(index);
                lastLocation = index + overlapChar.length;
            }
        } 
    }
    // Collect permutations
    // Collect first permutations set
    // Get first overlap character
    let firstKey = Object.keys(charLocations)[0];
    delete charLocations[firstKey];
    let permutations = replaceXRand(string, firstKey, overlap[firstKey], accuracy);
    for(const overlapChar of Object.keys(charLocations)) {
        // Search every permutation
        for(const permutation of permutations) {
            permutations = [...permutations, ...replaceXRand(permutation, overlapChar, overlap[overlapChar], accuracy)];
        }
    }
    return permutations;
}

/**
 * Attempts to collect all possible "translations" of a word from l33t sp33k.
 * @param {String} str 
 * @param {String} searchFor 
 * @param {Array} replaceWith A array of strings of what you could replace the searchFor item with.
 * @param {Number} amount How many times you want to attempt permutation
 * @returns {Array} 
 */
 function replaceXRand(str, searchFor, replaceWith, amount = 10) {
    const occurrences = (str.match(new RegExp(escapeRegex(searchFor), "g")) || []).length;
    if(occurrences === 0) return [];
    const possibleCombinations = occurrences * replaceWith.length;

    // Define order of replacement for all sets
    const replacementSets = new Set();
    for(let j = 0; j < amount; j++) {
        if([...replacementSets].length === possibleCombinations) break; // Max possible combinations reached
        // Define order of replacement
        const replacementOrder = [];
        for(let i = 0; i < occurrences; i++) {
            replacementOrder[i] = replaceWith[Math.floor(Math.random() * replaceWith.length)];
        }
        replacementSets.add(JSON.stringify(replacementOrder));
    }

    const combinations = new Set();
    for(const replacementSet of replacementSets) {
        const replacementOrder = JSON.parse(replacementSet);
        let replacedStr = str;
        // Replace string in decided order and add to combinations
        for(let i = 0; i < replacementOrder.length; i++) {
            replacedStr = replacedStr.replace(searchFor, replacementOrder[i]);
        }
        combinations.add(replacedStr);

    }
    return [...combinations];
}

/**
 * Escapes characters for use in Regular Expressions.
 * @param {String} string 
 * @returns {String}
 */
function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export default del33t;