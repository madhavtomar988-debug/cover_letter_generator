console.log("App.js Loaded");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const output = document.getElementById("output");

generateBtn.addEventListener("click", async () => {

    console.log("Generate button clicked");
    const name = document.getElementById("name").value;
    const role = document.getElementById("role").value;
    const company = document.getElementById("company").value;
    const skills = document.getElementById("skills").value;

    if (!name || !role || !company || !skills) {
        alert("Please fill all fields.");
        return;
    }

    output.textContent = "Generating...";

    try {
        console.log("Sending request...");
        const response = await fetch("/generate", {
        method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                role,
                company,
                skills
            })
        });
        console.log("Response received");
        console.log(response.status);

 const data = await response.json();
console.log(data);

if (!response.ok) {
    output.textContent = data.error;
    return;
}

output.textContent = data.coverLetter;
    } catch (error) {
        console.error(error);
        output.textContent = "Error generating cover letter.";
    }
});

copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(output.textContent);

    alert("Cover Letter Copied!");
});