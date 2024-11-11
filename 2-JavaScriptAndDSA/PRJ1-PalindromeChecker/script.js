const explainContainer = document.getElementById("explain-container");
const explainText = document.getElementById("explain-text");
const explainIcon = document.getElementById("explain-icon");
const textInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const result = document.getElementById("result");

const checkEmpty = (text) => {
    if (text === "") {
        alert("Vui lòng nhập dữ liệu");
        return false;
    }
    return true;
};

const getTextInput = () => {
    return textInput.value;
};

const cleanInputText = (text) => {
    const textLowerCase = text.toLowerCase();
    const regex = /[^a-z\d]/g;
    return textLowerCase.replace(regex, '');
};

const checkPalindrome = (text) => {
    const reversedText = text.split('').reverse().join('');
    return text === reversedText;
};

checkButton.addEventListener("click", () => {
    const originalText = getTextInput();
    if (checkEmpty(originalText)) {
        const cleanText = cleanInputText(originalText);
        let resultHTML = `${originalText}`;
        if (checkPalindrome(cleanText)) {
            resultHTML += `
              <span class="bold"> CHÍNH XÁC </span>
            `;
        } else {
            resultHTML += `
              <span class="bold"> KHÔNG PHẢI </span>
            `;
        }
        resultHTML += ` là palindrome`;
        result.innerHTML = resultHTML;
    }
});

explainContainer.addEventListener("mouseenter", () => {
    explainText.style.display = "block";
    explainIcon.style.display = "none";
});
explainContainer.addEventListener("mouseleave", () => {
    explainText.style.display = "none";
    explainIcon.style.display = "block";
});