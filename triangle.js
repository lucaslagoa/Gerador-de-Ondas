function triangle(){
    
	var frequencia=440;
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

    vector = Array();

 	var i,z=1.0,x=4.0/frequencia,a = 0.000000;
    vector[0] = 0;
    for ( i = 0 ; i < frequencia/4; i++){
        vector[i+1]=vector[i]+x;
    }
    for (i = frequencia/4; i < 3*frequencia/4;i++){
        vector[i+1]= vector[i]-x;
    }
    for(i = 3*frequencia/4;i < frequencia; i++){
        vector[i+1] = vector[i]+x;
    }
    z=0;
    
    for (i=0; i < numFrames; i++){
    	a = vector[z];
    	z++;
    	if (z==frequencia){
			z=0;
		}

    	writeFloat32(a);
    }

    var blob = new Blob([buffer]);
    saveAs(blob, "triangle.wav");

    return buffer;

}
