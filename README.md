extend.js
=========
A library that extends base JavaScript functionality


Documentation:

String
	
	String.startsWith
		Description: Checks to see if the selected string starts with the given input.
		Usage: String.startsWith(input, options)
		Return Type: boolean
		Options:
			caseSensitive: boolean (default: false)
		Usage Examples: 
			"test".startsWith("te"); 
				Returns true
			"test".startsWith("st"); 
				Returns false
			"test".startsWith("tex"); 
				Returns false
			"test".startsWith("TE"); 
				Returns true
			"test".startsWith("TE", {caseSensitive: true}); 
				Returns false

	String.endsWith
		Description: Checks to see if the selected string ends with the given input.
		Usage: String.endsWith(input, options)
		Return Type: boolean
		Options:
			caseSensitive: boolean (default: false)
		Usage Examples: 
			"test".endsWith("te"); 
				Returns false
			"test".endsWith("st"); 
				Returns true
			"test".endsWith("tex"); 
				Returns false
			"test".endsWith("ST"); 
				Returns true
			"test".endsWith("ST", {caseSensitive: true}); 
				Returns false
				
	String.contains
		Description: Checks to see if the selected string contains the given input.
		Usage: String.contains(input, options)
		Return Type: boolean
		Options:
			caseSensitive: boolean (default: false)
		Usage Examples:
			"test".contains("te");
				Returns true
			"test".contains("tex");
				Returns false
			"test".contains("TE");
				Returns true
			"test".contains("TE", {caseSensitive: true});
				Returns false
				
	String.padLeft
		Description: Pads a string to a set amount of character using defined characters
		Usage: String.padLeft(character[s], integer)
		Return Type: string
		Usage Examples:
			"string".padLeft("0", 15);
				Returns "000000000string"
			"string".padLeft("0a", 15);
				Returns "0a0a0a0a0string"
				
	String.padRight
		Description: Pads a string to a set amount of character using defined characters
		Usage: String.padRight(character[s], integer)
		Return Type: string
		Usage Examples:
			"string".padRight("0", 15);
				Returns "string000000000"
			"string".padRight("0a", 15);
				Returns "string0a0a0a0a0"
				
	String.replaceChar
		Description: Allows replacement of a character at the specified index in a string
		Usage: String.replaceChar(char, index)
		Return Type: string
		Usage Example:
			"texting".replaceChar("s", 2); 
				Returns "testing"
				
	String.replaceChars
		Description: Allows replacement of a specified number of character from a specified index. Builds upon replaceChar()
		Usage: String.replaceChars(char, startIndex, length) //length is inclusive of the starting index
		Return Type: string
		Usage Example:
			"texting".replaceChars("+", 2, 3);
				Returns "te+++ng"
				
	String.indicesOf
		Description: Finds all occurrences of a specified string within another string. Builds upon indexOf()
		Usage: String.indicesOf(searchString, options)
		Return Type: object (Array)
		Options:
			caseSensitive: boolean (default: false)
		Usage Example:
		"texting".indicesOf("T"); 
			Returns [0, 3]
		"texting".indicesOf("T", {caseSensitive: true});
			Returns [];

	String.append
		Description: Appends the given text to the string
		Usage: String.append(appendString, options)
		Return Type: string
		Options:
			delimiter: string (specifies which character should seperate items if an array as passed, default: "")
		Usage Example:
		"test".append("ing");
			Returns "testing"
		"test".append(["ing", "if", "this", "works"]);
			Returns "testingifthisworks"
		"test".append(["ing", "if", "this", "works"], {delimiter: " "});
			Returns "testing if this works"
Number
	
	isNumeric
		Description: Checks to see if the input is a number.
		Usage: isNumeric(input); 
		Return Type: boolean
		Usage Example: 
		isNumeric(12); 
			Returns true
		isNumeric("12"); 
			Returns true (due to automatic casting)
		isNumeric("test"); 
			Returns false
			
Array

	Array.contains
		Description: Checks to see if the selected array contains the given input.
		Usage: [].contains(input, options); 
		Return Type: boolean
		Options:
			caseSensitive: boolean (default: false, Only works for strings)
		Usage Examples: 
			[1,2,3,4,5].contains("te"); 
				Returns false
			[1,2,3,4,5].contains(5); 
				Returns true
			[1,2,3,4,5].contains("5"); 
				Returns true (due to automatic casting)
			["test", "other"].contains("TEST");
				Returns true
			["test", "other"].contains("TEST", {caseSensitive: true});
				Returns false
			
Function

	Function.perfTest
		Description: Allows for easy performance testing of functions returning time taken in milliseconds (less is better) or the amount of executions per second (more is better). The specified function can ran multiple times for performance testing smaller functions. You can also optionally pass the object the function is to be called on.
		Usage: Function.perfTest(timesToExecute, executionObject, returnExecutionsPerSecond, arg1, arg2, arg3...)
		Return Type: number
		Usage Examples:
			var myFunc = function(input1, input2);
			myFunc.perfTest(1, null, false, "input1", "input2"); //will run once and display the time it took in ms
			myFunc.perfTest(10, null, true, "input1", "input2"); //will run 100 times and display how many times it can run per second.
			
			var myArray = [];
			myArray.push.perfTest(10, myArray, true, "value"); //will insert the string "value" 10 times into "myArray" and display how many times it can run per second.
			[].push.perfTest(10, myArray, true, "value"); //will have the same result as the code on the line above.