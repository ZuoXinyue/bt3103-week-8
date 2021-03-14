<template>
    <div>
        <button v-on:click="increment">+</button>
        <span> {{counter}} </span>
        <button v-on:click="decrement">-</button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            counter: 0,
        }
    },
    methods: {
        increment: function () {
            if (this.counter < 10) {
                this.counter++;
            }
            else {
                alert("You cannot buy more than 10 items.")
            }
            this.$emit('counter', this.item, this.counter)
        },
        decrement: function () {
            if (this.counter > 0) {
                this.counter--;
            }
            this.$emit('counter', this.item, this.counter)
        }
    },
    props: ['item']
}
</script>

<style scoped>
button {
    font-size: 30px;
    width: 50px;
    height: 50px;
    background-color: coral;
}
span {
    font-size: 30px;
}
</style>