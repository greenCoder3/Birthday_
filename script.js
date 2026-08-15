// Surprise Website — main interactions

document.addEventListener("DOMContentLoaded", () => {
  const c = window.SITE_CONFIG;

  document.title = `${c.occasion} — ${c.personName}`;

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  setText("occasionLabel", c.occasion);
  setText("personName", c.personName);
  setText("heroTitle", c.heroTitle);
  setText("heroText", c.heroText);
  setText("letterTitle", c.letterTitle);
  setText("letterText", c.letterText);
  setText("finalMessage", c.finalMessage);

  const reasons = document.getElementById("reasons");
  c.reasons.forEach((reason, i) => {
    const card = document.createElement("div");
    card.className = "reason-card reveal";
    card.innerHTML = `<span class="reason-number">0${i + 1}</span><p>${reason}</p>`;
    reasons.appendChild(card);
  });

  const memories = document.getElementById("memories");
  c.memories.forEach((memory) => {
    const card = document.createElement("article");
    card.className = "memory-card reveal";
    card.innerHTML = `
      <div class="memory-image">
        <img src="${memory.image}" alt="${memory.title}">
      </div>
      <div class="memory-content">
        <h3>${memory.title}</h3>
        <p>${memory.text}</p>
      </div>`;
    memories.appendChild(card);
  });

  // Music
  const audio = document.getElementById("music");
  const musicButton = document.getElementById("musicButton");
  audio.src = c.music;

  musicButton.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().then(() => {
        musicButton.textContent = "⏸ Pause Music";
      }).catch(() => {
        alert("Add your music file at assets/music.mp3 first.");
      });
    } else {
      audio.pause();
      musicButton.textContent = "▶ Play Music";
    }
  });

  // Start experience
  const startButton = document.getElementById("startButton");
  const intro = document.getElementById("intro");
  startButton.addEventListener("click", () => {
    intro.classList.add("hide");
    document.body.classList.add("started");
    launchConfetti(70);
    setTimeout(() => document.getElementById("home").scrollIntoView({behavior: "smooth"}), 250);
  });

  // Letter
  const letter = document.getElementById("letter");
  document.getElementById("openLetter").addEventListener("click", () => {
    letter.classList.toggle("open");
    if (letter.classList.contains("open")) launchConfetti(30);
  });

  // Gift
  document.getElementById("gift").addEventListener("click", () => {
    document.getElementById("gift").classList.add("opened");
    launchConfetti(110);
    document.getElementById("final").scrollIntoView({behavior: "smooth"});
  });

  // Countdown
  const countdown = document.getElementById("countdown");
  if (c.specialDate) {
    const target = new Date(c.specialDate).getTime();
    const timer = setInterval(() => {
      const diff = target - Date.now();
      if (diff <= 0) {
        countdown.textContent = "Today is the special day! 🎉";
        clearInterval(timer);
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      const s = Math.floor((diff / 1000) % 60);
      countdown.textContent = `${d}d ${h}h ${m}m ${s}s`;
    }, 1000);
  } else {
    countdown.textContent = "A day worth celebrating ❤️";
  }

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, {threshold: 0.12});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Floating hearts
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = ["❤","♡","✦","♥"][Math.floor(Math.random()*4)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (4 + Math.random() * 5) + "s";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 9000);
  }, 900);

  function launchConfetti(count) {
    for (let i = 0; i < count; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.animationDelay = Math.random() * 0.4 + "s";
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 4200);
    }
  }
});
