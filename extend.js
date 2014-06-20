//https://github.com/omgftw/extend.js

String.prototype.padLeft = function (char, length) {
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

String.prototype.padRight = function (char, length) {
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

Function.prototype.perfTest = function (loops, obj, returnExecutionsPerSecond) {
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

var isNumeric = function (number) {
    return (!isNaN(number) && isFinite(number));
}

String.prototype.replaceChar = function(char, index) {
    if (index >= 0 && index < this.length) {
        var str = this.split("");
		char.length > 1 ? char = char.charAt(0) : null;
        str[index] = char;
        return str.join("");
    }
    return this;
}

String.prototype.replaceChars = function (char, startIndex, length) {
    if (startIndex >= 0 && length >= 0 && startIndex < this.length) {
        startIndex + length <= this.length ? null : length = this.length - startIndex;
        var returnValue = this;
        for (var i = startIndex; i < startIndex + length; i++) {
            returnValue = returnValue.replaceChar(char, i);
        }
        return returnValue
    }
    return this;
}

String.prototype.indicesOf = function (searchString) {
    var startPoint = 0;
    var result = -1;
    var indices = [];
    while ((result = this.indexOf(searchString, startPoint)) > -1) {
        indices.push(result);
        startPoint = result + searchString.length;
    }
    return indices;
}

String.prototype.startsWith = function (input) {
    return this.indexOf(input) == 0;
};

String.prototype.endsWith = function (input) {
    return this.indexOf(input) == this.length - input.length;
};

String.prototype.contains = function(input) {
	return (this.indexOf(input) !== -1);
};

Array.prototype.contains = function (input) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == input) {
            return true;
        }
    }
    return false;
};