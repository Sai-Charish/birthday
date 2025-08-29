        document.addEventListener('DOMContentLoaded', () => {
            const fullscreenButton = document.getElementById('fullscreenButton');
            const fullscreenContent = document.getElementById('fullscreenContent');
            const shape = document.getElementById('shape');
            const shapes = ['shape', 'heart', 'rectangle', 'back_rectangle'];
            const messages = ['msg1', 'msg2', 'msg3', 'letter'];
            const photos = document.querySelectorAll('.photo');
            const pt = document.querySelector('.pt');
            let currentShape = 0;

            function updateMessage() {
                messages.forEach((msg, index) => {
                    document.getElementById(msg).style.display = (index === currentShape) ? 'block' : 'none';
                });

                // Show pt div only when msg3 is displayed
                if (currentShape === 2) {
                    pt.style.display = 'block';
                } else {
                    pt.style.display = 'none';
                }

                // Show photos only when the letter is shown
                if (currentShape === 3) {
                    photos.forEach(photo => {
                        photo.style.display = 'block';
                    });
                } else {
                    photos.forEach(photo => {
                        photo.style.display = 'none';
                    });
                }
            }

            shape.addEventListener('click', () => {
                shape.classList.remove(shapes[currentShape]);
                currentShape = (currentShape + 1) % shapes.length;
                shape.classList.add(shapes[currentShape]);
                updateMessage();
            });

            // Initialize the first message
            updateMessage();

            fullscreenButton.addEventListener('click', () => {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen()
                        .then(() => {
                            fullscreenContent.style.display = 'block'; // Show content
                        })
                        .catch((err) => {
                            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                        });
                } else {
                    document.exitFullscreen()
                        .then(() => {
                            fullscreenContent.style.display = 'none'; // Hide content
                        })
                        .catch((err) => {
                            console.error(`Error attempting to disable full-screen mode: ${err.message} (${err.name})`);
                        });
                }
            });

            // Event listeners to handle full-screen change
            document.addEventListener('fullscreenchange', () => {
                if (!document.fullscreenElement) {
                    fullscreenContent.style.display = 'none'; // Hide content when exiting full screen
                }
            });
        });