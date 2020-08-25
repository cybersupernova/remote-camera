<template>
  <div>
    <p v-if="!controls">
      <span v-if="state != 'recording'" @click="startRecording">Record</span>
      <span v-if="state == 'recording'" @click="stopRecording(true)">Stop</span>
    </p>
    <p class="name">{{name}}</p>
    <video ref="video" :controls="controls" muted></video>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Preview",
  props: {
    stream: {
      required: true
    },
    name: {
      type: String,
      required: true
    },
    controls: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      recordedChunks: [],
      recorder: null,
      seq: 0,
      timer: null,
      state: null
    };
  },
  computed: {
    ...mapState({ mode: "mode" })
  },
  watch: {
    stream(value) {
      console.log("new stream", value);
      this.$refs.video.srcObject = value;
      this.$refs.video.play();
      // if (!this.recorder || this.recorder.state != "recording")
      //   this.startRecording();
    }
  },
  mounted() {
    this.$refs.video.srcObject = this.stream;
    this.$refs.video.play();
    // if (!this.controls && this.stream) {
    //   this.startRecording();
    // }
  },
  beforeDestroy() {
    this.stopRecording(true);
    clearTimeout(this.timer);
  },
  methods: {
    startRecording() {
      if (this.mode != "create") return;
      this.recordedChunks = [];
      this.seq += 1;
      if (!this.recorder) {
        this.recorder = new MediaRecorder(this.stream, {
          mimeType: "video/webm;codecs=vp9"
        });
        this.recorder.ondataavailable = this.handleDataAvailable;
      }
      this.recorder.start(10000);
      this.state = "recording";
      this.timer = setTimeout(() => {
        this.stopRecording();
      }, 5 * 60 * 1000);
    },
    stopRecording(shouldBreak) {
      this.recorder.stop();
      this.state = "inactive";
      console.log("stopped recording");
      setTimeout(() => {
        this.saveRecording();
        if (!shouldBreak) this.startRecording();
      }, 1000);
    },
    saveRecording() {
      // console.log(this.recordedChunks.length);
      let blob = new Blob(this.recordedChunks, {
        type: "video/webm"
      });
      console.log("blob created from chunks");
      let url = URL.createObjectURL(blob);
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      let date = new Date();
      a.download = `${this.name}_${
        this.seq
      }_${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}.webm`;
      a.click();
      window.URL.revokeObjectURL(url);
      console.log("downloading");
    },
    handleDataAvailable($event) {
      console.log(this.name, this.recorder.state, $event.data.size);
      if ($event.data.size > 1) {
        this.recordedChunks.push($event.data);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
  position: relative;
  flex-direction: row;
  //   width: 100%;
  //   max-height: 300px;
  // flex-grow:
  p {
    position: absolute;
    padding: 5px;
    background: #cecece;
    border-radius: 10px;
    padding: 5px 10px;
    z-index: 10;
    &.name {
      left: 0;
      bottom: 0;
      margin: 0;
    }
    span {
      cursor: pointer;
    }
  }
  //   video {
  //     height: 300px;
  //   }
}
</style>