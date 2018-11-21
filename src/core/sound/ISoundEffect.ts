interface ISoundEffect {
    play(effectName: string, loops: number): void;
    stop(effectName: string): void;
    setVolume(volume: number): void;
}