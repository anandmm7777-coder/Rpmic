// ==========================================
// Ramphal Memorial Inter College
// Login System
// Part - 1
// ==========================================

import { auth } from "./firebase-config.js";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

let confirmationResult = null;

// ==============================
// HTML Elements
// ==============================

const phoneInput = document.getElementById("phoneNumber");
const sendOtpBtn = document.getElementById("sendOtpBtn");
const otpSection = document.getElementById("otpSection");
const otpInput = document.getElementById("otp");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const timer = document.getElementById("timer");

// ==============================
// Create reCAPTCHA
// ==============================

window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {
        size: "normal",
        callback: () => {
            console.log("reCAPTCHA Verified");
        }
    }
);

// Render reCAPTCHA

window.recaptchaVerifier.render();

// ==============================
// Send OTP Button
// ==============================

sendOtpBtn.addEventListener("click", sendOTP);

// ==============================
// Send OTP Function
// ==============================

function sendOTP() {

    let phone = phoneInput.value.trim();

    if (phone === "") {

        alert("Please Enter Mobile Number");

        return;

    }

    if (!/^[0-9]{10}$/.test(phone)) {

        alert("Enter Valid 10 Digit Mobile Number");

        return;

    }

    phone = "+91" + phone;

    sendOtpBtn.disabled = true;

    sendOtpBtn.innerHTML = "Sending OTP...";

    signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
    )

    .then((result) => {

        confirmationResult = result;

        otpSection.style.display = "block";

        alert("OTP Sent Successfully");

        startTimer();

    })

    .catch((error) => {

        console.log(error);

        alert(error.message);

        sendOtpBtn.disabled = false;

        sendOtpBtn.innerHTML = "Send OTP";

    });

}

    // ==========================================
// PART - 2
// Verify OTP
// ==========================================

// Verify Button

verifyOtpBtn.addEventListener("click", verifyOTP);

// Verify Function

function verifyOTP() {

    let otp = otpInput.value.trim();

    if (otp === "") {

        alert("Please Enter OTP");

        return;

    }

    if (otp.length != 6) {

        alert("OTP must be 6 digits");

        return;

    }

    verifyOtpBtn.disabled = true;

    verifyOtpBtn.innerHTML = "Verifying...";

    confirmationResult.confirm(otp)

    .then((result) => {

        const user = result.user;

        console.log(user);

        alert("Login Successful");

        // Save Login

        localStorage.setItem("login", "true");
        localStorage.setItem("uid", user.uid);
        localStorage.setItem("mobile", user.phoneNumber);

        // Redirect

        window.location.href = "student-dashboard.html";

    })

    .catch((error) => {

        console.log(error);

        alert("Invalid OTP");

        verifyOtpBtn.disabled = false;

        verifyOtpBtn.innerHTML = "Verify OTP";

    });

}

// ==========================================
// Already Logged In
// ==========================================

if (localStorage.getItem("login") == "true") {

    window.location.href = "student-dashboard.html";

}

// ==========================================
// PART - 3
// Timer + Resend OTP + Logout
// ==========================================

// Timer

let countdown = 30;
let timerInterval;

function startTimer() {

    countdown = 30;

    timer.innerHTML = countdown;

    timerInterval = setInterval(() => {

        countdown--;

        timer.innerHTML = countdown;

        if (countdown <= 0) {

            clearInterval(timerInterval);

            timer.innerHTML =
            '<span id="resendOtp" style="color:#0066ff;cursor:pointer;font-weight:bold;">Resend OTP</span>';

            document
            .getElementById("resendOtp")
            .addEventListener("click", () => {

                sendOTP();

            });

        }

    }, 1000);

}

// ==========================================
// Logout Function
// ==========================================

function logout() {

    localStorage.removeItem("login");
    localStorage.removeItem("uid");
    localStorage.removeItem("mobile");

    window.location.href = "login.html";

}

// ==========================================
// Press Enter
// ==========================================

phoneInput.addEventListener("keypress", function(e){

    if(e.key==="Enter"){

        sendOTP();

    }

});

otpInput.addEventListener("keypress", function(e){

    if(e.key==="Enter"){

        verifyOTP();

    }

});

// ==========================================
// Console
// ==========================================

console.log(
"Ramphal Memorial Login System Loaded Successfully"
);

        
