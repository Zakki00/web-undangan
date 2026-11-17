(() => {
  const cover = document.querySelector("#cover");
  const page = document.querySelector("#invitation");
  const openButton = document.querySelector("#open-invitation");
  const nextButton = document.querySelector("#next-page");
  const backButton = document.querySelector("#back-page");
  const params = new URLSearchParams(window.location.search);
  const guest = params.get("to");
  if (guest && guest.trim())
    document.querySelector("#guest-name").textContent = guest
      .trim()
      .slice(0, 100);

  const music = document.querySelector("#background-music");
  const musicToggle = document.querySelector("#music-toggle");
  const musicLabel = document.querySelector("#music-label");
  music.volume = 0.45;

  function updateMusicControl(isPlaying) {
    musicToggle.setAttribute("aria-pressed", String(isPlaying));
    musicToggle.setAttribute(
      "aria-label",
      isPlaying ? "Matikan musik" : "Putar musik",
    );
    musicToggle.title = isPlaying ? "Matikan musik" : "Putar musik";
    musicLabel.textContent = isPlaying ? "Musik aktif" : "Musik mati";
  }

  async function playMusic() {
    try {
      await music.play();
      updateMusicControl(true);
    } catch {
      updateMusicControl(false);
      musicLabel.textContent = "Musik tidak tersedia";
    }
  }

  openButton.addEventListener("click", () => {
    cover.classList.add("is-opening", "is-open");
    document.body.classList.remove("is-locked");
    playMusic();
  });

  backButton.addEventListener("click", () => {
    cover.classList.remove("is-finished");
    cover.classList.add("is-returning");
    page.classList.remove("is-visible");
    page.setAttribute("inert", "");
    page.setAttribute("aria-hidden", "true");
    document.body.classList.add("is-locked");

    window.setTimeout(() => {
      cover.classList.remove("is-returning", "is-closing", "is-open");
      cover.classList.add("is-opening");
      openButton.focus({ preventScroll: true });
      window.setTimeout(() => cover.classList.remove("is-opening"), 50);
    }, 1050);
  });

  nextButton.addEventListener("click", () => {
    cover.classList.add("is-closing");
    page.removeAttribute("inert");
    page.setAttribute("aria-hidden", "false");

    window.setTimeout(() => {
      page.classList.add("is-visible");
      cover.classList.add("is-finished");
      window.setTimeout(() => {
        cover.classList.remove("is-closing");
        musicToggle.focus({ preventScroll: true });
      }, 480);
    }, 1100);
  });

  musicToggle.addEventListener("click", async () => {
    if (music.paused) {
      await playMusic();
      return;
    }
    music.pause();
    updateMusicControl(false);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      music.pause();
      updateMusicControl(false);
    }
  });
  music.addEventListener("ended", () => updateMusicControl(false));

  const eventDate = new Date("2026-12-20T08:00:00+07:00").getTime();
  const countdown = document.querySelector("#countdown");
  const countdownUnits = [
    { element: document.querySelector("#days"), duration: 86400000 },
    { element: document.querySelector("#hours"), duration: 3600000, limit: 24 },
    { element: document.querySelector("#minutes"), duration: 60000, limit: 60 },
    { element: document.querySelector("#seconds"), duration: 1000, limit: 60 },
  ];
  function updateCountdown() {
    const remaining = eventDate - Date.now();
    if (remaining <= 0) {
      countdown.setAttribute("aria-label", "Hari pernikahan telah tiba");
      countdownUnits.forEach(({ element }) => (element.textContent = "00"));
      return;
    }
    countdownUnits.forEach(({ element, duration, limit = Infinity }) => {
      const value = Math.floor(remaining / duration) % limit;
      element.textContent = String(value).padStart(2, "0");
    });
  }
  updateCountdown();
  const countdownTimer = window.setInterval(updateCountdown, 1000);
  window.addEventListener(
    "pagehide",
    () => window.clearInterval(countdownTimer),
    {
      once: true,
    },
  );

  const copyStatus = document.querySelector("#copy-status");
  document.querySelectorAll(".copy-button").forEach((button) =>
    button.addEventListener("click", async () => {
      const value = button.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        copyStatus.textContent = `Nomor ${value} berhasil disalin.`;
      } catch {
        const input = document.createElement("textarea");
        input.value = value;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.append(input);
        input.select();
        const copied = document.execCommand("copy");
        input.remove();
        copyStatus.textContent = copied
          ? `Nomor ${value} berhasil disalin.`
          : "Nomor tidak dapat disalin. Silakan catat secara manual.";
      }
      button.textContent = "Tersalin";
      window.setTimeout(() => {
        button.textContent = "Salin nomor";
      }, 2200);
    }),
  );
})();
