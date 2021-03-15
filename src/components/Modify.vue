<template>
    <div>
        <ul>
            <li v-for='(item, index) in datapacket' v-bind:key='index'>
                <p>{{item.name}}: {{item.quantity}}</p>
                <input id='index' type='number' placeholder=0 min='0' v-model='input[index]'>
            </li>
        </ul>
        <button v-on:click='updateOrder()'>Update Order</button>
    </div>
</template>

<script>
import database from '../firebase.js'
    export default {
        data () {
            return {
                datapacket: [],
                input: []
            }
        },
        methods: {
            fetchItems: function() {
                database.collection('orders').doc(this.$route.params.id).get().then((item) => {
                    this.datapacket = (item.data().order)
                })
            },
            updateOrder: function() {
                var copyOrder = this.datapacket;
                for (let i = 0; i < this.input.length; i++) {
                    if (this.input[i] != null) {
                        copyOrder[i].quantity = this.input[i];
                    }
                }
                this.datapacket = copyOrder;
                
                database.collection('orders').doc(this.$route.params.id).update({
                    order: this.datapacket
                }).then(() => this.$router.push({ path: '/orders'}))
            }
        },
        created() {
            this.fetchItems();
        }
    }
</script>

<style scoped>
ul {
    list-style-type: none;
    padding: 10px;
}

button {
  width: 130px;
  height: 30px;
  background-color: #80ffd4;
  border-radius: 10px;
  border-width: 1px;
  margin: 10px;
}
</style>