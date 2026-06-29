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

    const resume = document.getElementById("resume").files[0];

if (!resume && !name && !role && !company && !skills) {
    alert("Please upload a resume or fill at least one field.");
    return;
}

    output.textContent = "Generating...";

    try {
        console.log("Sending request...");
        const formData = new FormData();
formData.append("name", name);
formData.append("role", role);
formData.append("company", company);
formData.append("skills", skills);
if (resume) {
            formData.append("resume", resume);
}    
console.log(formData.get("resume"));
        const response = await fetch("https://cover-letter-generator-phi-eight.vercel.app/generate", {
        method: "POST",
            
            body: formData,

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