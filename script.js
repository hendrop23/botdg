const imageSequences = [
    ['img/cry.png', 'img/sad.png'], // Sequence for button 1
    ['img/love.png', 'img/blush.png'], // Sequence for button 2
    ['img/boring1.png', 'img/boring2.png'], // Sequence for button 3
    ['img/tongue.png', 'img/love.png'] // Sequence for button 4
];

let currentIndexes = [0, 0, 0, 0]; // Tracks the current index for each sequence
let timers = [null, null, null, null]; // Array to store timer IDs for automatic switching
let inactivityTimer;

function changeImageSequence(buttonIndex) {
    // Stop automatic switching for all buttons
    timers.forEach(timer => clearInterval(timer));
    timers = [null, null, null, null];

    // Get the sequence for the clicked button
    const sequence = imageSequences[buttonIndex];

    // Get the next image in the sequence
    currentIndexes[buttonIndex] = (currentIndexes[buttonIndex] + 1) % sequence.length;
    const nextImage = sequence[currentIndexes[buttonIndex]];

    // Update the image source
    document.getElementById('changeableImage').src = nextImage;

    // Start automatic switching for the selected button
    timers[buttonIndex] = setInterval(() => {
        changeImageSequence(buttonIndex);
    }, 2000); // Change every 2 seconds
}

// Start automatic switching on page load for specific buttons (e.g., buttons 1 and 3)
window.onload = () => {
    // Set initial image state
    changeImageSequence(3); // Default to button 4's sequence

    // Start automatic switching for specific buttons (e.g., buttons 1 and 3)
    [0, 2].forEach(index => {
        timers[index] = setInterval(() => {
            changeImageSequence(index);
        }, 2000);
    });

    // Set inactivity timer
    setInactivityTimer();
};

function setInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        changeImageSequence(2); // Change to button 3's sequence after 10 seconds of inactivity
    }, 10000); // 10 seconds of inactivity
}

function handleLeave() {
    changeImageSequence(0); // Change to button 1's sequence when "Leave" is clicked
}

// Event listeners for user interaction
document.getElementById('textInput').addEventListener('input', () => {
    changeImageSequence(3); // Change to button 4's sequence when typing
    setInactivityTimer(); // Reset inactivity timer on input
});

document.querySelector('.input-container button').addEventListener('mouseover', () => {
    changeImageSequence(0); // Change to button 1's sequence on hover over "Leave" button
    setInactivityTimer(); // Reset inactivity timer on hover
});
// script.js
document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.slide-in');

    const directions = [
        { x: '-40%', y: '0%' },   // from left
        { x: '40%', y: '0%' },    // from right
        { x: '0%', y: '-40%' },   // from top
        { x: '0%', y: '40%' }     // from bottom
    ];

    function getRandomDirection() {
        return directions[Math.floor(Math.random() * directions.length)];
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const direction = getRandomDirection();
                entry.target.style.setProperty('--translate-x', direction.x);
                entry.target.style.setProperty('--translate-y', direction.y);
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        observer.observe(element);
    });
});

