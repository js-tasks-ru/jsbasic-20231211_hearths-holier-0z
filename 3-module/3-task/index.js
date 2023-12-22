function camelize(str) {
    let symbols = str.split('');

    symbols.map(function(item, index, array) {
        if(item === "-") {
            array.splice(index, 1);
            array[index] = (array[index].toUpperCase());
        }
    });

    return symbols.join('');
}
