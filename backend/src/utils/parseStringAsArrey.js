module.exports = function parseStringAsArrey(arrayAsString) {
    return arrayAsString.split(',').map(tech => tech.trim());
}