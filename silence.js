function silence() {
    
    var som;
    var numFrames = 2000000;
    var numChannels = 1;
    var sampleRate = 96000;
    var bytesPerSample = 4;
    var blockAlign = numChannels * bytesPerSample;
    var byteRate = sampleRate * blockAlign;
    var dataSize = numFrames * blockAlign;

    var buffer = new ArrayBuffer(bytesPerSample * numFrames + 44);
    var dv = new DataView(buffer);

    var p = 0;

  

    function writeString(s) {
        for (var i = 0; i < s.length; i++) {
            dv.setUint8(p + i, s.charCodeAt(i));
        }
        p += s.length;
    }

    function writeUint32(d) {
        dv.setUint32(p, d, true);
        p += 4;
    }

    function writeUint16(d) {
        dv.setUint16(p, d, true);
        p += 2;
    }

    function writeFloat32(d) {
        dv.setFloat32(p, d, true);
        p += 4;
    }
    function writeFloat64(d) {
        dv.setFloat64(p, d, true);
        p += 8;
    }
    function writeFloat16(d) {
        dv.setFloat16(p, d, true);
        p += 4;
    }


    writeString('RIFF');              // ChunkID
    writeUint32(dataSize + 36);       // ChunkSize
    writeString('WAVE');              // Format
    writeString('fmt ');              // Subchunk1ID
    writeUint32(16);                  // Subchunk1Size
    writeUint16(3);                   // AudioFormat
    writeUint16(numChannels);         // NumChannels
    writeUint32(sampleRate);          // SampleRate
    writeUint32(byteRate);            // ByteRate
    writeUint16(blockAlign);          // BlockAlign
    writeUint16(bytesPerSample * 8);  // BitsPerSample
    writeString('data');              // Subchunk2ID
    writeUint32(dataSize);            // Subchunk2Size

    for(i = 0; i < numFrames; i++ ){
        writeFloat32(0.0); //silence
    }

    var blob = new Blob([buffer]);
    saveAs(blob, "silence.wav");
    
    
    return buffer;

}















