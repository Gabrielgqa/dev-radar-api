module.exports = function stringAsArray(arrayAsString){
  return arrayAsString.split(',').map(tech => tech.trim());
}