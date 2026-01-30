/* ১. গিটহাব থেকে অটোমেটিক গ্যালারি লোড */
const username = 'YOUR_GITHUB_USERNAME'; // আপনার গিটহাব ইউজারনেম
const repo = 'YOUR_REPO_NAME';           // আপনার রিপোজিটরির নাম
const folderName = 'gallery';            // আপনার ফোল্ডারের নাম 'gallery'

async function loadGallery() {
    const photoGrid = document.getElementById('photo-grid');
    if (!photoGrid) return; 

    const url = `https://api.github.com/repos/${username}/${repo}/contents/${folderName}`;
    
    try {
        const response = await fetch(url);
        const files = await response.json();

        // পুরোনো ছবি থাকলে তা মুছে নতুন করে লোড করবে
        photoGrid.innerHTML = '';

        files.forEach(file => {
            // শুধু ছবি ফাইলগুলো বাছাই করবে
            if (file.name.match(/\.(jpe?g|png|gif|webp)$/i)) {
                const imgHTML = `
                    <div class="gallery-item">
                        <img src="${file.download_url}" alt="Club Activity">
                    </div>
                `;
                photoGrid.innerHTML += imgHTML;
            }
        });
    } catch (error) {
        console.error("ছবি লোড হতে সমস্যা হয়েছে:", error);
        photoGrid.innerHTML = '<p style="text-align:center">গ্যালারি লোড করা সম্ভব হয়নি।</p>';
    }
}

/* ২. স্লাইডার কন্ট্রোল (যা আপনার ইনডেক্স ফাইলে স্লাইডার দেখাবে) */
let slideIndex = 1;

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    if (slides.length === 0) return;
    
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex-1].style.display = "block";  
}

function changeSlide(n) {
    showSlides(slideIndex += n);
}

// ৩. উইন্ডো লোড হওয়ার সাথে সাথে সব চালু করা
window.onload = () => {
    loadGallery(); // অটো গ্যালারি
    showSlides(slideIndex); // স্লাইডার
    
    // অটো স্লাইড ৫ সেকেন্ড পর পর
    setInterval(() => {
        changeSlide(1);
    }, 5000);
};
