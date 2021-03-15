<template>
    <div>
        <div id='content'>
            <nav>
                <ul>
                <li><router-link to="/" exact>Home</router-link></li>
                <li><router-link to="/orders" exact>Orders</router-link></li>
                <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
                </ul>
            </nav>
            <div id='menu'>
                <ul>
                    <li v-for='item in items' v-bind:key='item.name'>
                        <h2>{{item.name}}</h2>
                        <img v-bind:src='item.imageURL'>
                        <p>${{item.price}}</p>
                        <qtyCounter v-bind:item='item' v-on:counter="onCounter" ></qtyCounter>
                    </li>
                </ul>
            </div>
        </div>
        <div id='basket'>
            <basket v-bind:selectedItems = 'itemsSelected'></basket>
        </div>
    </div>
</template>

<script>
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import database from '../firebase.js'

    export default {
        components: {
            'qtyCounter': QuantityCounter,
            'basket': Basket
        },
        data () {
            return {
                itemsSelected : [],
                items : []
            }
        },
        methods: {
            onCounter: function (item, count) {
                if (this.itemsSelected.length === 0 && count > 0) {
                    this.itemsSelected.push([item.name, count, item.price]);
                } else {

                    for (let i = 0; i < this.itemsSelected.length; i++) {   
                        const curr_item = this.itemsSelected[i];
                        const item_name = curr_item[0];

                        if (item_name == item.name && count >= 0) {
                            this.itemsSelected.splice(i, 1);
                            this.itemsSelected.push([item.name, count, item.price]);

                        } else if (i == this.itemsSelected.length - 1) {
                            this.itemsSelected.push([item.name, count, item.price]);
                        }
                    }
                }
            },
            fetchItems: function() {
                database.collection('menu').get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.items.push(doc.data())
                        this.itemsSelected.push([doc.data().name, 0, doc.data().price])
                    })
                })
            },
        },
        created() {
            this.fetchItems()
        }
    }
</script>

<style scoped>
#itemsList {
    width: 100%;
    max-width: 70%;
    margin: 0px;
    padding: 0 5px;
    box-sizing: border-box;
}
ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}
li {
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 5px;
    border: 1px solid #222;
    margin: 10px;      
}
img {
    width: 135px;
    height: 135px;
}
#price {
    font-size: 30px;
}
#itemName {
    font-size: 30px;
}
#shoppingBasket {
    position: absolute;
    top: 23%;
    left: 78%;
}
* {
    font-family: Arial, Helvetica, sans-serif;
}
#basket {
    float: left;
    width: 20%;
    font-size: 20px;
}
p {
    font-size: 25px;
}
#content {
    float: left;
    width: 80%;
}
</style>