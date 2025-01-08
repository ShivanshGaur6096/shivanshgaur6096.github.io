// Store project details in an object for easier management
const skillsData = {
    "Languages": ["Swift", "SwiftUI", "Obj-C", "JavaScript", "English", "Hindi"],
    "Libraries": ["Core Data", "XCtest", "StoreKit", "CallKit", "WebRtc", "CoreML", "FreeSwitch", "Text-To-Speech", "Speech-to-text"],
    "Tools": ["Xcode", "Instruments", "Figma", "Adobe XD", "Visual Studio Code"],
    "Architecture Pattern": ["MVC", "MVVM", "VIPER", "Clean Architecture"],
    "Version Control": ["Git", "CI/CD", "GitHub", "Bitbucket", "GitLab", "Source Tree"],
    "Skills": ["App Publishing", "Firebase", "Auto Layout", "Memory Management", "System Design", "Caching", "Networking", "Accessibility", "Payment Gateways Integration", "Dependency Management"],
    "Backend & APIs": ["Restful APIs", "Kafka", "WebSockets", "Firebase Auth", "Firebase Database", "Firebase Analytics", "Dynatrace", "Omniture"],
    "Cross-Platform Development": ["React Native"],
    "Notifications": ["Push Notifications"],
    "Analytics & Monitoring": ["Firebase Analytics", "Kafka Elastic"],
};

const projectDetails = {
    "MagicCall": {
        banner: "assets/project-images/magiccall/magiccall-banner.png",
        screenshots: [
            "assets/project-images/magiccall/screenshot1.png",
            "assets/project-images/magiccall/screenshot2.png",
            "assets/project-images/magiccall/screenshot3.png",
            "assets/project-images/magiccall/screenshot4.png",
            "assets/project-images/magiccall/screenshot5.png",
        ],
        iosLink: "https://apps.apple.com/in/app/magiccall-funny-calling-app/id1324524338",
        description: `
        <h2> Magic Call </h2>
            The era of boring conversations is over, so add some spice to your calls. 
            Now decide how you want to be heard. Change your voice on call in real time 
            and create hilarious conversations with your friends and family. The possibilities are endless!
           <br><br>
            Site URL: <a href="https://magiccall.co/" target="_blank">MagicCall Website</a>
        `,
    },
    "Bell": {
        banner: "assets/project-images/bell/bell-logo.png",
        screenshots: [
            "assets/project-images/magiccall/screenshot1.png",
            "assets/project-images/magiccall/screenshot2.png",
        ],
        iosLink: "https://apps.apple.com/ca/app/mybell/id850549838",
        description: `
            Collaborated on enhancement efforts for Bell Canada's flagship applications.
            Improved user engagement through advanced technologies and inclusive design.
            <br><br>
            Site URL: <a href="https://www.bell.ca/Mobility" target="_blank">Bell Mobility</a>
        `,
    },
    "Virgin Plus": {
        banner: "assets/project-images/virgin-plus/virgin-plus-logo.png",
        screenshots: [
            "assets/project-images/magiccall/screenshot1.png",
            "assets/project-images/magiccall/screenshot2.png",
        ],
        iosLink: "https://apps.apple.com/ca/app/virgin-plus-my-account/id853116586",
        description: `
            Revolutionized user engagement for Virgin Plus apps by implementing dynamic Shop Tabs
            and cutting-edge GraphQL-based APIs for seamless data manipulation.
            <br><br>
            Site URL: <a href="https://www.virginplus.ca/en/home/index.html" target="_blank">Virgin Plus</a>
        `,
    },
    "Lucky Mobile": {
        banner: "assets/project-images/lucky-mobile/lucky-mobile-logo.png",
        screenshots: [
            "assets/project-images/magiccall/screenshot1.png",
            "assets/project-images/magiccall/screenshot2.png",
        ],
        iosLink: "https://apps.apple.com/ca/app/lucky-mobile-my-account/id1459173378",
        description: `
        Site URL: <a href="https://www.luckymobile.ca/" target="_blank">Lucky Mobile Website</a>
        `,
    },
    "PC Mobile": {
        banner: "assets/project-images/pc-mobile/pc-mobile-logo.png",
        screenshots: [
            "assets/project-images/magiccall/screenshot1.png",
            "assets/project-images/magiccall/screenshot2.png",
        ],
        iosLink: "https://apps.apple.com/ca/app/my-pc-mobile-prepaid/id1439611408",
        description: `
        Site URL: <a href="https://www.pcmobile.ca/en/" target="_blank">PC Mobile Website</a>
        `,
    },
    // Add more project details as needed
};

