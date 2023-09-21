// Assignment code here
// GIVEN I need a new, secure password
// WHEN I click the button to generate a password
// THEN I am presented with a series of prompts for password criteria
// WHEN prompted for password criteria
// THEN I select which criteria to include in the password
// WHEN prompted for the length of the password
// THEN I choose a length of at least 8 characters and no more than 128 characters
// WHEN asked for character types to include in the password
// THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
// WHEN I answer each prompt
// THEN my input should be validated and at least one character type should be selected
// WHEN all prompts are answered
// THEN a password is generated that matches the selected criteria
// WHEN the password is generated
// THEN the password is either displayed in an alert or written to the page

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

//copied function from MDN
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
// function for yes or no prompt so store user decisions about whether they want lowercase, uppercase, special, or numeric characters
function promptYesNo(prompt){
  if (window.confirm(prompt)) {
    return true;
  }
  return false;
}
// function that prompts the user to enter a number between 8 and 128 and then confirms that the input is within the valid range
function generatePassword(){
  const numberOfCharacters = prompt("Please the length of your password that is between 8 and 128 characters");
  if (isNaN(numberOfCharacters)){
    alert("Please enter a number between 8 and 128");
    return "";
  }
  const passwordLength = parseInt(numberOfCharacters,10);
// confirming the password length
  if (passwordLength < 8 || passwordLength > 128) {
    alert("Please enter a number between 8 and 128");
    return "";
  }
  // prompting with YesNo function that will store user choice
  const includeLowerCase = promptYesNo("Do you want your password to include lowercase?");
  
  const includeUpperCase = promptYesNo("Do you want your password to include uppercase?");
 
  const includeNumericCharacters =  promptYesNo("Do you want your password to include numeric?");
  
  const includeSpecialCharacters = promptYesNo("Do you want your password to include special?");
// confirming that at least one character type is selected, otherwise no password would be generated
  if (!includeLowerCase && !includeUpperCase && !includeNumericCharacters && !includeSpecialCharacters){
    alert("You must select at least one character type")
    return "";
  }
  // variables that will hold each character type in a string
  const lowerCaseCharacters = "qwertyuiopasdfghjklzxcvbnm";
  const upperCaseCharacters = "QWERTYUIOPASDFGHJKLZXCVBNM";
  const numericCharacters = "1234567890";
  const specialCharacters = "!@#$%^&*+";

  let password = "";
// while loop that will iterate through their case choices and then pull a random value from the string variables and concate it with the password string
  while (password.length < passwordLength){
    if (includeLowerCase){
      const lower = lowerCaseCharacters.charAt(getRandomIntInclusive(0,lowerCaseCharacters.length -1));
      password += lower;
    }
    if (includeUpperCase){
      const upper = upperCaseCharacters.charAt(getRandomIntInclusive(0,upperCaseCharacters.length -1));
      password += upper;
    }
    if (includeNumericCharacters){
      const number = numericCharacters.charAt(getRandomIntInclusive(0,numericCharacters.length -1));
      password += number;
    }
    if (includeSpecialCharacters){
      const special = specialCharacters.charAt(getRandomIntInclusive(0,specialCharacters.length -1));
      password += special;
    }
  }
// using substring to make sure that the password doesn't accidently go over the 128 character limit if they picked all special characters and a max length password. This will make sure it doesn't go to like 131 characters or something
  password = password.substring(0,passwordLength);
  console.log(password.length);
  return password;
}
// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

} 

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
