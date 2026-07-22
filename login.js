// ==========================
// Ramphal School Portal
// Login.js - Part 1
// ==========================

import { auth } from "./firebase-config.js";

import {
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


// ==========================
// Elements
// ==========================

const phoneInput =
document.getElementById("phoneNumber");

const sendOtpBtn =
document.getElementById("sendOtpBtn");

const otpSection =
document.getElementById("otpSection");

const otpInput =
document.getElementById("otp");


// ==========================
// Global Variables
// ==========================

let confirmationResult = null;


// ==========================
// Create reCAPTCHA
// ==========================

window.recaptchaVerifier =
new RecaptchaVerifier(auth,
"recaptcha-container",
{

size:"normal",

callback:()=>{

console.log("reCAPTCHA Verified");

}

});


// ==========================
// Send OTP
// ==========================

sendOtpBtn.addEventListener("click",()=>{

let number =
phoneInput.value.trim();


// Empty Check

if(number===""){

alert("Please Enter Mobile Number");

return;

}


// Length Check

if(number.length!==10){

alert("Enter Valid 10 Digit Number");

return;

}


// Country Code

number="+91"+number;


// Send OTP

signInWithPhoneNumber(
auth,
number,
window.recaptchaVerifier
)

.then((result)=>{

confirmationResult=result;

alert("OTP Sent Successfully");

otpSection.style.display="block";

})

.catch((error)=>{

alert(error.message);

console.log(error);

});

});

// ==========================
// Verify OTP
// ==========================

const verifyOtpBtn =
document.getElementById("verifyOtpBtn");

verifyOtpBtn.addEventListener("click",()=>{

let otp =
otpInput.value.trim();

if(otp===""){

alert("Enter OTP");

return;

}

confirmationResult.confirm(otp)

.then((result)=>{

const user=result.user;

alert("Login Successful");

window.location.href="student-dashboard.html";

})

.catch((error)=>{

alert("Invalid OTP");

console.log(error);

});

});
