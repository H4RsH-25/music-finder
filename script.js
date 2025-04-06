window.onload = function () {
    const input = document.getElementById("input");
    const current = document.getElementById("current");

    async function searchMusic(query) {
        const url = `https://api.lyrics.ovh/suggest/${query}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();
            displayResults(data.data);
        } catch (error) {
            console.error("Error:", error);
            current.innerHTML = "<p style='color: red;'>Error fetching songs.</p>";
        }
    }

    function displayResults(songs) {
        current.innerHTML = "";

        if (songs.length === 0) {
            current.innerHTML = "<p>No songs found</p>";
            return;
        }

        songs.slice(0, 5).forEach(song => {
            const songItem = document.createElement("p");
            songItem.textContent = `${song.artist.name} - ${song.title}`;
            current.appendChild(songItem);
        });
    }

    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && input.value.trim() !== "") {
            searchMusic(input.value.trim());
            input.value = "";
        }
    });
};
