let viewer;
let sections = {
    "north-quad": "North Quad",
    "south-quad": "South Quad"
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
            "firstScene": "south-quad"
        },
        "scenes": {
            'south-quad': {
                "type": "equirectangular",
                "panorama": "https://pannellum.org/images/alma.jpg",
                "preview": "https://ichef.bbci.co.uk/news/660/cpsprodpb/37B5/production/_89716241_thinkstockphotos-523060154.jpg",
                "autoLoad": false
            },
            'north-quad': {
                "type": "equirectangular",
                "panorama": "/pac-quad.jpg",
                "preview": "https://www.newton.ac.uk/files/covers/968361.jpg",
                "autoLoad": false
            }
        }
    });
}

var initSections = (id, description) => {
    console.log(`#${id}`);
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

