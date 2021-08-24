document.addEventListener('DOMContentLoaded', () => {
    const greetTextElem = document.querySelector(".greetText")
    const errorMessageElem = document.querySelector(".errorMessage");
    const errorsElem = document.querySelector(".errors");

    if (errorsElem){
        if(errorsElem.hasChildNodes()) {
            setTimeout(() => {
                errorsElem.innerHTML = "";
            }, 5000);
        }
    }
    if(errorMessageElem){
        if(errorMessageElem.hasChildNodes()) {
            setTimeout(() => {
                errorMessageElem.innerHTML = "";
            }, 5000);
        }
    }
    if(greetTextElem.hasChildNodes()) {
            setTimeout(() => {
                greetTextElem.innerHTML = "";
            }, 5000)
        }
});