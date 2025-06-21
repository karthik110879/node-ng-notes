const { v4: uuidv4 } = require('uuid');


const generateId = (type) => {
    if(!type) {
        console.log('Need a Type to generate Id');
        return null;
    } 
    return `${type}_${uuidv4()}`; 
}

module.exports = generateId;