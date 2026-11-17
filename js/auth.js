const loginScreen = document.getElementById("login-screen");
const app = document.getElementById("app");
if (localStorage.getItem("authenticated") === "true") {
    loginScreen.style.display = "none";
    app.style.display = "block";

    if (localStorage.getItem("song") != null)
        loadSong(localStorage.getItem("song"));
    else
        loadSong(songs[0].file);
}
else {
    loginScreen.style.display = "block";
    app.style.display = "none";
}

document.getElementById("login").addEventListener("click", checkLogin);

document.addEventListener("keydown", (e) => {
    if (e.code  === "Enter")
        checkLogin();
});

// vérifier le mdp
function checkLogin()
{
    const password = document.getElementById("password").value;
    if (password === "crazyghost"){
        localStorage.setItem("authenticated", "true");
        loginScreen.style.display = "none";
        app.style.display = "block";
        if (localStorage.getItem("song") != null)
            loadSong(localStorage.getItem("song"));
        else
            loadSong(songs[0].file);
        if (!document.getElementById("remember").checked)
            localStorage.removeItem("authenticated");
    }
    else
    {
        alert("Mot de passe incorrect");
    }
}