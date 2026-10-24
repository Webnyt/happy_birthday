const giftBox = document.getElementById("gift-box");
const startScreen = document.getElementById("start-screen");
const mainScreen = document.getElementById("main-screen");
const music = document.getElementById("bg-music");
const playBtn = document.getElementById("play-audio-btn");
const confettiBtn = document.getElementById("confetti-btn");
const candle = document.getElementById("candle");
const typeEl = document.getElementById("typewriter");

// Message for Mercy - edit this to your heart
const message = `My dearest Mercy,

On your special day, I just want to remind you how amazing, beautiful, and precious you are.

May your smile never fade, may your heart stay as kind as it is, and may this year bring you more love than you can hold.

You deserve the world and more. Happy Birthday, Queen! 👑💖`;

let isPlaying = false;

// Open gift
giftBox.addEventListener("click", () => {
  giftBox.classList.add("open");
  gsap.to(startScreen, { opacity:0, y:-50, duration:0.8, onComplete: () => {
    startScreen.style.display="none";
    mainScreen.classList.remove("hidden");
    gsap.fromTo(mainScreen, {opacity:0, y:50}, {opacity:1, y:0, duration:1, ease:"back.out(1.7)"});
    startCelebration();
  }});
});

function startCelebration() {
  typeWriter(message);
  launchConfetti();
  playMusic();
}

function playMusic() {
  if(!isPlaying){
    music.volume = 0.7;
    music.play().then(()=> {
      isPlaying = true;
      playBtn.textContent = "🎵 Playing for you...";
    }).catch(()=> {
      playBtn.textContent = "🎵 Tap to Play Song (allow audio)";
    });
  }
}

playBtn.addEventListener("click", playMusic);
confettiBtn.addEventListener("click", launchConfetti);

candle.addEventListener("click", () => {
  candle.classList.toggle("off");
  if(candle.classList.contains("off")){
    launchConfetti();
    typeEl.innerHTML += "<br><br>✨ You blew the candle! Make a wish, Mercy!";
  }
});

// Typewriter effect
function typeWriter(text, i=0) {
  if(i < text.length){
    typeEl.textContent += text.charAt(i);
    setTimeout(()=> typeWriter(text, i+1), 35);
  }
}

// Confetti canvas
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
function resize(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight }
resize(); window.addEventListener("resize", resize);
let pieces = [];
function launchConfetti(){
  for(let i=0;i<150;i++){
    pieces.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height - canvas.height,
      r: Math.random()*8+4,
      c: `hsl(${Math.random()*360}, 100%, 70%)`,
      v: Math.random()*3+2,
      s: Math.random()*2-1
    });
  }
}
(function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  pieces.forEach((p, idx)=>{
    ctx.fillStyle=p.c;
    ctx.fillRect(p.x, p.y, p.r, p.r);
    p.y+=p.v; p.x+=p.s;
    if(p.y>canvas.height) pieces.splice(idx,1);
  });
  requestAnimationFrame(animate);
})();