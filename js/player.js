
const state = {
    track: null,
    isPlaying: false,
    playButton: document.getElementById("play"),
    songSelect: document.getElementById("song-select"),
    solo: false,
    mute: false,
};

function initPlayer(){    

    // liste des chansons
    for (let i = 0; i < songs.length; i++)
        songList(i);

    // liste de pistes
    state.track = loadedScore.tracks[document.getElementById("track-select").value];
    api.renderTracks([state.track]);

    // changement de piste
    document.getElementById("track-select").addEventListener("change", (e) => 
        { trackChange(e.target.value); }
    );

    // changement de chanson
    document.getElementById("song-select").addEventListener("change", (e) => 
        { songChange(e.target.value); }
    );
    document.getElementById("song-select").value = localStorage.getItem("song");

    // solo & mute
    document.getElementById("solo").addEventListener("click", buttonSolo);
    document.getElementById("mute").addEventListener("click", buttonMute);
    
    // si bouton play pressé
    state.playButton.addEventListener("click", buttonPlay);

    // si bouton espace pressé
    document.addEventListener("keydown", (e) => {
        if (e.code === "Space"){
            e.preventDefault(); // évite le scroll de la page
            buttonPlay();
        }
    });

    // se déconnecter:
    const isMobile = window.innerWidth < 768;

    if (isMobile)  document.getElementById("logout").textContent = "➜]";
    else  document.getElementById("logout").textContent = "Déconnexion";

    document.getElementById("logout").addEventListener("click", logOut);
};

// listes de différentes chansons
function songList(index){
    const option = document.createElement("option");
    option.value = songs[index].file;
    option.textContent = songs[index].name;
    state.songSelect.appendChild(option);
}

//changement de piste
function trackChange(target){
    api.changeTrackMute([state.track], false);
    api.changeTrackSolo([state.track], false);
    state.solo = false;
    state.mute = false;
    document.getElementById("solo").classList.remove("active", false);
    document.getElementById("mute").classList.remove("active", false);

    state.track = loadedScore.tracks[target];
    api.renderTracks([state.track]);
    localStorage.setItem("track", state.track.index);
}

// changement de chanson
function songChange(target){
    loadSong(target);
    state.isPlaying = false;
    state.playButton.textContent = "▶";
    localStorage.setItem("song", target);
    api.changeTrackMute([state.track], false);
    api.changeTrackSolo([state.track], false);
    state.solo = false;
    state.mute = false;
    document.getElementById("solo").classList.remove("active", false);
    document.getElementById("mute").classList.remove("active", false);
}

// bouton solo
function buttonSolo(){
    state.solo = !state.solo;
    api.changeTrackSolo([state.track], state.solo);
    document.getElementById("solo")
        .classList.toggle("active", state.solo);
    if (state.solo)
    {
        api.changeTrackMute([state.track], false);
        document.getElementById("mute")
            .classList.remove("active", false);
    }  
}

// bouton mute
function buttonMute(){
    state.mute = !state.mute;
    api.changeTrackMute([state.track], state.mute);
    document.getElementById("mute")
        .classList.toggle("active", state.mute);
    if (state.mute)
    {
        api.changeTrackSolo([state.track], false);
        document.getElementById("solo")
            .classList.remove("active", false);
    }  
}

// si play ou espace appuyé
function buttonPlay(){
    api.playPause();
    state.isPlaying = !state.isPlaying;
    if (state.isPlaying)
        state.playButton.textContent =  "⏸";
    else
        state.playButton.textContent = "▶";
}

function logOut(){
    if (state.isPlaying){
        api.playPause();
        state.isPlaying = false;
        state.playButton.textContent = "▶";
    }
    localStorage.removeItem("authenticated");
    document.getElementById("remember").checked = false;
    loginScreen.style.display = "block";
    app.style.display = "none";
}