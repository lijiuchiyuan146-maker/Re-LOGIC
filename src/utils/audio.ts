
const SOUNDS = {
  TITLE_TAP: 'https://cdn.pixabay.com/audio/2021/08/04/audio_bbd1314306.mp3',
  BUTTON_TAP: 'https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8a73456.mp3',
  MODE_TAP: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c35278d327.mp3',
  HOME_BGM: 'https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3',
};

class AudioManager {
  private bgm: HTMLAudioElement | null = null;
  private isMuted: boolean = false;

  playSFX(type: keyof typeof SOUNDS) {
    if (this.isMuted) return;
    const audio = new Audio(SOUNDS[type]);
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Audio play failed:', e));
  }

  startBGM() {
    if (this.bgm) return;
    this.bgm = new Audio(SOUNDS.HOME_BGM);
    this.bgm.loop = true;
    this.bgm.volume = 0.3;
    this.bgm.play().catch(e => {
      console.log('BGM play failed (interaction required):', e);
      // If failed, we'll try again on next interaction
      this.bgm = null;
    });
  }

  stopBGM() {
    if (this.bgm) {
      this.bgm.pause();
      this.bgm = null;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgm) {
      this.bgm.muted = this.isMuted;
    }
  }
}

export const audioManager = new AudioManager();
