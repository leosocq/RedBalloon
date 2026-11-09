//python -m http.server 8000

// installer l'api alphatabet récupérer la tab

let api = null;
let firstLaunch = true;
function loadSong(songFile)
{
    if (api)
        api.destroy?.();

    api = new alphaTab.AlphaTabApi(document.getElementById("tablature"),
        {
            file: songFile,
            player: { enablePlayer: true, soundFont: "MuseScore_General.sf2" },
            //player: { enablePlayer: true, soundFont: "sonivox.sf2" },
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
}