const musicButton = document.getElementById('musicButton');
        const musicModal = document.getElementById('musicModal');
        const closeModal = document.getElementById('closeModal');

        // Open the modal when the music button is clicked
        musicButton.addEventListener('click', () => {
            musicModal.style.display = 'block';
        });

        // Close the modal when the close button is clicked
        closeModal.addEventListener('click', () => {
            musicModal.style.display = 'none';
        });

        // Close the modal when clicking outside of the modal content
        window.addEventListener('click', (event) => {
            if (event.target == musicModal) {
                musicModal.style.display = 'none';
            }
        });

        // Existing JavaScript code for the player
        const audioPlayer = document.getElementById('audio-player');
        const playPauseBtn = document.getElementById('play-pause');
        const backwardBtn = document.getElementById('backward');
        const forwardBtn = document.getElementById('forward');
        const songTitle = document.getElementById('song-title');
        const currentTimeEl = document.getElementById('current-time');
        const totalDurationEl = document.getElementById('total-duration');
        const progressBar = document.getElementById('progress-bar');

        audioPlayer.addEventListener('loadedmetadata', () => {
            const totalDuration = formatTime(audioPlayer.duration);
            totalDurationEl.textContent = `/ ${totalDuration}`;
            songTitle.textContent = audioPlayer.src.split('/').pop();
        });

        audioPlayer.addEventListener('timeupdate', () => {
            const currentTime = formatTime(audioPlayer.currentTime);
            currentTimeEl.textContent = currentTime;

            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.style.width = `${progress}%`;
        });

        playPauseBtn.addEventListener('click', () => {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playPauseBtn.classList.add('active');
            } else {
                audioPlayer.pause();
                playPauseBtn.classList.remove('active');
            }
        });

        backwardBtn.addEventListener('click', () => {
            audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
        });

        forwardBtn.addEventListener('click', () => {
            audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10);
        });

        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }
        document.getElementById('menuToggle').addEventListener('click', function() {
            const iconContainer = document.querySelector('.icon-container');
            iconContainer.classList.toggle('show');
            console.log("Icon Container Class List:", iconContainer.classList);
        });
        
        var rainActive = false;
var removeInterval;
var dropsCount = 0;

var makeItRain = function() {
    // Kosongkan konten elemen rain
    $('.rain.front-row').empty();
    $('.rain.back-row').empty();

    var increment = 0;
    var drops = "";
    var backDrops = "";

    while (increment < 100) {
        // Menghasilkan angka acak
        var randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1); // Angka acak antara 1 dan 98
        var randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);  // Angka acak antara 2 dan 5
        
        increment += randoFiver; // Menambahkan nilai acak ke increment

        // Menambahkan elemen tetesan hujan dengan variasi acak
        drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div>';
        backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div>';
    }

    $('.rain.front-row').append(drops);
    $('.rain.back-row').append(backDrops);

    // Simpan jumlah tetesan hujan yang aktif
    dropsCount = $('.rain .drop').length;
}

var removeDrops = function() {
    // Hapus tetesan hujan dari front-row dan back-row satu per satu
    var frontDrops = $('.rain.front-row .drop');
    var backDrops = $('.rain.back-row .drop');
    
    if (frontDrops.length > 0) {
        $(frontDrops[0]).remove();
    }
    
    if (backDrops.length > 0) {
        $(backDrops[0]).remove();
    }
    
    // Periksa apakah ada tetesan hujan yang tersisa
    if (frontDrops.length === 0 && backDrops.length === 0) {
        clearInterval(removeInterval); // Hentikan interval jika tidak ada tetesan yang tersisa
        document.querySelector('.rain').style.display = 'none'; // Sembunyikan hujan setelah semua tetesan dihapus
    }
}

document.getElementById('rainButton').addEventListener('click', function() {
    rainActive = !rainActive; // Toggle rainActive flag

    if (rainActive) {
        makeItRain(); // Generate rain
        document.querySelector('.rain').style.display = 'block'; // Tampilkan hujan
    } else {
        // Mulai mengurangi tetesan hujan secara bertahap
        if (removeInterval) {
            clearInterval(removeInterval); // Pastikan tidak ada interval sebelumnya yang aktif
        }
        removeInterval = setInterval(removeDrops, 50); // Hapus tetesan hujan setiap 50ms
    }
});

window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.preloader-container').classList.add('hidden');
    }, 1000); 
});

window.addEventListener('scroll', () => {
    const navMenu = document.querySelector('.nav-menu');
    if (window.scrollY > 0) {
        navMenu.classList.add('scrolled');
    } else {
        navMenu.classList.remove('scrolled');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling
    });
}

document.getElementById('scrollTopButton').addEventListener('click', function() {
    scrollToTop();
});