let BruceHallVR = (function(){
    let viewer;
    let sections;

    let init = () => {
        $('<img/>').attr('src', './bruce-background.jpg').on('load', () => {
            $(this).remove();
            $('#background').css('background-image', 'url(./bruce-background.jpg)');

            $('#loading-screen').css('opacity', 0);
            setTimeout(() => {
                $('#loading-screen').remove();
            }, 1000); // To wait for the animation to finish
        });

        Object.keys(sections).forEach(k => {
            initSections(k, sections[k]);
        });

        $("#close").click(() => {
            showOverlay();
        });
    };

    let loadSections = (data) => {
        sections = data;
    }

    let initSections = (id, description) => {
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

    let loadScene = (scene) => {
        hideOverlay();
        
        setTimeout(() => { // To wait until the slide animation completes
            if (!viewer) {
                initViewer(scene);
                return;
            } 
    
            addAndLoadScene(scene);
        }, 500);
    };
    
    let showOverlay = () => {
        $("#background").removeClass("hide").addClass("show");
        $("#background-mob").removeClass("hide").addClass("show");
    }
    
    let hideOverlay = () => {
        $("#background").removeClass("show").addClass("hide");
        $("#background-mob").removeClass("show").addClass("hide");
    }
    
    let initViewer = (sceneName) => {
        let config = {
            "default": {
                "firstScene": sceneName
            },
            "scenes": {}
        };
    
        config["scenes"][sceneName] = { // As we can't add dynamic keys in the initial config creation
            "type": "equirectangular",
            "panorama": `./vr-photos/${sceneName}.jpg`,
            "autoLoad": true
        };
    
        viewer = pannellum.viewer('panorama', config);
    }
    
    let addAndLoadScene = (scene) => {
        viewer.addScene(scene, {
            type: "equirectangular",
            panorama: `./vr-photos/${scene}.jpg`,
            autoLoad: false
        });
    
        viewer.loadScene(scene);
    };

    let publicAPI = {
        init: init,
        loadSections: loadSections
    }
    
    return publicAPI;
})();

BruceHallVR.loadSections({
    "north-quad": "North Quad",
    "south-quad": "South Quad",
    "pac-quad": "Packard Quad",
    "dining-hall": "Dining Hall",
    "front": "Front of Bruce Hall",
    "reception": "Reception",
    "extension-lawn": "Extension Lawn"
});

$(document).ready(() => {
    BruceHallVR.init();
});
