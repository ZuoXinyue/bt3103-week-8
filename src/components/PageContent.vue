<template>
    <div>
        <ul>
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/orders" exact>Orders</router-link></li>
            <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
        </ul>
        <ul>
            <li v-for="item in items" :key="item.id">
                <p id="itemName">
                    {{ item.name }}
                </p>
                <img v-bind:src = "item.imageURL">
                <p id="price">
                    ${{ item.price }}
                </p>
                <QuantityCounter v-bind:item="item" v-on:counter="onCounter"></QuantityCounter>
            </li>
        </ul>
        <Basket id="shoppingBasket" v-bind:itemsSelected="itemsSelected"></Basket>
    </div>
</template>

<script>
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import database from "../firebase.js"

export default {
    data() {
        return {
            itemsSelected: [],
            items: []
        }
    },
    components: {
        QuantityCounter,
        Basket
    },
    methods: {
        onCounter: function (item, count) {
            if (this.itemsSelected.length === 0 && count > 0) {
                //If there is nothing in items selected, push the ORDER in
                this.itemsSelected.push([item.name, count, item.price]);
            } else {
                var flag = false
                // Loop through everything to check what is not in the basket
                for (let i = 0; i < this.itemsSelected.length; i++) {
                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0];
                    if (item_name == item.name && count>0) {
                        var part1 = this.itemsSelected.slice(0,i);
                        part1.push([item.name, count, item.price]);
                        var part2 = this.itemsSelected.slice(i+1);
                        this.itemsSelected = part1.concat(part2);
                        flag = true;
                    }
                    else if (item_name == item.name && count == 0) {
                        this.itemsSelected.splice(i, 1)
                        flag = true
                    }
                    // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                    // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                    // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
                }
                if (flag == false && count>0) {
                    this.itemsSelected.push([item.name, count, item.price]);
                }
                //problem with the code: if A increase from 1 to 3, no auto update [only when another element's value changes, the value will update then]
                //display of the content, prevent li from taking on places on the right hand side
            }
        },
        fetchItems: function() {
            database.collection('menu').get().then((querySnapShot)=>{
                let item={}
                querySnapShot.forEach(doc=>{
                    item=doc.data()
                    item.show=false
                    item.id=doc.id
                    this.items.push(item) 
                })      
            })
        }
    },
    created() {
        this.fetchItems();
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
  width: 70%;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
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
  font-size: 30px;
  top: 15%;
  left: 78%;
}
</style>