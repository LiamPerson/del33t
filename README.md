# del33t
<h3>Convert l33t word into arrays of all possible translations of said l33t word</h3>

<hr>

Built for use in NodeJS although you can modify 
```js
module.exports = l33tify;
``` 
to 
```js
export default l33tify;
```
to use this in any JavaScript application.


# Example usage:
```js
const del33t = require('./del33t'); // Require the .js file
const strangeWord = "h0vs*";
console.log("Normal...ish words:", del33t(boringWords));
/*
Normal...ish words: [
  'hovsi', 'hovsu',
  'hovsa', 'hovse',
  'hovsi', 'housi',
  'housu', 'hovsu',
  'housa', 'hovsa',
  'hovse', 'house' <-- found it
]
*/
```

# Modifying for your own use
Letters are converted based on the dictionary. The dictionary is found in `del33t.js` and you can add or remove letter translations by 
adding or removing to the **d1ct10n4ry** object.

# Default Dictionary
```js
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
}
```
