// Store project details in an object for easier management

const skillsData = {
    "Development": ["Swift", "SwiftUI", "Objective-C", "Firebase", "XCtest", "Memory Management"],
    "Design Tools": ["Figma", "Adobe XD", "Sketch", "Zeplin"],
    "Architecture Pattern": ["MVC", "MVVM", "VIPER", "Clean Architecture"],
    "Version Control": ["Git", "GitHub", "Bitbucket", "GitLab"],
    "Languages": ["Swift", "Objective-C", "Python", "JavaScript", "C", "C++"],
};

const selectedFilters = new Set();

function toggleFilter(category, fromPopup = false) {
    // const button = document.querySelector(`.filter-button:contains('${category}')`);
    // const filteredSkills = document.querySelector(".filtered-skills");
    
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

    // Close the popup only if toggleFilter is invoked outside the popup
    if (fromPopup === false) {
        closePopup();
    } else {
        updatePopupSkills(); // Update the popup skills dynamically
    }
}

function updatePopupSkills() {
    const popupSkillsList = document.getElementById("popup-skills-list");
    popupSkillsList.innerHTML = "";

    if (selectedFilters.size) {
        selectedFilters.forEach((filter) => {
            skillsData[filter].forEach((skill) => {
                const li = document.createElement("li");
                li.textContent = skill;
                popupSkillsList.appendChild(li);
            });
        });
    } else {
        for (const category in skillsData) {
            skillsData[category].forEach((skill) => {
                const li = document.createElement("li");
                li.textContent = skill;
                popupSkillsList.appendChild(li);
            });
        }
    }
}

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
            <li>Zeplin</li>
            <li>Clean Architecture</li>
            <li class="show-more" onclick="showMoreSkills()">Show more...</li>
        `;
    }
}


function showMoreSkills() {
    const popup = document.getElementById("popup");
    const popupSkillsList = document.getElementById("popup-skills-list");

    popupSkillsList.innerHTML = "";

    for (const category in skillsData) {
        skillsData[category].forEach((skill) => {
            const li = document.createElement("li");
            li.textContent = skill;
            popupSkillsList.appendChild(li);
        });
    }

    popup.classList.remove("hidden");
}

function closePopup() {
    document.getElementById("popup").classList.add("hidden");
}

const projectDetails = {
    MagicCall: {
        banner: "assets/project-images/magiccall/magiccall-banner.png",
        description: `
            The era of boring conversations is over, so add some spice to your calls. 
            Now decide how you want to be heard. Change your voice on call in real time 
            and create hilarious conversations with your friends and family. The possibilities are endless!
            <br><br>
            App Store URL: <a href="https://apps.apple.com/in/app/magiccall-funny-calling-app/id1324524338" target="_blank">AppStore: MagicCall App</a><br>
            Site URL: <a href="https://magiccall.co/" target="_blank">MagicCall Website</a>
        `,
    },
    Bell: {
        banner: "assets/project-images/bell/bell-logo.png",
        description: `
            Collaborated on enhancement efforts for Bell Canada's flagship applications.
            Improved user engagement through advanced technologies and inclusive design.
        `,
    },
    "Virgin Plus": {
        banner: "assets/project-images/virgin-plus/virgin-plus-logo.png",
        description: `
            Revolutionized user engagement for Virgin Plus apps by implementing dynamic Shop Tabs
            and cutting-edge GraphQL-based APIs for seamless data manipulation.
        `,
    },
    "Lucky Mobile": {
        banner: "assets/project-images/lucky-mobile/lucky-mobile-logo.png",
        description: `
        Site URL: <a href="https://www.luckymobile.ca/" target="_blank">Lucky Mobile Website</a>
        `,
    },
    "PC Mobile": {
        banner: "assets/project-images/pc-mobile/pc-mobile-logo.png",
        description: `
        Site URL: <a href="https://www.luckymobile.ca/" target="_blank">PC Mobile Website</a>
        `,
    },
    // Add more project details as needed
};

function showProjectDetails(project) {
    const projectData = projectDetails[project];

    if (projectData) {
        // Update project details dynamically
        document.getElementById("project-banner").src = projectData.banner;
        document.getElementById("project-description").innerHTML = projectData.description;
        document.getElementById("project-modal").style.display = "flex";
    } else {
        console.error(`Project "${project}" details not found.`);
    }
}

function closeModal() {
    document.getElementById("project-modal").style.display = "none";
}