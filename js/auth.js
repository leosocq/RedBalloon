const loginScreen = document.getElementById("login-screen");
const app = document.getElementById("app");

if (localStorage.getItem("authenticated") === "true") {
    loginScreen.style.display = "none";
    app.style.display = "block";
    loadSong(songs[0].file);
    console.log("auto login");
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
    if (password === "crazyghost")
    {
        localStorage.setItem("authenticated", "true");
        loginScreen.style.display = "none";
        app.style.display = "block";
        loadSong(songs[0].file);
        if (!document.getElementById("remember").checked)
            localStorage.removeItem("authenticated");
    }
    else
    {
        alert("Mot de passe incorrect");
    }
}