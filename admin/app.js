// Preview an edited list of 
let changed = [];
let current = [];

const addForm = document.getElementById("addstream");
const listEl = document.getElementById("streamlist");
const applyBut = document.getElementById("applybutton");
const cancelBut = document.getElementById("cancelbutton");
const streamText = document.getElementById("addstreamtext");

let showChanged = false;

/**
 * Refreshes the DOM with the active list of streams.
 */
function updateView() {
    listEl.innerHTML = "";
    
    if(!showChanged) {
        applyBut.disabled = true;
        // Make sure changed is in sync.
        changed = structuredClone(current);
    }
    else
        applyBut.disabled = false;

    // At this point, changed is always what is to be displayed.
    for (let i of changed) {
        listEl.appendChild(createStreamLI(i));
    }
}

/**
 * Creates an LI element ready to be added to the stream list.
 * @param {string} stream String identifier of string to create LI for.
 * @returns LI element
 */
function createStreamLI(stream) {
    let el = document.createElement('li');
    el.innerText = stream;
    let del = document.createElement('button');
    del.className = "stream-del";
    del.innerText = "Remove";
    del.onclick = () => {deleteStream(stream)};
    el.appendChild(del);
    return el;
}

/**
 * Removes stream from changed list.
 * @param {string} stream value of stream to be deleted.
 */
function deleteStream(stream) {
    showChanged = true;
    changed.splice(changed.indexOf(stream), 1);
    updateView();
}

/**
 * Add stream to changed list.
 * @param {string} stream value of stream to be added.
 */
function addStream(stream) {
    showChanged = true;
    changed.push(stream);
    updateView();
}

/**
 * Posts changed list to API to update stream list.
 */
async function postStreamUpdate() {
    try {
        let result = await fetch('/streams', {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(changed)
        });

        if(!result.ok)
            alert("Could not update stream.");
        else {
            showChanged = false;
            await fetchStreams();
        }
    } catch(err) {
        console.log(err);
        alert("Unexpected error. Check console for details");
    }
    updateView();
}

/**
 * Fetch current streams from API and update current to streams.
 */
async function fetchStreams() {
    try {
        let response = await fetch('/streams');
        current = await response.json();
    } catch (err) {
        console.log(err);
    }
}

// Handle adding stream submission.
addForm.onsubmit = ((e) => {
    e.preventDefault();
    if(changed.indexOf(streamText.value) != -1) {
        alert(`${streamText.value} is already in list`);
    }
    else {
        addStream(streamText.value);
    }
    streamText.value = "";
});

// When apply, post the updated list.
applyBut.onclick = (() => {
    applyBut.disabled = true;
    postStreamUpdate();
});

// When cancelled, show the original list and update the view.
cancelBut.onclick = (() => {
    showChanged = false;
    updateView();
});
