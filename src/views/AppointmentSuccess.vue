<template class="appointment-success">
    <div class="flex flex-col flex-wrap gap-5">
        <va-card>
            <va-card-block
                class="flex-nowrap"
                horizontal
            >
                <div class="flex-auto">
                <va-card-title>Title</va-card-title>
                <va-card-content>
                    {{ lorem }}
                </va-card-content>
                </div>
                <va-image
                class="flex-grow-0 flex-shrink-0 basis-52"
                src="https://picsum.photos/200"
                />
            </va-card-block>
        </va-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                lorem: "test text",
            };
        }
    }
</script>