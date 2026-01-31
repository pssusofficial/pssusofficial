const username = 'pssusofficial'; 
const repo = 'pssusofficial.github.io';
const folder = 'gallery';

// গ্যালারি লোড (শুধুমাত্র gallery.html এর জন্য)
async function loadGallery() {
    const grid = document.getElementById('photo-grid');
    if (!grid) return;

    try {
        const res = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${folder}`);
        const files = await res.json();
        grid.innerHTML = '';

        files.forEach(file => {
            if (file.name.match(/\.(jpe?g|png|gif|webp)$/i)) {
                grid.innerHTML += `
                    <div class="gallery-item">
                        <img src="${file.download_url}" alt="PSSUS" loading="lazy">
                    </div>`;
            }
        });
    } catch (e) {
        grid.innerHTML = '<p>ছবি লোড করা যাচ্ছে না।</p>';
    }
}

// স্লাইডার কন্ট্রোল (শুধুমাত্র index.html এর জন্য)
let slideIndex = 1;
function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    if (slides.length === 0) return;
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    for (let s of slides) s.style.display = "none";
    slides[slideIndex-1].style.display = "block";
}

function changeSlide(n) { showSlides(slideIndex += n); }

// অটো রান
window.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    const slides = document.getElementsByClassName("slide");
    if (slides.length > 0) {
        showSlides(slideIndex);
        setInterval(() => changeSlide(1), 5000);
    }
});

// মোবাইল ড্রপ-ডাউন হ্যান্ডলার
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown > a');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            // যদি স্ক্রিন ছোট হয় (মোবাইল ভিউ)
            if (window.innerWidth <= 768) {
                e.preventDefault(); // মূল লিঙ্কে যাওয়া বন্ধ করবে
                dropdownMenu.classList.toggle('show'); // মেনু দেখাবে বা লুকাবে
            }
        });
    }
});

