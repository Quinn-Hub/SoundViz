// Author: Michael Quinn
// Date: 3/3/2024
// Purpose: Fullscreen functionaltiy for canvas object

// Wait for jQuery to be loaded
jqueryScript.onload = function() {
    $(document).ready(function() {
        // Function to toggle full screen mode
        function toggleFullScreen() {
            var elem = document.documentElement;
            if (!document.fullscreenElement) {
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.webkitRequestFullscreen) {
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        }

        // Create fullscreen button
        var fullscreenButton = $("<button>")
            .attr("id", "fullscreen-button")
            .text("Toggle Full Screen");

        // Append fullscreen button to canvas container
        $(".canvas-container").append(fullscreenButton);

        // Click event handler for the button to toggle full screen mode
        $(document).on("click", "#fullscreen-button", function() {
            toggleFullScreen();
        });
    });
};
