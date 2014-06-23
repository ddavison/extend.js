//https://github.com/omgftw/extend.js

var initOptions = function (options, defaultCaseSensitive) {
    var options = options ? options : Object;
    options.caseSensitive ? null : options.caseSensitive = defaultCaseSensitive;
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
    var options = initOptions(options, false);
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
    var options = initOptions(options, false);
    return options.caseSensitive ? this.indexOf(input) == 0 : this.toLowerCase().indexOf(input.toLowerCase()) == 0;
};

String.prototype.endsWith = function (input, options) {
    var options = initOptions(options, false);
    return options.caseSensitive ? this.indexOf(input) == this.length - input.length : this.toLowerCase().indexOf(input.toLowerCase()) == this.length - input.length;
};

String.prototype.contains = function (input, options) {
    var options = initOptions(options, false);
    return options.caseSensitive ? (this.indexOf(input) !== -1) : (this.toLowerCase().indexOf(input.toLowerCase()) !== -1);
};

Array.prototype.contains = function (input, options) {
    options = initOptions(options, false, true);
    for (var i = 0; i < this.length; i++) {
        if (options.caseSensitive === false && typeof this[i] === "string" && typeof input === "string") {
            if (this[i].toLowerCase() == input.toLowerCase()) {
                return true;
            }
        } else {
            if (this[i] == input) {
                return true;
            }
        }
    }
    return false;
};