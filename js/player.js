
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
        songList(songs[i]);

    // liste de pistes
    state.track = loadedScore.tracks[document.getElementById("track-select").value]

    // changement de piste
    document.getElementById("track-select").addEventListener("change", (e) => 
        { trackChange(e.target.value); }
    );

    // changement de chanson
    document.getElementById("song-select").addEventListener("change", (e) => 
        { songChange(e.target.value); }
    );

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
    document.getElementById("logout").addEventListener("click", logOut);
};

// listes de différentes chansons
function songList(song){
    const option = document.createElement("option");
    option.value = song.file;
    option.textContent = song.name;
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
}

// changement de chanson
function songChange(target){
    loadSong(target);
    state.isPlaying = false;
    state.playButton.textContent = "▶";
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
    localStorage.removeItem("authenticated");
    document.getElementById("remember").checked = false;
    loginScreen.style.display = "block";
    app.style.display = "none";
}