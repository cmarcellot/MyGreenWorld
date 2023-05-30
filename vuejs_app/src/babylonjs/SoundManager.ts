class SoundManager {
    private soundEnabled: boolean;
  
    constructor() {
      this.soundEnabled = true;
    }
  
    public enableSound(): void {
      this.soundEnabled = true;
    }
  
    public disableSound(): void {
      this.soundEnabled = false;
    }
  
    public playSound(soundUrl: string): void {
      if (!this.soundEnabled) {
        return;
      }
  
      const audio = new Audio(soundUrl);
      audio.play();
    }

  }
  
  export const soundManager = new SoundManager();