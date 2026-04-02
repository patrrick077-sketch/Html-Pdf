const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");
const form = document.getElementById("uploadForm");
const loading = document.getElementById("loading");

dropZone.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
    fileName.textContent = fileInput.files[0]?.name || "";
});

dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("bg-gray-200");
});

dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("bg-gray-200");
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("bg-gray-200");

    fileInput.files = e.dataTransfer.files;
    fileName.textContent = fileInput.files[0]?.name || "";
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!fileInput.files.length) {
        alert("Please select a file");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    loading.classList.remove("hidden");

    const response = await fetch("/convert", {
        method: "POST",
        body: formData
    });

    loading.classList.add("hidden");

    if (!response.ok) {
        alert("Conversion failed");
        return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.pdf";
    a.click();
});
