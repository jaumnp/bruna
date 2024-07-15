const musics = [
  { name: "Pedrosa", song: "Terça De Tarde", mp3: "./terca.mp3", background: "./bg.jpg", poster: "./Isa.jpg" },
  { name: "Altamira, Pelé MilFlows", song: "Vem Cá", mp3: "./vemca.mp3", background: "./bg.jpg", poster: "./Isa3.jpg" },
  { name: "Muitas pessoas kkk", song: "Poesia Acústica #9: Melhor Forma", mp3: "./poesia.mp3", background: "./bg.jpg", poster: "./Isa2.jpg" }, 
  { name: "Chord Overstreet", song: "Hold On", mp3: "./HoldOn.mp3", background: "./bg.jpg", poster: "./Isa4.jpg" }, 
  { name: "Coldplay", song: "Sparks", mp3: "./Sparks.mp3", background: "./bg.jpg", poster: "./Isa5.jpg" }, 
  { name: "gnash, Olivia O’Brien", song: "I Hate U, I Love U", mp3: "./ihateu.mp3", background: "./bg.jpg", poster: "./Isa6.jpg" }, 
  { name: "Demi Lovato", song: "Cool for the Summer", mp3: "./CoolfortheSummer.mp3", background: "./bg.jpg", poster: "./Isa7.jpg" }
];

let curId = 0;
let contagem = 0;
let audio = new Audio(); // Create an audio element

function Player() {
  this.id = '';
  this.repeat = false;
  this.randomize = false;

  this.Init = function(id) {
    this.id = id;
    audio.src = musics[curId].mp3; // Set initial audio source
    this.updatePlayerInfo(); // Call updatePlayerInfo initially
  };

  this.setMusic = function(i) {
    this.updatePlayerInfo(i); // Update UI and audio source
    curId = i;
  };

  this.updatePlayerInfo = function(i = curId) { // Optional default argument for flexibility
    document.querySelector('.player-info-name').textContent = musics[i].name;
    document.querySelector('.player-info-song').textContent = musics[i].song;
    document.querySelector('.player-inner-poster img').src = musics[i].poster;
    document.querySelector('.player-inner-blur img').src = musics[i].background;
    audio.src = musics[i].mp3;
  };

  this.Play = function() {
    const playButton = document.querySelector('.player-btns ul > li > span.play');
    const pauseButton = document.querySelector('.pauze svg');
    if (playButton.style.display !== 'none') {
      audio.play();
      playButton.style.display = 'none';
      pauseButton.style.display = 'block';
      document.querySelector('.player-inner-poster').classList.toggle('rotate');
    } else {
      audio.pause();
      playButton.style.display = 'block';
      pauseButton.style.display = 'none';
      document.querySelector('.player-inner-poster').classList.remove('rotate');
    }
  };

  this.Next = function() {
    curId++;
    if (this.randomize) curId = Math.floor(Math.random() * musics.length);
    if (curId > musics.length - 1) curId = 0;
    this.setMusic(curId);
    this.Play();
  };

  this.Prev = function() {
    curId--;
    if (this.randomize) curId = Math.floor(Math.random() * musics.length);
    if (curId < 0) curId = musics.length - 1;
    this.setMusic(curId);
    this.Play();
  };

  // Implement logic to handle repeat based on audio events (ended)
  audio.addEventListener('ended', () => {
    document.querySelector('.player-inner-poster').classList.remove('rotate');
    if (this.repeat) {
      this.Play();
    } else {
      // Optional: Show "Song finished" message or handle other actions
    }
  });

  // Implement logic to handle randomization on button clicks (if needed)
  // You can add event listeners for "randomize" buttons here
}

const player = new Player();

document.addEventListener('DOMContentLoaded', function() {
  player.Init('#player');

  const playButtons = document.querySelectorAll('.player-btns ul .pbtn');
  playButtons.forEach(button => button.addEventListener('click', player.Play));

  // Add event listeners for next/prev buttons (if needed)
  // You can add event listeners for "next" and "prev" buttons here
});

function removePlayerBlock() {
  const playerBlock = document.querySelector('.player-block');
  if (playerBlock) {
    playerBlock.remove();
  }
}

document.getElementById("counterimg").style.opacity = "0";
