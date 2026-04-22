/* File: js/script.js */

document.addEventListener('DOMContentLoaded', function() {

    /* --- 1. INTERACTIVE TERMINAL LOGIC --- */
    const inputField = document.getElementById('term-input');
    const outputDiv = document.getElementById('terminal-output');
    const terminalWindow = document.querySelector('.terminal-window');

    if (inputField && outputDiv) {
        terminalWindow.addEventListener('click', () => { inputField.focus(); });

        inputField.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const command = this.value.toLowerCase().trim();
                let response = "";
                let action = null;

                switch(command) {
                    case 'help':
                        response = "Available commands:<br>&nbsp;&nbsp;• projects - View my work<br>&nbsp;&nbsp;• experience - View my job history<br>&nbsp;&nbsp;• cv - Download Resume<br>&nbsp;&nbsp;• contact - Email me<br>&nbsp;&nbsp;• clear - Clear screen";
                        break;
                    case 'projects':
                        response = "Navigating to projects section...";
                        action = () => window.location.href = "#projects";
                        break;
                    case 'experience':
                        response = "Navigating to experience section...";
                        action = () => window.location.href = "#experience";
                        break;
                    case 'cv':
                        response = "Opening CV...";
                        action = () => window.open('https://drive.google.com/file/d/1EjAFW9PaA-53jmjdtTdDJqqr6wkRpJxv/view?usp=sharing', '_blank');
                        break;
                    case 'contact':
                        response = "Opening contact section...";
                        action = () => window.location.href = "#contact";
                        break;
                    case 'clear':
                        outputDiv.innerHTML = "";
                        this.value = "";
                        return; 
                    case 'whoami':
                        response = "root@retaj";
                        break;
                    case '':
                        response = "";
                        break;
                    default:
                        response = `<span style="color:#EF4444">Command not found: '${command}'. Type 'help' for commands.</span>`;
                }

                if (command) {
                    outputDiv.innerHTML += `<div style="margin-bottom:0.5rem"><span class="green">root@retaj:~#</span> ${command}<br><span style="color:#A5B4FC">${response}</span></div>`;
                }

                if (action) { setTimeout(action, 800); }
                this.value = "";
                this.focus();
                inputField.scrollIntoView({behavior: "smooth", block: "end"});
            }
        });
    }

    /* --- 2. CAROUSEL SLIDER LOGIC --- */
    const track = document.getElementById('track');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    if (track && nextBtn && prevBtn) {
        const cards = document.querySelectorAll('.carousel-track .project-card');
        let currentIndex = 0;

        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        nextBtn.addEventListener('click', () => {
            if (currentIndex === cards.length - 1) { currentIndex = 0; } else { currentIndex++; }
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex === 0) { currentIndex = cards.length - 1; } else { currentIndex--; }
            updateCarousel();
        });
    }

    /* --- 3. BACK TO TOP BUTTON --- */
    const backToTopButton = document.getElementById("backToTop");
    if (backToTopButton) {
        window.onscroll = function() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTopButton.classList.add("visible");
            } else {
                backToTopButton.classList.remove("visible");
            }
        };
        backToTopButton.addEventListener("click", function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* --- 4. SHOW MORE CERTIFICATIONS LOGIC --- */
    const certBtn = document.getElementById('toggle-certs-btn');
    const hiddenCerts = document.getElementById('hidden-certs');

    if (certBtn && hiddenCerts) {
        certBtn.addEventListener('click', function() {
            // Check visibility using computed style
            if (hiddenCerts.style.display === 'none' || getComputedStyle(hiddenCerts).display === 'none') {
                // Show them
                hiddenCerts.style.display = 'grid';
                // Change button text
                this.innerHTML = "↑ ./hide_extra_certs.sh";
                // Add active class (Green)
                this.classList.add('active');
            } else {
                // Hide them
                hiddenCerts.style.display = 'none';
                // Change button text back
                this.innerHTML = "↓ ./show_all_certs.sh";
                // Remove active class (Blue)
                this.classList.remove('active');
            }
        });
    }
});

/* --- 5. TERMINAL TYPING EFFECT --- */
    const typeText = "./whoami.sh";
    const typeTarget = document.querySelector('.command-line .green'); // The prompt
    
    // 1. Find the text node after the prompt (the "./whoami.sh" part)
    // We need to clear it first, then type it back.
    // Note: This assumes your HTML is exactly: <span class="green">root@abdulrahman:~#</span> ./whoami.sh
    
    const commandLineDiv = document.querySelector('.command-line');
    if (commandLineDiv) {
        // Clear the text content EXCEPT the prompt span
        const promptSpan = commandLineDiv.querySelector('span');
        commandLineDiv.innerHTML = ""; 
        commandLineDiv.appendChild(promptSpan); 
        
        let i = 0;
        function typeWriter() {
            if (i < typeText.length) {
                commandLineDiv.innerHTML += typeText.charAt(i);
                i++;
                setTimeout(typeWriter, 100); // Typing speed
            } else {
                // After typing finishes, fade in the output
                const output = document.querySelector('.output');
                if(output) output.style.opacity = 1;
            }
        }
        
        // Start typing after 0.5 seconds
        setTimeout(typeWriter, 500);
    }