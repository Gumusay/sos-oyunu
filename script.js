document.addEventListener("DOMContentLoaded", function () {
    const hücreler = document.querySelectorAll(".title");
    const oyuncuDurumu = document.querySelector(".display-player");
    const sıfırlaDüğmesi = document.getElementById("reset");
    const skorSninElement = document.getElementById('S-skor');
    const skorOnunElement = document.getElementById('O-skor');

    let skorSnin = 0;
    let skorOnun = 0;
    let şuankiOyuncu = "S";
    let oyunTahtası = ["", "", "", "", "", "", "", "", ""];
    let oyunDevamEdiyor = true;

    function kazananıKontrolEt() {
        const kazanmaDesenleri = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const desen of kazanmaDesenleri) {
            const [a, b, c] = desen;
            if (oyunTahtası[a] && oyunTahtası[a] === oyunTahtası[b] && oyunTahtası[a] === oyunTahtası[c]) {
                oyunDevamEdiyor = false;
                return oyunTahtası[a];
            }
        }

        if (!oyunTahtası.includes("")) {
            oyunDevamEdiyor = false;
            return "Berabere";
        }

        return null;
    }

    function hücreyeTıklama(index) {
        if (oyunTahtası[index] === "" && oyunDevamEdiyor) {
            oyunTahtası[index] = şuankiOyuncu;
            hücreler[index].textContent = şuankiOyuncu;
            hücreler[index].classList.add("active");

            const kazanan = kazananıKontrolEt();

            if (kazanan === "S") {
                oyuncuDurumu.textContent = `Oyuncu S kazandı!`;
                skorSnin += 1;
            } else if (kazanan === "O") {
                oyuncuDurumu.textContent = `Oyuncu O kazandı!`;
                skorOnun += 1;
            } else if (kazanan === "Berabere") {
                oyuncuDurumu.textContent = "Oyun berabere bitti!";
            } else {
                şuankiOyuncu = şuankiOyuncu === "S" ? "O" : "S";
                oyuncuDurumu.textContent = `Sıra ${şuankiOyuncu}'de`;
            }

            // Skorları güncellemek ve localStorage'a kaydetmek için
            skorSninElement.textContent = skorSnin;
            skorOnunElement.textContent = skorOnun;
            localStorage.setItem('S-skor', skorSnin.toString());
            localStorage.setItem('O-skor', skorOnun.toString());
        }
    }

    function oyunuSıfırla() {
        oyunTahtası = ["", "", "", "", "", "", "", "", ""];
        oyunDevamEdiyor = true;
        şuankiOyuncu = "S";
        oyuncuDurumu.textContent = `Sıra ${şuankiOyuncu}'de`;

        hücreler.forEach((hücre) => {
            hücre.textContent = "";
            hücre.classList.remove("active");
        });
    }

    hücreler.forEach((hücre, index) => {
        hücre.addEventListener("click", function(e){
            hücreyeTıklama(index);
        });
    });

    sıfırlaDüğmesi.addEventListener("click", function(e){
        oyunuSıfırla();
    });

    oyunuSıfırla();

    // Sayfa yüklendiğinde localStorage'daki skorları göstermek
    const localStorageSskoru = localStorage.getItem('S-skor');
    const localStorageOskoru = localStorage.getItem('O-skor');

    if (localStorageSskoru !== null) {
        skorSnin = parseInt(localStorageSskoru);
        skorSninElement.textContent = skorSnin;
    }

    if (localStorageOskoru !== null) {
        skorOnun = parseInt(localStorageOskoru);
        skorOnunElement.textContent = skorOnun;
    }
});