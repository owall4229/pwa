    const videoInput = document.getElementById('videoInput');
    const video = document.getElementById('video');
    const startTimeInput = document.getElementById('startTime');
    const endTimeInput = document.getElementById('endTime');
    let recordedChunks = [];
    let mediaRecorder;

    videoInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const videoURL = URL.createObjectURL(file);
        video.src = videoURL;
      }
    });

    function trimVideo() {
      const startTime = parseFloat(startTimeInput.value);
      const endTime = parseFloat(endTimeInput.value);

      if (isNaN(startTime) || isNaN(endTime) || startTime >= endTime || startTime < 0) {
        alert('Please enter valid start and end times.');
        return;
      }

      video.currentTime = startTime;
      video.play();

      const stopPlayback = () => {
        if (video.currentTime >= endTime) {
          video.pause();
          video.currentTime = startTime;
          video.removeEventListener('timeupdate', stopPlayback);
        }
      };

      video.addEventListener('timeupdate', stopPlayback);
    }

    function downloadTrimmedVideo() {
      const stream = video.captureStream();
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'trimmed-video.webm';
        a.click();
      };

      recordedChunks = [];
      mediaRecorder.start();

      const startTime = parseFloat(startTimeInput.value);
      const endTime = parseFloat(endTimeInput.value);

      if (!isNaN(startTime) && !isNaN(endTime) && startTime < endTime) {
        video.currentTime = startTime;
        video.play();

        const stopRecording = () => {
          if (video.currentTime >= endTime) {
            video.pause();
            video.currentTime = startTime;
            video.removeEventListener('timeupdate', stopRecording);
            mediaRecorder.stop();
          }
        };

        video.addEventListener('timeupdate', stopRecording);
      } else {
        alert('Please trim the video first using valid start and end times.');
      }
    }
