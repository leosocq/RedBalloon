//python -m http.server 8000

// installer l'api alphatabet récupérer la tab
let api = null;
let firstLaunch = true;
function loadSong(songFile)
{
    if (api)
        api.destroy?.();

    const isMobile = window.innerWidth < 768;

    api = new alphaTab.AlphaTabApi(document.getElementById("tablature"),
        {
            file: songFile,
            display: { scale: isMobile ? 0.9 : 1.0 },
            notation: { elements: new Map([
                [alphaTab.NotationElement.ScoreTitle, true],
                [alphaTab.NotationElement.ScoreSubTitle, false],
                [alphaTab.NotationElement.ScoreArtist, true],
                [alphaTab.NotationElement.ScoreAlbum, false],
                [alphaTab.NotationElement.ScoreWords, false],
                [alphaTab.NotationElement.ScoreMusic, false] ])
            },
            player: { enablePlayer: true, soundFont: "CrazySoundFont2.sf2" },
            cursor: { followCursor: true, autoScroll: true }
        }
    );
    api.scoreLoaded.on(score => { loadTracks(score); } );
}

function loadTracks(score)
{
    //console.dir(api.score.tracks[0].staves[0]);
    
    loadedScore = score;
    const select = document.getElementById("track-select");
    select.innerHTML = "";
    score.tracks.forEach((track, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = track.name;
        select.appendChild(option);
    });

    let trackIndex = Number(localStorage.getItem("track")) || 0;
    // si la nouvelle chanson a moins de pistes
    if (trackIndex >= score.tracks.length)
        trackIndex = 0;

    select.value = trackIndex;
    state.track = score.tracks[trackIndex];
    api.renderTracks([state.track]);
    
    if (firstLaunch){
        initPlayer();
        firstLaunch = false
    }
    /*const note =
    api.score.tracks[0]
       .staves[0]
       .bars[10]
       .voices[0]
       .beats[2]
       .notes[0];
    note.fret = 7;
    api.renderTracks([state.track]);
    exportGP();*/

    /*api.scoreLoaded.on(score => {
    const note =
        score.tracks[1]
             .staves[0]
             .bars[14]
             .voices[0]
             .beats[0]
             .notes[0];

    console.log(note);
});*/
}