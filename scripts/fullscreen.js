// Author: Michael Quinn
// Date: 3/3/2024
// Purpose: Fullscreen functionaltiy for canvas object

// Wait for jQuery to be loaded
    $(document).ready(function() {
        // Function to toggle full screen mode
        function toggleFullScreen() {
            var elem = document.documentElement;
            if (!document.fullscreenElement) {
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.mozRequestFullscreen) { // Used by Firefox
                    elem.mozRequestFullscreen();
                } else if (elem.webkitRequestFullscreen) { // Used by Chrome, Safari and Opera
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) { // Used by Edge
                    elem.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullscreen) { // Used by Firefox
                    document.mozCancelFullscreen();
                } else if (document.webkitExitFullscreen) { // Used by Chrome, Safari and Opera
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { // Used by Edge
                    document.msExitFullscreen();
                }
            }
        }

        // Create fullscreen button
        var fullscreenButton = $("<button>")
            .attr("id", "fullscreen-button")
            .text("Toggle Full Screen");

        // Append fullscreen button to canvas container
        $("body").append(fullscreenButton);

        // Click event handler for the button to toggle full screen mode
        $(document).on("click", "#fullscreen-button", function() {
            toggleFullScreen();
        });
    });
