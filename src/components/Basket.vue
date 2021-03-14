<template>
    <div>
        <p>Menu:</p>
        <ul>
            <li v-for="item in itemsSelected" :key=item.id>
                <p>{{item[0]+" x "+item[1]}}</p>
            </li>
        </ul>
        <button v-on:click="findTotal(); sendOrder()">Calculate Total</button>
        <p v-show="clicked">Subtotal: ${{this.subTot}}</p>
        <p v-show="clicked">Grand Total: ${{this.grandTot}}</p>
    </div>
</template>

<script>
import database from "../firebase.js"

export default {
    data() {
        return {
            clicked: false,
            subTot: 0,
            grandTot: 0
        }
    },
    props: ['itemsSelected'],
    methods: {
        findTotal: function() {
            this.clicked = true;
            this.subTot = 0;
            for (let i = 0; i < this.itemsSelected.length; i++) {
                this.subTot += this.itemsSelected[i][1]*this.itemsSelected[i][2];
            }
        },
        sendOrder: function() {
            let items = {}
            items['Prawn omelette'] = 0
            items['Dry Beef Hor Fun'] = 0
            items['Sambal KangKung'] = 0
            items['Pork Fried Rice'] = 0
            items['Mapo Tofu'] = 0
            items['Cereal Prawn'] = 0
            for (let index = 0; index < this.itemsSelected.length; index++) {
                const element = this.itemsSelected[index];
                items[element[0]] = element[1]
            }
            database.collection('orders').add(items).then(() => {location.reload()})
        }
    },
    watch: {
        subTot: function() {
            this.grandTot = this.subTot*1.07;
            this.grandTot = this.grandTot.toFixed(2);
        }
    }
}
</script>

<style scoped>
button {
    font-size: 30px;
    background-color: coral;
}
</style>