const selectedFilters = new Set();

function createFilterButtons() {
    const filterButtonsContainer = document.querySelector(".filter-buttons");

    filterButtonsContainer.innerHTML = "";

    Object.keys(skillsData).forEach((category) => {
        const button = document.createElement("button");
        button.className = "filter-button";
        button.textContent = category;
        button.onclick = () => toggleFilter(category);
        filterButtonsContainer.appendChild(button);
    });
}

// Create view on home screen
createFilterButtons();

// On click of button action
function toggleFilter(category) {
    const button = [...document.querySelectorAll(".filter-button")].find((btn) =>
        btn.textContent.trim() === category
    );

    if (!button) return;

    if (selectedFilters.has(category)) {
        selectedFilters.delete(category);
        button.classList.remove("active");
    } else {
        selectedFilters.add(category);
        button.classList.add("active");
    }

    updateFilteredSkills();
}

//
function updateFilteredSkills() {
    const filteredSkills = document.querySelector(".filtered-skills");
    const highlightedSkills = document.querySelector(".highlighted-skills");
    
        // Clear existing content
    filteredSkills.innerHTML = "";
    highlightedSkills.style.display = selectedFilters.size ? "none" : "flex";

    if (selectedFilters.size) {
        selectedFilters.forEach((filter) => {
            const skills = skillsData[filter];
            skills.forEach((skill) => {
                const li = document.createElement("li");
                li.textContent = skill;
                filteredSkills.appendChild(li);
            });
        });
    } else {
        // Default View: Show first 4 skills with icons
        highlightedSkills.style.display = "flex";
        filteredSkills.innerHTML = `
            <li>Firebase</li>
            <li>Memory Management</li>
            <li>MVVM</li>
            <li>Combine Framework</li>
            <li>App Analytics</li>
            <li class="show-more" onclick="showMoreSkills()">Show more...</li>
        `;
    }
}

// When Show more button is clicked create filter button
function showMoreSkills() {
    const popup = document.getElementById("project-modal");
    const description = document.getElementById("project-description");

    const banner = document.getElementById("project-banner");
    const carousel = document.getElementById("project-carousel");
    const iosLink = document.getElementById("ios-download");

    const skillsList = Object.entries(skillsData)
    .map(
        ([category, skills]) =>
            `<h3>${category}</h3><ul>${skills
                .map(
                    (skill) =>
                        // I don't have screenshot for every language so removing this for now
                        // `<li><img src="assets/skill-images/${skill.toLowerCase().replace(
                        //     /\s+/g,
                        //     "-"
                        // )}.png" alt="${skill}"> ${skill}</li>`
                        `
                        <li>${skill}</li>
                        `
                )
                .join("")}</ul>`
    )
    .join("");

    // Hiding project-specific content (carousel, banner, etc.)
    banner.style.display = "none";
    iosLink.style.display = "none";
    carousel.style.display = "none";

    // Update description with the filtered skills list
    description.innerHTML = skillsList;
    
    // Show the modal
    popup.style.display = "flex";
}

// Show Project Details
function showProjectDetails(project) {
    const modal = document.getElementById("project-modal");
    const projectData = projectDetails[project];

    // Modal Elements
    const banner = document.getElementById("project-banner");
    const description = document.getElementById("project-description");
    const carousel = document.getElementById("project-carousel");
    const iosLink = document.getElementById("ios-download");

    if (projectData) {
        // Handle Project Category
        banner.style.display = projectData.banner ? "block" : "none";
        if (projectData.banner) banner.src = projectData.banner;

        description.style.display = projectData.description ? "block" : "none";
        if (projectData.description) description.innerHTML = projectData.description;

        carousel.innerHTML = projectData.screenshots.length
            ? projectData.screenshots
                  .map((img) => `<img src="${img}" alt="${project} screenshot" class="carousel-item">`)
                  .join("")
            : `<p>No screenshots available</p>`;

        iosLink.style.display = projectData.iosLink ? "inline-block" : "none";
        iosLink.href = projectData.iosLink || "#";

        modal.style.display = "flex";
    } else {
        console.error(`Project "${project}" details not found.`);
    }
}

function closeModal() {
    document.getElementById("project-modal").style.display = "none";
}
