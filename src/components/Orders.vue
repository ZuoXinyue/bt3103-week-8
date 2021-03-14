<template>
    <div>
        <ul>
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/orders" exact>Orders</router-link></li>
            <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
        </ul>
        <ul>
            <li v-for="item in orders" :key="item.id">
                <aside>
                    <button v-bind:id="item[0]" v-on:click="deleteItem($event)">Delete</button>
                    <button v-bind:id="item[0]" v-on:click="route($event)">Modify</button>
                </aside>
                <div v-for="(key,value) in item[1]" v-bind:key="key" id = "left">
                    {{value}}: {{key}}
                    <br>
                </div>
                <br>
            </li>
        </ul>
    </div>
</template>

<script>
import database from "../firebase.js"

export default {
    data() {
        return {
            orders: [],
            document_id: []
        }
    },
    methods: {
        fetchItems: function() {
            database.collection('orders').get().then((querySnapShot)=>{
                querySnapShot.forEach(doc=>{
                    this.orders.push([doc.id, doc.data()])
                })      
            })
        },
        deleteItem: function(event) {
            let doc_id = event.target.getAttribute("id");
            database.collection('orders').doc(doc_id).delete().then(() => {location.reload()});
        },
        route: function(event) {
            let doc_id = event.target.getAttribute("id")
            this.$router.push({ name: 'modify', params: { document_id: doc_id } })
        }
    },
    created() {
        this.fetchItems();
    }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  width: 100%;
}

li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

router-link {
    width: 100%;
}

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}

aside {
    width: 30%;
    float: right;
    height: 120px;
}
</style>