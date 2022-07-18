import fs from "fs";

import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { google } from "@google-cloud/text-to-speech/build/protos/protos";

const client = new TextToSpeechClient();

const text = "This is sample speech.";

const request: google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
  input: { text: text },
  voice: {
    languageCode: "en-US",
    ssmlGender: "NEUTRAL",
    name: "en-US-Standard-J",
  },
  audioConfig: {
    audioEncoding: "MP3",
    effectsProfileId: ["headphone-class-device"],
  },
};

client
  .synthesizeSpeech(request)
  .then(([response]) => {
    if (response.audioContent) {
      fs.writeFileSync("output.mp3", response.audioContent);
    }
  })
  .catch((error) => {
    console.error(error);
  });
