function askForPermission() {
    document.getElementById('Msg').innerHTML = "";
    document.getElementById('permissionEle').style.display = "block";
};

function askForAccount() {
    document.getElementById('Msg').innerHTML = "";
    const element = document.getElementById('accountEle');
    element.style.display = "block";
};

function resetEle() {
    const element0 = document.getElementById('permissionEle');
    element0.style.display = "none";
    const element1 = document.getElementById('accountEle');
    element1.style.display = "none";
}


function noInsMsg() {
    const element = document.getElementById('name');
    document.getElementById('Msg').innerHTML = `OK! Nice to have you here ${element.value}!`;
}

function handleSubmit(event) {
    event.preventDefault();
    const element = document.getElementById('name');
    document.getElementById('Msg').innerHTML =
        `Hmmmm I don't actually have a backend set up to store your insta at the moment, 
    but nice to have you here ${element.value}!`;

}