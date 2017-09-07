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
    initViewer();

    Object.keys(sections).forEach(k => {
        initSections(k, sections[k]);
    });

    $("#close").click(() => {
        showOverlay();
    });
});

var initViewer = () => {
    viewer = pannellum.viewer('panorama', {
        "default": {
            "firstScene": "pac-quad"
        },
        "scenes": {
            'north-quad': {
                "type": "equirectangular",
                "panorama": "https://pannellum.org/images/alma.jpg",
                "preview": "https://ichef.bbci.co.uk/news/660/cpsprodpb/37B5/production/_89716241_thinkstockphotos-523060154.jpg",
                "autoLoad": false
            },
            'south-quad': {
                "type": "equirectangular",
                "panorama": "./vr-photos/south-quad.jpg",
                "autoLoad": false
            },
            'pac-quad': {
                "type": "equirectangular",
                "panorama": "./vr-photos/pac-quad.jpg",
                "autoLoad": false
            }
        }
    });
}

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
}

var loadScene = (scene) => {
    hideOverlay();
    
    setTimeout(() => { // To wait until the slide animation completes
        viewer.loadScene(scene);
    }, 500);
};

var showOverlay = () => {
    $("#background").removeClass("hide").addClass("show");
}

var hideOverlay = () => {
    $("#background").removeClass("show").addClass("hide");
}

