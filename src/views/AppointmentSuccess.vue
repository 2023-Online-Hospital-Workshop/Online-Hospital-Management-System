<template>
    <div id="mainPage" class="parent-box">
      <div>
        <va-card color="primary" gradient class="parent-box">
            <div class="text">
                预约 {{ doctorName }} 成功！
            </div>
        </va-card>
      </div>       
    </div>
  </template>

<script>
    export default {
        props: ['doctorName'],
        data() {
            return {
            };
        }
    }
</script>

<style scoped>
.parent-box {
  width:100%;
  height:200px;
}
.text{
  font-weight: bold;
  font-size: larger;
}
</style>