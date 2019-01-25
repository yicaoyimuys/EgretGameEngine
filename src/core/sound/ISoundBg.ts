interface ISoundBg {
    play(bgName: string): void;
    stop(): void;
    setVolume(volume: number): void;
    pause();
    resume();
}