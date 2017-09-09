let viewer;
let sections = {
    "north-quad": "North Quad",
    "south-quad": "South Quad",
    "pac-quad": "Packard Quad",
    "dining-hall": "Dining Hall",
    "front": "Front of Bruce Hall",
    "reception": "Reception",
    "extension-lawn": "Extension Lawn"
};

$(document).ready(() => {
    Object.keys(sections).forEach(k => {
        initSections(k, sections[k]);
    });

    $("#close").click(() => {
        showOverlay();
    });
});

var initSections = (id, description) => {
    $('#background').append(`<div id="${id}" class="section"></div>`);

    $(`#${id}`)
    .mouseover(() => {
        $("#description").text(description);
    })
    .mouseout(() => {
        $("#description").text("");
    });

    $(`#${id}`).click(() => {
        loadScene(id);
    });

    // MOBILE
    $('#background-mob').append(`<div id="m-${id}"> <h1> ${description} </h1> </div>`);
    $(`#m-${id}`).click(() => {
        loadScene(id);
    });
}

var loadScene = (scene) => {
    hideOverlay();
    
    setTimeout(() => { // To wait until the slide animation completes
        if (!viewer) {
            initViewer(scene);
            return;
        } 

        addAndLoad(scene);
    }, 500);
};

var showOverlay = () => {
    $("#background").removeClass("hide").addClass("show");
    $("#background-mob").removeClass("hide").addClass("show");
}

var hideOverlay = () => {
    $("#background").removeClass("show").addClass("hide");
    $("#background-mob").removeClass("show").addClass("hide");
}

var initViewer = (sceneName) => {
    let config = {
        "default": {
            "firstScene": sceneName
        },
        "scenes": {}
    };

    config["scenes"][sceneName] = { // As we can't add dynamic keys in the initial config creation
        "type": "equirectangular",
        "panorama": `./vr-photos/${sceneName}.jpg`,
        "preview": "https://ichef.bbci.co.uk/news/660/cpsprodpb/37B5/production/_89716241_thinkstockphotos-523060154.jpg",
        "autoLoad": false
    };

    viewer = pannellum.viewer('panorama', config);
}

var addAndLoad = (scene) => {
    viewer.addScene(scene, {
        type: "equirectangular",
        panorama: `./vr-photos/${scene}.jpg`,
        autoLoad: false
    });

    viewer.loadScene(scene);
};
