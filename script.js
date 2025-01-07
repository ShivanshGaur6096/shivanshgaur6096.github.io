// Store project details in an object for easier management
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