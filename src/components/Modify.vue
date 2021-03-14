<template>
    <div>
        <div v-for="(key,value) in datapacket" v-bind:key="key">
            {{value}}: {{key}}
            <br><br>
            <input placeholder = 0 type="number" and min="0" v-bind:id = value>
            <br><br>
        </div>
        <button v-on:click="updateOrder">Update Order</button>
    </div>
</template>

<script>
import database from "../firebase.js"

export default {
    data() {
        return {
            datapacket: {}
        }
    },
    methods: {
        fetchItems: function() {
            database.collection('orders').doc(this.$route.params.document_id).get().then(
                (doc) => {this.datapacket = doc.data()});
        },
        updateOrder: function() {
            let newObject = {}
            for(var key in this.datapacket) {
                //alert(this.datapacket[key])
                newObject[key] = Number(document.getElementById(key).value)
                //db.collection().doc().update() is aiming on properties, then why do we need to create an object first???
                //alert(newObject[key])
            }
            this.datapacket = newObject
            database.collection("orders").doc(this.$route.params.document_id).update(this.datapacket).then(this.$router.push('orders'))
        }
    },
    created() {
        this.fetchItems();
    }
}
</script>

<style scoped>
button {
    font-size: 20px;
    width: 150px;
    height: 50px;
    background-color: coral;
}
</style>