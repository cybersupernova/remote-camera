<template>
  <div>
    <p>{{name}}</p>
    <video ref="video" controls muted height="300"></video>
  </div>
</template>

<script>
export default {
  name: "Preview",
  props: {
    stream: {
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.$refs.video.srcObject = this.stream;
    this.$refs.video.play();
  }
};
</script>