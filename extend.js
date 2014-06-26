//https://github.com/omgftw/extend.js

var initOptions = function (options, defaults) {
    var options = options ? options : new Object;
    var defaults = defaults ? defaults : new Object;

    typeof defaults.caseSensitive === "undefined" || defaults.caseSensitive === null ? defaults.caseSensitive = false : null;
    typeof defaults.delimiter === "undefined" || defaults.delimiter === null ? defaults.delimiter = "," : null;
    typeof defaults.deepSearch === "undefined" || defaults.deepSearch === null ? defaults.deepSearch = false : null;

    typeof options.caseSensitive === "undefined" || options.caseSensitive === null ? options.caseSensitive = defaults.caseSensitive : null;
    typeof options.delimiter === "undefined" || options.delimiter === null ? options.delimiter = defaults.delimiter : null;
    typeof options.deepSearch === "undefined" || options.deepSearch === null ? options.deepSearch = defaults.deepSearch : null;

    return options;
};

String.prototype.padLeft = function (char, length, options) {
    if (typeof char === "string" && typeof length === "number" && length >= 1) {
        var tempString = "";
        var loops = Math.floor((length - this.length) / char.length);
        for (var i = 0 ; i < loops; i++) {
            tempString += char;
        }
        var curLength = this.length + tempString.length;
        if (curLength < length) {
            tempString += char.substring(0, (length - curLength));
        }
        return tempString + this;
    } else {
        return this.toString();
    }
};

String.prototype.padRight = function (char, length, options) {
    if (typeof char === "string" && typeof length === "number" && length >= 1) {
        var tempString = "";
        var loops = Math.floor((length - this.length) / char.length);
        for (var i = 0 ; i < loops; i++) {
            tempString += char;
        }
        var curLength = this.length + tempString.length;
        if (curLength < length) {
            tempString += char.substring(0, (length - curLength));
        }
        return this + tempString;
    } else {
        return this.toString();
    }
};

Function.prototype.perfTest = function (loops, obj, returnExecutionsPerSecond, options) {
    var args = [].splice.call(arguments, 3);
    var start = new Date();
    for (var i = 0; i < loops; i++) {
        this.apply(obj, args);
    }
    var end = new Date();
    var timeTaken = end - start;
    if (returnExecutionsPerSecond) {
        return Math.floor((1000 / timeTaken) * loops);
    } else {
        return timeTaken;
    }
};

var isNumeric = function (number, options) {
    return (!isNaN(number) && isFinite(number));
}

String.prototype.replaceChar = function(char, index, options) {
    if (index >= 0 && index < this.length) {
        var str = this.split("");
		char.length > 1 ? char = char.charAt(0) : null;
        str[index] = char;
        return str.join("");
    }
    return this;
}

String.prototype.replaceChars = function (char, startIndex, length, options) {
    if (startIndex >= 0 && length >= 0 && startIndex < this.length) {
        startIndex + length <= this.length ? null : length = this.length - startIndex;
        var returnValue = this;
        for (var i = startIndex; i < startIndex + length; i++) {
            returnValue = returnValue.replaceChar(char, i, options);
        }
        return returnValue
    }
    return this;
}

String.prototype.indicesOf = function (searchString, options) {
    if (typeof input === "undefined" || input === null || input === "") { return []; }
    var options = initOptions(options, { caseSensitive: false });
    var startPoint = 0;
    var result = -1;
    var indices = [];
    if (options.caseSensitive) {
        while ((result = this.indexOf(searchString, startPoint)) > -1) {
            indices.push(result);
            startPoint = result + searchString.length;
        }
    } else {
        while ((result = this.toLowerCase().indexOf(searchString.toLowerCase(), startPoint)) > -1) {
            indices.push(result);
            startPoint = result + searchString.length;
        }
    }
    return indices;
}

String.prototype.startsWith = function (input, options) {
    if (typeof input === "undefined" || input === null || input === "") { return false; }
    var options = initOptions(options, { caseSensitive: false });
    return options.caseSensitive ? this.indexOf(input) == 0 : this.toLowerCase().indexOf(input.toLowerCase()) == 0;
};

String.prototype.endsWith = function (input, options) {
    if (typeof input === "undefined" || input === null || input === "") { return false; }
    var options = initOptions(options, { caseSensitive: false });
    return options.caseSensitive ? this.indexOf(input) == this.length - input.length : this.toLowerCase().indexOf(input.toLowerCase()) == this.length - input.length;
};

String.prototype.contains = function (input, options) {
    if (typeof input === "undefined" || input === null || input === "") { return false; }
    var options = initOptions(options, { caseSensitive: false });
    return options.caseSensitive ? (this.indexOf(input) !== -1) : (this.toLowerCase().indexOf(input.toLowerCase()) !== -1);
};

String.prototype.toCharArray = function (options) {
    var chars = [];
    for (var i = 0; i < this.length; i++) {
        chars.push(this.charAt(i));
    }
    return chars;
};

String.prototype.repeat = function (repeatAmount, options) {
    if (typeof repeatAmount === "undefined" || repeatAmount === null) { return this; }
    var returnString = "";
    for (var i = 0; i < repeatAmount; i++) {
        returnString += this;
    }
    return returnString;
};

String.prototype.append = function (input, options) {
    if (typeof input === "undefined" || input === null || input === "") { return this; }
    var options = initOptions(options, { caseSensitive: false, delimiter: "" });
    var input = input instanceof Array ? input.join(options.delimiter) : input;
    return this + input;
};

String.prototype.prepend = function (input, options) {
    if (typeof input === "undefined" || input === null || input === "") { return this; }
    var options = initOptions(options, { caseSensitive: false, delimiter: "" });
    var input = input instanceof Array ? input.join(options.delimiter) : input;
    return input + this;
};

Array.prototype.equals = function (comparisonArray, options) {
    if (typeof comparisonArray === "undefined" || comparisonArray === null || !comparisonArray instanceof Array) { return false; }
    if (this.length !== comparisonArray.length) {
        return false;
    }
    for (var i = 0; i < this.length; i++) {
        if (this[i] instanceof Array && comparisonArray[i] instanceof Array) {
            if (this[i].equals(comparisonArray[i]) === false) {
                return false;
            }
        } else if (this[i] != comparisonArray[i]) {
            return false;
        }
    }
    return true;
};

Array.prototype.contains = function (input, options) {
    if (typeof input === "undefined" || input === null) { return false; }
    var options = initOptions(options, { caseSensitive: false, deepSearch: true });
    for (var i = 0; i < this.length; i++) {
        if (options.caseSensitive === false && typeof this[i] === "string" && typeof input === "string") {
            if (this[i].toLowerCase() == input.toLowerCase()) {
                return true;
            }
        } else {
            if (this[i] instanceof Array) {
                if (input instanceof Array && this[i].equals(input)) {
                    return true;
                } else if (options.deepSearch === true) {
                    if (this[i].contains(input)) {
                        return true;
                    }
                }
            }
            if (this[i] == input) {
                return true;
            }
        }
    }
    return false;
};