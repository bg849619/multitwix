/**
 * Controller for keeping streams and view in sync. Also responsible for transitioning between groups of streams.
 */
const transition_seconds = 10;
const check_streams_timeout = 2;
const host = 'localhost';

let cached_streams = [];
let groups = [];

function showGroup(name) {
    for(let gname of groups) {
        // Make all hidden first.
        let group = document.getElementById(gname);
        group.style.display = "none";
    }

    // Now, display the appropriate stream group.
    let group = document.getElementById(name);
    group.style.display = "flex";
}

function cycleStreams(current) {
    if(groups[current])
        showGroup(groups[current]);
    next = current + 1;
    if(next >= groups.length)
        next = 0;
    setTimeout(() => {cycleStreams(next)}, transition_seconds * 1000); // Switch every 10 seconds.
}

function constructPage() {
    for(let i = 0; i < (cached_streams.length); i++) {
        if(i % 4 == 0)
            newStreamGroup(groups.length);
        addStreamToStreamGroup(groups[groups.length-1], cached_streams[i]);
    }
}

function newStreamGroup(id) {
    let strid = `stream-group-${id}`;
    let group = document.createElement("div");
    group.id = strid;
    group.className = "pip-container";
    
    document.body.appendChild(group);

    groups.push(strid);
}

function addStreamToStreamGroup(group, channel) {
    let groupel = document.getElementById(group);
    let stream = document.createElement("iframe");
    stream.src = `https://player.twitch.tv/?channel=${channel}&parent=${host}`;
    stream.className = "pip-player";
    groupel.appendChild(stream);
}

async function fetchStreams() {
    try {
        let streams = await fetch('/streams');
        if(!streams.ok)
            return;
        let data = await streams.json();
        if(JSON.stringify(data) != JSON.stringify(cached_streams) && cached_streams.length > 0) {
            location.reload();
        }
        if(cached_streams.length == 0) {
            // On initial success, populate cached_streams, then construct page.
            cached_streams = data;
            constructPage();
            // Start cycling streams
            cycleStreams(0);
        }
    } catch(err) {
        console.log(err);
    }
    setTimeout(fetchStreams, check_streams_timeout * 1000);
}
