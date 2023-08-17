<template class="appointment-success">
    <div id="mainPage" class="parent-box">
        <p>
            预约 {{ doctorName }} 成功！
        </p>
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