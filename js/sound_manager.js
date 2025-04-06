function SoundManager() {
  this.sounds = {};
  this.muted = false;
  
  // 事前に音声をロード
  this.loadSounds();
}

// 各数値に対応する音声をロード
SoundManager.prototype.loadSounds = function() {
  // タイルの値ごとに異なる音声をマッピング
  const tileValues = [4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
  
  // 音声ファイルをプリロード
  // 注: 実際の音声ファイルは用意する必要があります
  tileValues.forEach(value => {
    const audio = new Audio(`sounds/merge_${value}.mp3`);
    audio.preload = 'auto';
    this.sounds[value] = audio;
  });
  
  // 特殊な音（ゲーム開始、ゲームオーバーなど）もロードできます
  // this.sounds['game_over'] = new Audio('sounds/game_over.mp3');
};

// タイル値に応じた音声を再生
SoundManager.prototype.playMergeSound = function(value) {
  if (this.muted) return;
  
  // 該当する音声が存在する場合、再生
  if (this.sounds[value]) {
    // 現在再生中の場合は一度停止してから再生（連続して同じ音を鳴らすため）
    this.sounds[value].pause();
    this.sounds[value].currentTime = 0;
    this.sounds[value].play().catch(e => console.log("音声再生エラー:", e));
  }
};

// 音声のオン/オフを切り替え
SoundManager.prototype.toggleMute = function() {
  this.muted = !this.muted;
  return this.muted;
};
