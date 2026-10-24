const music = document.getElementById("bg-music");
const btn = document.getElementById("play-audio-btn");

btn.addEventListener("click", () => {
  music.volume = 0.8;
  music.play();
  btn.style.display = "none";
});