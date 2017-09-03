let viewer;

$(document).ready(() => {
    viewer = pannellum.viewer('panorama', {
        "default": {
            "firstScene": "north-quad",
            "autoLoad": true
        },
        "scenes": {
            'north-quad': {
                "type": "equirectangular",
                "panorama": "https://i.imgur.com/G7t9QD9.jpg",
                "preview": "https://www.newton.ac.uk/files/covers/968361.jpg"
            },
            'south-quad': {
                "type": "equirectangular",
                "panorama": "https://pannellum.org/images/alma.jpg",
                "preview": "https://ichef.bbci.co.uk/news/660/cpsprodpb/37B5/production/_89716241_thinkstockphotos-523060154.jpg"
            }
        }
    });

    $("#south-quad").click(function() {
        viewer.loadScene('north-quad');
        $("#panorama").removeClass("hide").addClass("show");
    });

    $("#north-quad").click(() => {
        viewer.loadScene('south-quad');
        $("#panorama").removeClass("hide").addClass("show");
    });

    $("#close").click(() => {
        $("#panorama").removeClass("show").addClass("hide");
    });
});

