const PASSWORD = "c";

const loginScreen = document.getElementById("login-screen");
const app = document.getElementById("app");

localStorage.removeItem("authenticated");

if (localStorage.getItem("authenticated") === "true") {
    loginScreen.style.display = "none";
    app.style.display = "block";
    loadSong(songs[0].file);
}
else {
    loginScreen.style.display = "flex";
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
    if (password === PASSWORD)
    {
        localStorage.setItem("authenticated", "true");
        loginScreen.style.display = "none";
        app.style.display = "block";
        loadSong(songs[0].file);
    }
    else
    {
        alert("Mot de passe incorrect");
    }
}