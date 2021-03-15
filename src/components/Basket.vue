<template>
    <div>
        <br><br><br><br>
        <p>Menu:</p>
        <ul>
            <li v-for='item in selectedItems' v-bind:key='item.name'>
                <p>{{item[0]}} x {{item[1]}}</p>
            </li>
        </ul>
        <button v-on:click.once='show = !show; findTotal(); sendOrder()'>Add Order</button>
        <p id='subtotal' v-if='show'>Subtotal: ${{subtotal}}</p>
        <p id='grandtotal' v-if='show'>Grand Total: ${{grandTotal}}</p>
    </div>
</template>

<script>
import database from '../firebase.js'
    export default {
        props: {
            selectedItems: {
                type: Array
            }
        },
        data () {
            return {
                subtotal: 0,
                show: false, 
                order: []
            }
        }, 
        methods : {
            findTotal: function() {
                for (var i = 0; i < this.selectedItems.length; i++) {
                    var curr = this.selectedItems[i];
                    this.subtotal += curr[1] * curr[2];
                }
            },
            sendOrder: function() {
                for (var i = 0; i < this.selectedItems.length; i++) {
                    let item = {};
                    var curr = this.selectedItems[i];
                    item.name = curr[0];
                    item.quantity = curr[1];
                    this.order.push(item);
                }
                database.collection('orders').add({
                    order: this.order,
                }).then(() => location.reload())
            }
        },
        computed : {
            grandTotal: function() {
                return (this.subtotal * 1.07).toFixed(2);
            }
        }
    }
</script>

<style>
button {
    background-color: #80ffd4;
    border-radius: 4px;
    border: 1px solid #000000;
    text-align:center;
    margin: 5px;
    font-size: 15px;
    padding: 5px;
}
</style>