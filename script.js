const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const durationInput = document.getElementById("duration");
const alarmSound = document.getElementById("alarm-sound");
const sessionEndText = document.getElementById("session-end");
const greetingText = document.getElementById("greeting-text");
const nameInput = document.getElementById("name-input");
const languageToggle = document.getElementById("language-toggle");
const themeToggle = document.getElementById("theme-toggle");
const datetimeDisplay = document.getElementById("datetime");
const historyList = document.getElementById("history-list");
const historyTitle = document.getElementById("history-title");

let timer;
let remainingSeconds = durationInput.value * 60;
let language = languageToggle.value;

function updateTimerDisplay() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (remainingSeconds > 0) {
      remainingSeconds--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      alarmSound.play();
      sessionEndText.classList.remove("hidden");
      sessionEndText.textContent = language === "id" ? "⏰ Sesi sudah habis!" : "⏰ Session ended!";
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const duration = durationInput.value;
      const historyItem = document.createElement("li");
      historyItem.textContent = language === "id"
        ? `Selesai pada ${timeStr} - ${duration} menit`
        : `Finished at ${timeStr} - ${duration} minutes`;
      historyList.appendChild(historyItem);
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  remainingSeconds = durationInput.value * 60;
  updateTimerDisplay();
  sessionEndText.classList.add("hidden");
}

function updateGreeting() {
  const name = nameInput.value.trim();
  greetingText.textContent = name ? `${language === "id" ? "Halo" : "Hello"}, ${name}!` : "";
}

function updateDateTime() {
  const now = new Date();
  datetimeDisplay.textContent = now.toLocaleString(language === "id" ? "id-ID" : "en-GB");
}
setInterval(updateDateTime, 1000);

startBtn.addEventListener("click", () => {
  remainingSeconds = durationInput.value * 60;
  updateTimerDisplay();
  startTimer();
});

pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
nameInput.addEventListener("input", updateGreeting);

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

languageToggle.addEventListener("change", () => {
  language = languageToggle.value;
  document.getElementById("label-duration").textContent = language === "id" ? "Durasi (menit):" : "Duration (minutes):";
  startBtn.textContent = language === "id" ? "Mulai" : "Start";
  pauseBtn.textContent = language === "id" ? "Jeda" : "Pause";
  resetBtn.textContent = language === "id" ? "Ulang" : "Reset";
  document.getElementById("label-music").textContent = language === "id" ? "🎵 Musik:" : "🎵 Music:";
  document.getElementById("music-none").textContent = language === "id" ? "Tanpa Musik" : "No Music";
  document.getElementById("todo-title").textContent = "To-Do List";
  document.getElementById("th-task").textContent = language === "id" ? "Aktivitas" : "Task";
  document.getElementById("th-check").textContent = language === "id" ? "Cek" : "Check";
  document.getElementById("th-delete").textContent = language === "id" ? "Hapus" : "Delete";
  document.getElementById("add-todo").textContent = language === "id" ? "Tambah" : "Add";
  document.getElementById("todo-input").placeholder = language === "id" ? "Tambahkan aktivitas" : "Add a task";
  document.getElementById("notes-title").textContent = language === "id" ? "Catatan" : "Notes";
  document.getElementById("notes").placeholder = language === "id" ? "Tulis catatan kamu di sini..." : "Write your notes here...";
  document.getElementById("name-input").placeholder = language === "id" ? "Masukkan nama kamu" : "Enter your name";
  historyTitle.textContent = language === "id" ? "Riwayat Sesi" : "Session History";
  updateGreeting();
  updateDateTime();
});

updateTimerDisplay();
updateGreeting();
updateDateTime();

const musicSelect = document.getElementById("music-select");
const musicPlayer = document.getElementById("music-player");
const addTodoBtn = document.getElementById("add-todo");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

function playMusic() {
  const selected = musicSelect.value;
  if (selected !== "none") {
    musicPlayer.src = selected;
    musicPlayer.play();
  } else {
    musicPlayer.pause();
    musicPlayer.currentTime = 0;
  }
}

function stopMusic() {
  musicPlayer.pause();
  musicPlayer.currentTime = 0;
}

startBtn.addEventListener("click", () => {
  remainingSeconds = durationInput.value * 60;
  updateTimerDisplay();
  startTimer();
  playMusic(); // Mulai musik saat mulai timer
});

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (remainingSeconds > 0) {
      remainingSeconds--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      alarmSound.play();
      stopMusic(); 
      sessionEndText.classList.remove("hidden");
      sessionEndText.textContent = language === "id" ? "⏰ Sesi sudah habis!" : "⏰ Session ended!";
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const duration = durationInput.value;
      const historyItem = document.createElement("li");
      historyItem.textContent = language === "id"
        ? `Selesai pada ${timeStr} - ${duration} menit`
        : `Finished at ${timeStr} - ${duration} minutes`;
      historyList.appendChild(historyItem);
    }
  }, 1000);
}

function addTodo() {
  const task = todoInput.value.trim();
  if (!task) return;

  const tr = document.createElement("tr");
  const tdTask = document.createElement("td");
  tdTask.textContent = task;

  const tdCheck = document.createElement("td");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  tdCheck.appendChild(checkbox);

  const tdDelete = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.onclick = () => tr.remove();
  tdDelete.appendChild(deleteBtn);

  tr.appendChild(tdTask);
  tr.appendChild(tdCheck);
  tr.appendChild(tdDelete);
  todoList.appendChild(tr);

  todoInput.value = "";
}

addTodoBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});