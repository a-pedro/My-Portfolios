//textContainer: Holds a reference to the element with the class "textContainer" that displays the entered text.
//deleteKey: Holds a reference to the element with the class "delete," representing the delete key.
//enterKey: Holds a reference to the element with the class "enter," representing the enter key.
//spaceKey: Holds a reference to the element with the class "space," representing the space key.
//capsLock: Holds a reference to the element with the class "capslock," representing the CapsLock key.
//allKey: Holds references to all elements with the class "key," representing all keys on the virtual keyboard.
//isCaps: A boolean variable that tracks whether CapsLock is active or not.
//isTypingWithKeyboard: A boolean flag to differentiate between typing from the physical keyboard and typing via on - screen keyboard.

let textContainer = document.querySelector("textContainer");
let deleteKey = document.querySelector(".delete");
let enterKey = document.querySelector(".enter");
let spaceKey = document.querySelector(".space");
let capsLock = document.querySelector(".capsLock");
let allKey = document.querySelectorAll; (".key");
let isCaps = false;

let isTypingWithKeyboard = false; 

//updateContent(): This function updates the displayed content in the textContainer by removing the cursor indicator ("|") if it's present. However, it doesn't seem to be used in the rest of the code.
function updateContent() {
    let content = textContainer.innerText.replace("|", "");
    textContainer.innerText = content;

}
//handleTyping(text): This function handles typing on the virtual keyboard. It adds the pressed character to the content at the appropriate cursor position, considering the presence of the cursor indicator ("|"). It then updates the content and moves the cursor indicator.
function handleTyping(text) {
    let content = textContainer.innerText;
    let cursorIndex = content.indexOf("|");
     
    if (cursorIndex === -1) {
        content += text;
    } else {
        content = content.slice(0, cursorIndex) + text + content.slice(cursorIndex);
        cursorIndex += text.length;
    }
    textContainer.innerText = content;
    updateCursor(cursorIndex + text.length); //Move cursor beside the last letter typed
}
//updateCursor(cursorIndex): This function updates the position of the cursor indicator. It replaces the cursor indicator ("|") with an HTML element (<span class='cursor'>|</span>) at the specified index.
function updateCursor(cursorIndex) {
    let content = textContainer.innerText;
    content = content.replace("|", "");

    if (cursorIndex >= 0 && cursorIndex <= content.length) {
        textContainer.innerHTML =
            content.slice(0, cursorIndex) + "<span class='cursor'>|</span>" +
            content.slice(cursorIndex);        
    }
}
//This event listener captures physical keyboard keydown events. It handles various key presses:
//Backspace: Calls handleTyping("") to delete at the cursor position.
//Enter: Calls handleTyping("\n") to add a newline.
//Space: Calls handleTyping(" ") to add a space.
//CapsLock: Simulates a click on the CapsLock element to toggle capitalization.
//Character keys: Calls handleTyping() with the lowercase or uppercase character based on the CapsLock state.
document.addEventListener("keydown", function (event) {
    let key = event.key;
// set the flag for keyboard input
    isTypingWithKeyboard = true;

    if (key === "Backspace") {
        let cursorIndex = textContainer.innerText.indexOf("|");
        if (cursorIndex > 0) {
            handleTyping(""); //delete at cursor position
        }
    } else if (key === "Enter") {
        handleTyping("/n");
    } else if (key === " ") {
        handleTyping(" ");
    } else if (key === "CapsLock") {
        capsLock.click();
    } else if (key.length === 1) {
        handleTyping(isCaps ? key.toLocaleUpperCase() : key.toLocaleLowerCase());
    }
});
//This loop adds event listeners to each on-screen key. It handles key clicks for all keys except special keys like Delete, Enter, Space, and CapsLock. It also checks if the typing is not done with the physical keyboard (using the flag) to avoid duplicating input.
for (let key of allkey) {
    key.addEventListener("click", function () {
        if (
            key.classList.contains("delete") ||
            key.classList.contains("enter") ||
            key.classList.contains("space") ||
            key.classList.contains("capslock")
        ) {
            return;
        }
        //handle typing only if not typing with the keyboard
        if (!isTypingWithKeyboard) {
            handleTyping(key.innerText);
        }
        //reset the flag after handling the click
        isTypingWithKeyboard = false;
    });
}
//Event listeners for special keys (deleteKey, enterKey, spaceKey, capsLock): These functions handle the clicks on these keys, performing specific actions such as deleting characters, adding new lines or spaces, and toggling capitalization. They also update the cursor position accordingly.
//In summary, the JavaScript code provides the functionality for your virtual keyboard project.It handles both physical keyboard input and on - screen keyboard clicks, manages the cursor position, and updates the displayed content and key states accordingly.

deleteKey.addEventListener("click", function () {
    let textContainerContent = textContainer.innerText;
    if (textContainerContent.length == 0) {
        return;
    }
    console.log(textContainerContent);
    let newContent = textContainerContent.slice(
        0,
        textContainerContent.length - 1
    );
    textContainer.innerText = newContent;
    updateCursor(newContent.length); //move cursor beside the last letter typed

});

enterKey.addEventListener("click", function () {
    let content = textContainer.innerText;
    let newContent = content + "/n";
    textContainer.innerText = newContent;
    updateCursor(newContent.length); // move cursor beside the last letter typed
});

spaceKey.addEventListener("click", function () {
    let content = textContainer.innerText;
    let newContent = content + "\u00A0";
    textContainer.innerText = newContent;
    updateCursor(newContent.length);// move cursor beside the last letter typed

});

capsLock.addEventListener("click", function () {
    if (isCaps) {
        capsLock.classList.remove("active");
        for (let key of allKey) {
            if (
                key.classList.contains("delete") ||
                key.classList.contains("enter") ||
                key.classList.contains("space") ||
                key.classList.contains("capslock")
            ) {
                
            } else key.innerText = key.innerText.toLocaleLowerCase();
        }
    } else {
        capsLock.classList.add("active");
        for (let key of allkey) {
            if (
                key.classList.contains("delete") ||
                key.classList.contains("enter") ||
                key.classList.contains("space") ||
                key.classList.contains("capslock")
            ) {
                
            } else key.innerText = key.innerText.toLocaleUpperCase();
        }
    }
    isCaps = !isCaps;
});
