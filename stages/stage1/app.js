// ============================================================================
// ATW WEB FLOW: Application Controller - Kid-Friendly 4D Web Journey
// Handles URL Input, Robot Journey, Stations, Working Website, and Audio
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize 3D Sunny World
    const container = document.getElementById('canvas-container');
    const world = new CyberWorld(container);
    const sound = window.soundEngine;

    // Presets Database
    const sitePresets = {
        'https://cat-games.fun': {
            name: 'Cat Games Live',
            icon: '🐱',
            desc: 'Assembled by your browser with HTML skeleton, CSS style, and API data!',
            toyBtn: '🎾 Throw Catnip Ball!',
            toyReact: '🐱 *Purr purr!* The kitten chased the ball across your screen! JS event fired! ✨'
        },
        'https://pizza-party.com': {
            name: 'Pizza Party Robot',
            icon: '🍕',
            desc: 'Freshly baked web files delivered from the cloud server kitchen!',
            toyBtn: '🍕 Bake Extra Cheesy Slice!',
            toyReact: '🍕 *Sizzle!* Chef bot delivered a piping hot slice with extra mozzarella! 😋'
        },
        'https://space-arcade.io': {
            name: 'Space Arcade 3000',
            icon: '🚀',
            desc: 'HTML canvas and real-time JavaScript physics engine powered up!',
            toyBtn: '💥 Fire Laser Blaster!',
            toyReact: '🚀 *Pew Pew!* Asteroid blasted! API updated live score to 9,990 points! 🌟'
        },
        'https://unicorn-cloud.net': {
            name: 'Rainbow Unicorns',
            icon: '🦄',
            desc: 'CSS gradients, glowing animations, and magical audio soundscapes!',
            toyBtn: '🌈 Cast Rainbow Spell!',
            toyReact: '🦄 *Sparkle!* A magical rainbow arched across the digital clouds! ✨'
        }
    };

    let selectedUrl = 'https://cat-games.fun';
    let selectedSite = sitePresets[selectedUrl];
    let isJourneyRunning = false;
    let journeyTimer = null;

    // UI Elements
    const urlInput = document.getElementById('url-input');
    const btnGo = document.getElementById('btn-start-journey');
    const presetPills = document.querySelectorAll('.preset-pill');
    const storyPhaseText = document.getElementById('story-phase-text');
    const robotBubble = document.getElementById('robot-bubble');
    const timeSlider = document.getElementById('time-slider');
    const btnPlayPause = document.getElementById('btn-play-pause');
    const btnRewind = document.getElementById('btn-rewind');
    const btnFF = document.getElementById('btn-fastforward');
    const journeySteps = document.querySelectorAll('.journey-step');

    // Modals
    const workingSiteModal = document.getElementById('working-site-modal');
    const btnCloseWorkingSite = document.getElementById('btn-close-working-site');
    const siteTitle = document.getElementById('site-title');
    const siteIcon = document.getElementById('site-icon');
    const siteDesc = document.getElementById('site-desc');
    const modalSiteUrl = document.getElementById('modal-site-url');
    const btnInteractToy = document.getElementById('btn-interact-toy');
    const toyReaction = document.getElementById('toy-reaction');

    const stationModal = document.getElementById('station-modal');
    const btnCloseStation = document.getElementById('btn-close-station');
    const stationBadge = document.getElementById('station-modal-badge');
    const stationTitle = document.getElementById('station-modal-title');
    const stationAnalogy = document.getElementById('station-modal-analogy');
    const stationFact = document.getElementById('station-modal-fact');
    const btnReadStation = document.getElementById('btn-read-station');

    // Station Educational Info
    const stationData = {
        client: {
            badge: 'STEP 1',
            title: 'Your PC Web Browser 💻',
            analogy: 'You are the Client! When you type a URL or click a game, your computer packs a secret letter and sends robot Byte to fetch your files.',
            fact: 'Your computer has a digital postal address called an IP address so the files find their way home!'
        },
        dns: {
            badge: 'STEP 2',
            title: 'DNS Phonebook Owl 🔮',
            analogy: 'Computers only understand numbers, not words! The DNS server is a magical cosmic phonebook that turns website names into number coordinates in 2 milliseconds!',
            fact: 'DNS stands for Domain Name System. It processes billions of lookups every second without getting lost!'
        },
        bridge: {
            badge: 'STEP 3',
            title: 'Rainbow Fiber Highway 🌈',
            analogy: 'Underground and under oceans are glass threads thinner than your hair! Laser beams shoot through them carrying messages at light speed!',
            fact: 'Light in fiber optic cables moves at 124,000 miles per second—fast enough to circle the Earth 5 times in a second!'
        },
        server: {
            badge: 'STEP 4',
            title: 'Cloud Server Kitchen ☁️',
            analogy: 'A giant super-computer that never sleeps! When the robot arrives, the server chef cooks up HTML skeleton bones, CSS paint, and bundles them into a gift box!',
            fact: 'Data centers are kept super chilly so millions of computer processors do not overheat!'
        },
        api: {
            badge: 'STEP 5',
            title: 'API Waiter Drone 🤖',
            analogy: 'At a restaurant, you don\'t walk into the kitchen—you tell the waiter! The API drone brings fresh live data like weather and high scores without reloading the whole screen.',
            fact: 'API stands for Application Programming Interface. It lets apps talk to each other like best friends!'
        }
    };

    // ------------------------------------------------------------------------
    // Preset Pill Clicks
    // ------------------------------------------------------------------------
    presetPills.forEach(pill => {
        pill.addEventListener('click', () => {
            sound.playPop(650);
            presetPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            selectedUrl = pill.getAttribute('data-url');
            urlInput.value = selectedUrl;
            selectedSite = sitePresets[selectedUrl] || {
                name: pill.getAttribute('data-name'),
                icon: '🌐',
                desc: 'Webpage built with HTML, CSS & JavaScript!',
                toyBtn: '⚡ Click to Interact!',
                toyReact: '🎉 Interactive JavaScript event triggered successfully!'
            };

            world.updateScreenReady(selectedUrl);
        });
    });

    urlInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            startRobotJourney();
        }
    });

    // ------------------------------------------------------------------------
    // The Core Journey: Start Robot Run!
    // ------------------------------------------------------------------------
    function startRobotJourney(resume = false) {
        if (isJourneyRunning) return;
        isJourneyRunning = true;

        if (!resume) sound.playRocket();
        selectedUrl = urlInput.value.trim() || 'https://cat-games.fun';
        selectedSite = sitePresets[selectedUrl] || {
            name: 'Custom Webpage',
            icon: '🌐',
            desc: 'Assembled by your browser with HTML skeleton, CSS style, and API data!',
            toyBtn: '⚡ Click to Interact!',
            toyReact: '🎉 Interactive JavaScript event triggered successfully!'
        };

        // Close any open modals
        workingSiteModal.classList.remove('open');
        stationModal.classList.remove('open');

        let progress = resume ? parseFloat(timeSlider.value) : 0;
        if (progress >= 100) progress = 0;
        timeSlider.value = progress;
        updateTimeUI(progress / 100);

        btnPlayPause.textContent = '⏸️ Pause';

        journeyTimer = setInterval(() => {
            // Speed increment: 0.15 at 0.25x (~23 seconds), 0.35 at 0.6x (~10s), 0.75 at 1.2x (~5s)
            const increment = (currentSpeed / 0.25) * 0.15;
            progress += increment;
            timeSlider.value = Math.min(100, progress);
            updateTimeUI(progress / 100);

            if (progress >= 100) {
                clearInterval(journeyTimer);
                isJourneyRunning = false;
                btnPlayPause.textContent = '▶️ Play';
                onJourneyComplete();
            }
        }, 35);
    }

    btnGo.addEventListener('click', () => startRobotJourney(false));

    // Speed Control Selection
    let currentSpeed = 0.25; // Default slow & gentle for kids!
    const speedBtns = document.querySelectorAll('.speed-btn');
    speedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sound.playPop(700);
            speedBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSpeed = parseFloat(btn.getAttribute('data-speed'));
        });
    });

    // Voice Narration Tracker for the Journey
    let spokenStages = { step1: false, step2: false, step3: false, step4: false, step5: false };

    // ------------------------------------------------------------------------
    // Time & Story Updates as Robot Runs
    // ------------------------------------------------------------------------
    function updateTimeUI(t) {
        world.setTime(t);

        // Highlight active step button
        journeySteps.forEach(s => s.classList.remove('active'));
        if (t < 0.15) {
            document.getElementById('step-1').classList.add('active');
            storyPhaseText.textContent = "1. PC Browser: Creating HTTP GET Request Packet!";
            robotBubble.textContent = "🤖 'Meet Byte-Bot! Your HTTP Request Courier taking your URL to the web!'";
            
            if (!spokenStages.step1 && t > 0.02) {
                spokenStages.step1 = true;
                sound.speak("Meet Byte-Bot! He is your browser's HTTP Request Courier. You entered a URL, so Byte-Bot packed a digital letter and is running into the network!");
            }
        } else if (t < 0.38) {
            document.getElementById('step-2').classList.add('active');
            storyPhaseText.textContent = "2. DNS Server: Translating website name into secret IP coordinates...";
            robotBubble.textContent = "🔮 DNS: 'Looked up directory! The IP address is 142.250.190.46!'";
            
            if (!spokenStages.step2 && t >= 0.20) {
                spokenStages.step2 = true;
                sound.playBeeps();
                sound.speak("Step 2! Byte-Bot reached the DNS Server. In computer science, routers don't understand words like cat-games.fun. The DNS looks up its phonebook and stamps the secret IP address 142.250.190.46 onto the packet!");
            }
        } else if (t < 0.62) {
            document.getElementById('step-3').classList.add('active');
            storyPhaseText.textContent = "3. Rainbow Road: Speeding through undersea fiber optic cables at light speed!";
            robotBubble.textContent = "🌈 'Photons of light laser beams racing across the ocean!'";
            
            if (!spokenStages.step3 && t >= 0.42) {
                spokenStages.step3 = true;
                sound.speak("Step 3! Byte-Bot is speeding across the Rainbow Fiber Highway! Under oceans, glass cables shoot laser light pulses at 124,000 miles per second!");
            }
        } else if (t < 0.86) {
            document.getElementById('step-4').classList.add('active');
            storyPhaseText.textContent = "4. Server & API: Chef cooks HTML/CSS & API drone delivers live data!";
            robotBubble.textContent = "☁️ 'API Waiter Drone swooped down and delivered live data into the gift box!'";
            
            if (!spokenStages.step4 && t >= 0.65) {
                spokenStages.step4 = true;
                sound.playDroneDelivery();
                sound.speak("Step 4! Byte-Bot reached the Cloud Web Server! The server bakes the HTML skeleton and CSS stylesheet. And look! The API Waiter Drone swoops down to deliver live data from the database into the gift box!");
            }
        } else {
            document.getElementById('step-5').classList.add('active');
            storyPhaseText.textContent = "5. HTTP 200 OK! Byte-Bot jumping into your PC screen!";
            robotBubble.textContent = "✨ 'Jumped into your screen! Browser is parsing HTML, CSS & JS!'";

            if (!spokenStages.step5 && t >= 0.88) {
                spokenStages.step5 = true;
                sound.speak("Step 5! Byte-Bot has the complete HTTP 200 OK Response payload! He's sprinting back across the bridge to leap right into your PC screen!");
            }
        }
    }

    // When Robot Returns
    function onJourneyComplete() {
        sound.playFanfare();
        world.updateScreenLoaded(selectedSite.name, selectedUrl);
        world.focusStation('client');

        if (window.confetti) {
            window.confetti({ particleCount: 100, spread: 80, origin: { y: 0.55 } });
        }

        // Open the Working Website Window
        setTimeout(() => {
            modalSiteUrl.textContent = selectedUrl;
            siteTitle.textContent = selectedSite.name;
            siteIcon.textContent = selectedSite.icon;
            siteDesc.textContent = selectedSite.desc;
            workingSiteModal.classList.add('open');

            sound.speak(`Success! Byte-Bot jumped into your PC! Your browser parsed the HTML, painted the CSS styles, and JavaScript brought the site to life! Go ahead and play!`);
        }, 600);
    }

    // ------------------------------------------------------------------------
    // Scrubber Slider Manual Control
    // ------------------------------------------------------------------------
    timeSlider.addEventListener('input', (e) => {
        if (journeyTimer) clearInterval(journeyTimer);
        isJourneyRunning = false;
        btnPlayPause.textContent = '▶️ Play';
        const t = parseFloat(e.target.value) / 100;
        updateTimeUI(t);
    });

    btnPlayPause.addEventListener('click', () => {
        if (isJourneyRunning) {
            clearInterval(journeyTimer);
            isJourneyRunning = false;
            btnPlayPause.textContent = '▶️ Play';
        } else {
            const isAtEnd = parseFloat(timeSlider.value) >= 100;
            if (isAtEnd) {
                spokenStages = { step1: false, step2: false, step3: false, step4: false, step5: false };
            }
            startRobotJourney(!isAtEnd);
        }
    });

    btnRewind.addEventListener('click', () => {
        if (journeyTimer) clearInterval(journeyTimer);
        isJourneyRunning = false;
        spokenStages = { step1: false, step2: false, step3: false, step4: false, step5: false };
        btnPlayPause.textContent = '▶️ Play';
        timeSlider.value = 0;
        updateTimeUI(0);
        world.focusStation('client');
    });

    btnFF.addEventListener('click', () => {
        if (journeyTimer) clearInterval(journeyTimer);
        isJourneyRunning = false;
        timeSlider.value = 100;
        updateTimeUI(1.0);
        onJourneyComplete();
    });

    // Step button jumps
    journeySteps.forEach(step => {
        step.addEventListener('click', () => {
            if (journeyTimer) clearInterval(journeyTimer);
            isJourneyRunning = false;
            btnPlayPause.textContent = '▶️ Play';
            const t = parseFloat(step.getAttribute('data-t'));
            timeSlider.value = t * 100;
            updateTimeUI(t);

            if (t === 0) world.focusStation('client');
            else if (t < 0.3) world.focusStation('dns');
            else if (t < 0.6) world.focusStation('bridge');
            else if (t < 0.9) world.focusStation('server');
            else world.focusStation('client');
        });
    });

    // ------------------------------------------------------------------------
    // Real Playable Cat Game Live Playground Logic
    // ------------------------------------------------------------------------
    let catScore = 100;
    let isCssActive = true;
    let isJsActive = true;
    const catHats = ['🎩', '👑', '🧢', '🕶️', '🎀'];
    let catHatIndex = 0;

    const catMascot = document.getElementById('cat-mascot');
    const catFace = document.getElementById('cat-face');
    const catHat = document.getElementById('cat-hat');
    const catMoodLabel = document.getElementById('cat-mood-label');
    const catScoreElem = document.getElementById('cat-score');
    const toyReactionText = document.getElementById('toy-reaction');
    const siteDisplayScreen = document.getElementById('site-display-screen');

    const btnCatYarn = document.getElementById('btn-cat-yarn');
    const btnCatFish = document.getElementById('btn-cat-fish');
    const btnCatLaser = document.getElementById('btn-cat-laser');
    const btnCatHat = document.getElementById('btn-cat-hat');

    const btnToggleCss = document.getElementById('btn-toggle-css');
    const btnToggleJs = document.getElementById('btn-toggle-js');

    // 1. Yarn Toss Action
    if (btnCatYarn) {
        btnCatYarn.addEventListener('click', () => {
            if (!isJsActive) {
                toyReactionText.textContent = '❌ JavaScript is OFF! The buttons have no brain and cannot react!';
                sound.playPop(300);
                return;
            }
            catScore += 50;
            catScoreElem.textContent = catScore;
            catFace.textContent = '😻';
            catMoodLabel.textContent = 'Super Excited! 🧶 Catch!';
            toyReactionText.textContent = '🧶 You threw the yarn ball! Kitten pounced & scored +50 Catnip Points!';
            sound.playMeow();
            if (window.confetti) window.confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
            setTimeout(() => { catFace.textContent = '🐱'; catMoodLabel.textContent = 'Happy & Playful! ❤️'; }, 1600);
        });
    }

    // 2. Fish Snack Action
    if (btnCatFish) {
        btnCatFish.addEventListener('click', () => {
            if (!isJsActive) {
                toyReactionText.textContent = '❌ JavaScript is OFF! The buttons have no brain and cannot react!';
                sound.playPop(300);
                return;
            }
            catScore += 100;
            catScoreElem.textContent = catScore;
            catFace.textContent = '😋';
            catMoodLabel.textContent = 'Munching Salmon! 🐟';
            toyReactionText.textContent = '🐟 Yum! The kitten munched the salmon treat! Purring happily (+100 pts)!';
            sound.playPop(850);
            sound.playMeow();
            if (window.confetti) window.confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
            setTimeout(() => { catFace.textContent = '🐱'; catMoodLabel.textContent = 'Happy & Playful! ❤️'; }, 1600);
        });
    }

    // 3. Laser Pointer Action
    if (btnCatLaser) {
        btnCatLaser.addEventListener('click', () => {
            if (!isJsActive) {
                toyReactionText.textContent = '❌ JavaScript is OFF! The buttons have no brain and cannot react!';
                sound.playPop(300);
                return;
            }
            catFace.textContent = '🙀';
            catMoodLabel.textContent = 'Chasing Red Dot! 🔴';
            toyReactionText.textContent = '🔴 Laser pointer shining! The kitten did a triple backflip!';
            sound.playPop(950);
            setTimeout(() => { catFace.textContent = '🐱'; catMoodLabel.textContent = 'Happy & Playful! ❤️'; }, 1600);
        });
    }

    // 4. Change Cat Hat Action
    if (btnCatHat) {
        btnCatHat.addEventListener('click', () => {
            if (!isJsActive) {
                toyReactionText.textContent = '❌ JavaScript is OFF! The buttons have no brain and cannot react!';
                sound.playPop(300);
                return;
            }
            catHatIndex = (catHatIndex + 1) % catHats.length;
            catHat.textContent = catHats[catHatIndex];
            toyReactionText.textContent = `🎩 Kitten styled with a new hat: ${catHats[catHatIndex]}!`;
            sound.playPop(700);
        });
    }

    // 5. Click on Cat Mascot Directly
    if (catMascot) {
        catMascot.addEventListener('click', () => {
            if (!isJsActive) {
                toyReactionText.textContent = '❌ JavaScript is OFF! The cat cannot react!';
                return;
            }
            catFace.textContent = '😻';
            sound.playMeow();
            toyReactionText.textContent = '🐱 *Purr purr!* You petted the kitten! Heart rate: 100% happy!';
            if (window.confetti) window.confetti({ particleCount: 25, spread: 40, origin: { y: 0.55 } });
            setTimeout(() => { catFace.textContent = '🐱'; }, 1400);
        });
    }

    // 6. Live Tech Toggles (HTML / CSS / JS Sandbox)
    if (btnToggleCss) {
        btnToggleCss.addEventListener('click', () => {
            isCssActive = !isCssActive;
            sound.playPop(isCssActive ? 750 : 450);
            btnToggleCss.classList.toggle('active', isCssActive);
            btnToggleCss.textContent = isCssActive ? '🎨 CSS: ON' : '🎨 CSS: OFF (Raw HTML)';
            siteDisplayScreen.classList.toggle('css-disabled', !isCssActive);
            toyReactionText.textContent = isCssActive ? '🎨 CSS turned ON! Beautiful colors, styles and rounded curves restored!' : '🦴 CSS turned OFF! Look at that: without CSS, websites are just plain unstyled black text!';
        });
    }

    if (btnToggleJs) {
        btnToggleJs.addEventListener('click', () => {
            isJsActive = !isJsActive;
            sound.playPop(isJsActive ? 850 : 400);
            btnToggleJs.classList.toggle('active', isJsActive);
            btnToggleJs.textContent = isJsActive ? '⚡ JS: ON' : '⚡ JS: OFF (Sleeping)';
            toyReactionText.textContent = isJsActive ? '⚡ JavaScript ON! Interactive superpowers, buttons and sounds restored!' : '⚠️ JavaScript OFF! The webpage brain is sleeping. Buttons will not react!';
        });
    }

    btnCloseWorkingSite.addEventListener('click', () => {
        workingSiteModal.classList.remove('open');
        sound.playPop(400);
    });

    // ------------------------------------------------------------------------
    // Station Educational Modals
    // ------------------------------------------------------------------------
    function openStationInfo(id) {
        const info = stationData[id];
        if (!info) return;

        stationBadge.textContent = info.badge;
        stationTitle.textContent = info.title;
        stationAnalogy.textContent = info.analogy;
        stationFact.textContent = info.fact;
        stationModal.classList.add('open');
        sound.playPop(700);

        world.focusStation(id);
    }

    window.onStationClick = (id) => {
        openStationInfo(id);
    };

    btnCloseStation.addEventListener('click', () => {
        stationModal.classList.remove('open');
        sound.stopSpeaking();
        sound.playPop(400);
    });

    btnReadStation.addEventListener('click', () => {
        const text = `${stationTitle.textContent}. ${stationAnalogy.textContent} Web Fact: ${stationFact.textContent}`;
        sound.speak(text);
    });

    // Camera follow toggle
    const btnToggleCam = document.getElementById('btn-toggle-cam');
    const camIcon = document.getElementById('cam-icon');
    btnToggleCam.addEventListener('click', () => {
        world.followRobot = !world.followRobot;
        camIcon.textContent = world.followRobot ? '🎥 Follow: ON (Free Zoom)' : '🎥 Follow: OFF';
        btnToggleCam.title = world.followRobot ? 'Follow Mode ON: Scroll mouse wheel to zoom in/out freely, drag to orbit!' : 'Toggle Camera Follow Mode';
        sound.playPop(world.followRobot ? 750 : 450);
        if (world.followRobot) {
            updateStory("🎥 Follow Camera active! Scroll your mouse wheel to zoom out and view the API Drone!", "🎥 Following Robot Byte! Use your mouse wheel to zoom in or out freely!");
        }
    });

    // Sound toggle
    const btnSound = document.getElementById('btn-toggle-sound');
    const soundIcon = document.getElementById('sound-icon');
    btnSound.addEventListener('click', () => {
        const enabled = sound.toggle();
        soundIcon.textContent = enabled ? '🔊 Sound' : '🔇 Muted';
    });

    // Mobile Connect Modal
    const btnMobileLink = document.getElementById('btn-mobile-link');
    const mobileModal = document.getElementById('mobile-modal');
    const btnCloseMobile = document.getElementById('btn-close-mobile');
    const btnCopyMobile = document.getElementById('btn-copy-mobile-ip');
    const mobileIpInput = document.getElementById('mobile-ip-input');
    const copyFeedback = document.getElementById('copy-feedback');

    if (btnMobileLink && mobileModal) {
        if (window.location.hostname && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            mobileIpInput.value = window.location.origin + '/';
        }

        btnMobileLink.addEventListener('click', () => {
            mobileModal.style.display = 'block';
            mobileModal.classList.add('open');
            sound.playPop(600);
        });

        if (btnCloseMobile) {
            btnCloseMobile.addEventListener('click', () => {
                mobileModal.style.display = 'none';
                mobileModal.classList.remove('open');
                sound.playPop(400);
            });
        }

        if (btnCopyMobile) {
            btnCopyMobile.addEventListener('click', () => {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(mobileIpInput.value).then(() => {
                        copyFeedback.textContent = '✅ Copied to clipboard! Share to your phone or type in mobile browser.';
                        sound.playSuccess();
                        setTimeout(() => { copyFeedback.textContent = ''; }, 3500);
                    }).catch(() => {
                        mobileIpInput.select();
                        document.execCommand('copy');
                        copyFeedback.textContent = '✅ Link copied!';
                    });
                } else {
                    mobileIpInput.select();
                    document.execCommand('copy');
                    copyFeedback.textContent = '✅ Link copied!';
                }
            });
        }
    }

    // Mascot click greeting
    document.getElementById('brand-mascot-btn').addEventListener('click', () => {
        sound.playSuccess();
        sound.speak("Hi explorer! I'm Robot Byte. Type any website in the bar above and press GO to watch me deliver your site!");
    });
});
