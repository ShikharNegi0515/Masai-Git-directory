class MediaFile {
    play() {
        throw new Error("Method 'play()' must be implemented");
    }
}

class AudioFile extends MediaFile {
    play() {
        console.log("Playing audio file...");
    }
}

class VideoFile extends MediaFile {
    play() {
        console.log("Playing video file...");
    }
}

class PDFFile extends MediaFile {
    play() {
        console.log("Displaying PDF document...");
    }
}

class MediaPlayer {
    constructor(mediaFile) {
        this.mediaFile = mediaFile;
    }

    playMedia() {
        this.mediaFile.play();
    }
}

const player1 = new MediaPlayer(new AudioFile());
player1.playMedia();

const player2 = new MediaPlayer(new VideoFile());
player2.playMedia();

const player3 = new MediaPlayer(new PDFFile());
player3.playMedia();
