let sendEmailButton = document.getElementById("sendEmailButton");
var info = [];

var nameInput = document.getElementById("userName");
var emailInput = document.getElementById("email");
var subjectInput = document.getElementById("subject");
var messageInput = document.getElementById("message");

var missingName = document.getElementById("userNameMissing");
var missingEmail = document.getElementById("userEmailMissing");
var missingSubject = document.getElementById("subjectMissing");
var missingMessage = document.getElementById("messageMissing");
var messageSentBox = document.getElementById("messageSent");

const getInfo = () => {
    let nameContent = nameInput.value;
    let emailContent = emailInput.value;
    let subjectContent = subjectInput.value;
    let messageContent = messageInput.value;

    let emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nameContent.length > 0) {
        missingName.textContent = ""
        nameInput.style.border = "2px solid green";
    } else {
        missingName.textContent = "Please enter your name";
        nameInput.style.border = "2px solid red";
    }

    if (subjectContent.length > 0) {
        missingSubject.textContent = ""
        subjectInput.style.border = "2px solid green";
    } else {
        missingSubject.textContent = "Please enter a subject"
        subjectInput.style.border = "2px solid red";
    }

    if (messageContent.length > 0) {
        missingMessage.textContent = "";
        messageInput.style.border = "2px solid green";
    } else {
        missingMessage.textContent = "Please enter your comment here"
        messageInput.style.border = "2px solid red";
    }    

    if (emailContent.length > 0 && emailValidator.test(emailContent) === true) {
        missingEmail.textContent = ""
        emailInput.style.border = "2px solid green";
    } else {
        missingEmail.textContent =  "Invalid email"
        emailInput.style.border = "2px solid red";
        return console.log("Invalid email");
    }

    if (nameContent.length > 0 && emailContent.length > 0 && subjectContent.length > 0 && messageContent.length > 0) {
        info.push(nameContent, emailContent, subjectContent, messageContent);
    } else {
        console.log("Some info missing.");
    } 
    
    return info
}

const sendEmail = async (name, email, subject, message) => {    
    const inputName = name;
    const inputEmail = email;
    const inputSubject = subject;
    const inputMessage = message;

    console.log(inputName, inputEmail, inputSubject, inputMessage) 

    const userEmailInfo = ({
        name: inputName,
        email: inputEmail,
        subject: inputSubject,
        message: inputMessage
    })

    const res = await fetch("/contact/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userEmailInfo)
    });

    const data = await res.json();
    console.log(data.message);
    messageSentBox.textContent = "Message was sent and will be reviewed, thank you for your input!";
}

const resetContactForm = () => {
    if (info.length === 4) {
        nameInput.value = "";
        emailInput.value = "";
        subjectInput.value = "";
        messageInput.value = "";
        info = []
    } else {
        info = [];
        console.log("Reset info array only.")
    }
}


sendEmailButton.onclick = () => {
    inputInfo = getInfo();

    if (inputInfo != undefined && inputInfo.length === 4) {
        let name = inputInfo[0];
        let email = inputInfo[1];
        let subject = inputInfo[2];
        let message = inputInfo[3];

        sendEmail(name, email, subject, message);
        console.log("Thank you for your message!")
    }

    resetContactForm();
}
