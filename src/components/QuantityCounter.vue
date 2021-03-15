<template>
    <div>
        <button v-on:click='decrement()'> - </button>
        <label for='counter'>  {{counter}}  </label>
        <button v-on:click='increment()'> + </button>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                counter : 0
            }
        },
        props: ['item'],
        methods: {
            increment:function() {
                if (this.counter >= 10) {
                    alert("You cannot buy more than 10 items.")
                } else {
                    this.counter++
                }
                this.$emit('counter', this.item, this.counter)
            },
            decrement:function() {
                if (this.counter > 0) {
                    this.counter--
                }
                this.$emit('counter', this.item, this.counter)
            }
        }
    }
</script>

<style scoped>
* {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
}
button {
    background-color: #80ffd4;
    border-radius: 4px;
    border: none;
    height: 50px;
    width: 50px;
    text-align:center;
    margin: 5px;
}
</style>