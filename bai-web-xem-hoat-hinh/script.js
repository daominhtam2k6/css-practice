"use strict";

// Du lieu mau phuc vu bai thuc hanh.
// views la luot xem gia lap, khong phai thong ke thuc te.
const movies = [
    {
        id: 1,
        title: "Big Buck Bunny - Phim hoạt hình",
        icon: "🐰",
        type: "mp4",
        source:
            "https://uploads.video-commander.com/sample/BigBuckBunny.mp4",
        description:
            "Phim hoạt hình mẫu Big Buck Bunny, " +
            "phát bằng thẻ video HTML5. " +
            "Nguồn tham khảo có phiên bản HD 720p.",
        updated: "2026-09-01",
        views: 1200,
        quality: "HD 720p · MP4"
    },
    {
        id: 2,
        title: "Big Buck Bunny - YouTube",
        icon: "🎬",
        type: "youtube",
        source: "aqz-KE-bpKQ",
        description:
            "Ví dụ nhúng một video hoạt hình từ YouTube " +
            "bằng thẻ iframe. Khả năng phát và quảng cáo " +
            "phụ thuộc YouTube.",
        updated: "2026-08-01",
        views: 3500,
        quality: "YouTube · Chất lượng tùy trình phát"
    }
];

let selectedId = 1;

const listElement = document.getElementById("movie-list");
const searchElement = document.getElementById("search");
const sortElement = document.getElementById("sort");
const emptyElement = document.getElementById("empty-message");

const videoContainer = document.getElementById("video-container");
const titleElement = document.getElementById("movie-title");
const descriptionElement = document.getElementById("movie-description");
const qualityElement = document.querySelector(".quality");

function renderMovies() {
    const keyword = searchElement.value.trim().toLowerCase();

    const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(keyword)
    );

    if (sortElement.value === "popular") {
        filtered.sort((a, b) => b.views - a.views);
    } else {
        filtered.sort((a, b) =>
            b.updated.localeCompare(a.updated)
        );
    }

    listElement.replaceChildren();
    emptyElement.hidden = filtered.length > 0;

    filtered.forEach(movie => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "movie-card";

        if (movie.id === selectedId) {
            card.classList.add("active");
        }

        const thumb = document.createElement("span");
        thumb.className = "thumbnail";
        thumb.textContent = movie.icon;

        const details = document.createElement("span");
        details.className = "movie-details";

        const name = document.createElement("strong");
        name.textContent = movie.title;

        const metadata = document.createElement("small");
        metadata.textContent =
            movie.type.toUpperCase() + " · " +
            movie.views.toLocaleString("vi-VN") +
            " lượt xem demo";

        details.append(name, metadata);
        card.append(thumb, details);

        card.addEventListener("click", () => {
            selectMovie(movie);
        });

        listElement.append(card);
    });
}

function selectMovie(movie) {
    selectedId = movie.id;

    titleElement.textContent = movie.title;
    descriptionElement.textContent = movie.description;
    qualityElement.textContent = movie.quality;

    videoContainer.replaceChildren();

    if (movie.type === "youtube") {
        const iframe = document.createElement("iframe");

        iframe.src =
            "https://www.youtube-nocookie.com/embed/" +
            movie.source;

        iframe.title = movie.title;
        iframe.allow =
            "accelerometer; autoplay; clipboard-write; " +
            "encrypted-media; gyroscope; picture-in-picture";

        iframe.allowFullscreen = true;
        iframe.referrerPolicy = "strict-origin-when-cross-origin";

        videoContainer.append(iframe);
    } else {
        const video = document.createElement("video");
        video.controls = true;
        video.playsInline = true;
        video.preload = "metadata";

        const source = document.createElement("source");
        source.src = movie.source;
        source.type = "video/mp4";

        video.append(source);
        videoContainer.append(video);
    }

    renderMovies();
}

searchElement.addEventListener("input", renderMovies);
sortElement.addEventListener("change", renderMovies);

// Mac dinh phat video dau tien
selectMovie(movies[0]);
