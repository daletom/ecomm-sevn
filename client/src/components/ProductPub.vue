<template>
  <div class="container">
    <span class="stats">
      {{ cart.items.length }} 
      <template v-if="cart.items.length == 1">item</template>
      <template v-else>items</template> 
      in cart, totalling {{ cartTotal | currency }}
      <button class="btn btn-primary" @click="isShowingCart = true">View Cart</button>
    </span>
    <div v-if="!isShowingCart" id="products" class="row">
    <div v-for="product in products" :key ="product" :class="groupWrapper"  class="item  col-xs-4 col-lg-4">
    <div class="thumbnail">
    <img class="group list-group-image" :src="product.picture" alt="" />
    <div class="caption">
      <h4 class="group inner list-group-item-heading">
       {{product.name}}</h4>
      <p class="group inner list-group-item-text">
        {{product.description}}</p>
      <div class="row">
        <div class="col-xs-12 col-md-6">
          <p class="lead">
            {{product.price | currency}}</p>
        </div>
        <div class="col-xs-8 flex flex-row align-center justify-right">
          <div class="number-in-stock" :class="{ few: product.inStock < 10 && product.inStock > 0, none: product.inStock == 0 }" >
             {{ product.inStock }} in stock
          </div>
          <button class="btn btn-success" @click="addProductToCart(product)" :disabled="product.inStock == 0" >Add to cart</button>
        </div>
      </div>
    </div>
  </div>
    </div>
  </div>
  
  <div v-else>
    <h1>Cart</h1>
    <table v-if="cart.items.length > 0" class="table table-striped">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart.items" :key="item">
          <td>{{ item.product.name }}</td>
          <td>
            {{ item.quantity }} &nbsp;
            <button class="btn btn-success" @click="increaseQuantity(item)" :disabled="item.product.inStock == 0">+</button>
            <button class="btn btn-danger" @click="decreaseQuantity(item)">-</button>
          </td>
          <td>{{ item.quantity * item.product.price | currency }}</td>
        </tr>
        
        <tr>
          <td class="text-right" colspan="2">
            <strong>Subtotal</strong>
          </td>
          
          <td>{{ cartTotal | currency }}</td>
        </tr>
        
        <tr>
          <td class="text-right" colspan="2">
            <strong>Taxes</strong>
          </td>
          
          <td>{{ taxAmount | currency }}</td>
        </tr>
        
        <tr>
          <td class="text-right" colspan="2">
            <strong>Grand total</strong>
          </td>
          
          <td>{{ cartTotal + taxAmount | currency }}</td>
        </tr>
        
        <tr>
          <td colspan="2"></td>
          <td><button class="btn btn-success" @click="checkout">Checkout</button></td>
        </tr>
      </tbody>
    </table>
    
    <p v-else>Your cart is currently empty.</p>
        
      
  </div>
  </div>
</template>

<script>
export default {
  name: 'ProductPub',
  data() {
    return {
    groupWrapper: "list-group-item",
    isShowingCart: false,
    cart: {
      items: []
    },
    products: [
      {
        id: 1,
        name: "imgix Mugs",
        picture: "https://tom.imgix.net/examples/ecomm/ix_row_mug.png?auto=format,compress&w=320&h=200&fit=crop",
        description:
        "These pristine coffee mugs show off your favorite image optimization company's logo.",
        price: 10,
        inStock: 50
      },
      {
        id: 2,
        name: "imgix Stickers",
        picture: "https://tom.imgix.net/examples/ecomm/ix_hologram_sticker.jpg?auto=format,compress&w=320&h=200&fit=crop",
        description:
        "These psychedelic stickers will stand out in every situation!",
        price: 2,
        inStock: 755
      },
      {
        id: 3,
        name: "imgix Coffee Maker",
        picture: "https://tom.imgix.net/examples/ecomm/ix_coffee_maker.png?auto=format,compress&w=320&h=200&fit=fill&fill=solid&fill-color=white",
        description:
        "Single serve orange coffee maker with imgix sticker slapped on the side.",
        price: 25,
        inStock: 10
      },
      {
        id: 4,
        name: "iPhone 7 cover",
        description:
        "Having problems keeping a hold of that phone, huh? Ever considered not dropping it in the first place?",
        price: 49,
        inStock: 42
      },
      {
        id: 5,
        name: "iPad Pro (9.7 inch)",
        description:
        "We heard it's supposed to be pretty good. At least that's what people say.",
        price: 599,
        inStock: 0
      },
      {
        id: 6,
        name: "OnePlus 3 cover",
        description:
        "Does your phone spend most of its time on the ground? This cheap piece of plastic is the solution!",
        price: 19,
        inStock: 81
      }
    ]
  }
    },
  computed: {
    cartTotal: function() {
      var total = 0;
      this.cart.items.forEach(function(item) {
        total += item.quantity * item.product.price;
      });
      return total;
  },
  taxAmount: function() {
      return this.cartTotal * 10 / 100;
    }
  },
  filters: {
    currency: function(value) {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0
      });
      return formatter.format(value);
    }
  },
  methods: {
    removeItemFromCart: function(cartItem) {
      var index = this.cart.items.indexOf(cartItem);
      
      if (index !== -1) {
        this.cart.items.splice(index, 1);
      }
    },
    checkout: function() {
      if (confirm('Are you sure that you want to purchase these products?')) {
        this.cart.items.forEach(function(item) {
          item.product.inStock += item.quantity;
        });
        
        this.cart.items = [];
      }
    },
    addProductToCart: function(product) {
      var cartItem = this.getCartItem(product);
      
      if (cartItem != null) {
        cartItem.quantity++;
      } else {
        this.cart.items.push({
          product: product,
          quantity: 1
        });
      }
      product.inStock--;
    },
    increaseQuantity: function(cartItem) {
      cartItem.product.inStock--;
      cartItem.quantity++;
    },
    decreaseQuantity: function(cartItem) {
      cartItem.quantity--;
      cartItem.product.inStock++;
      if (cartItem.quantity == 0) {
        this.removeItemFromCart(cartItem);
      }
    },
    getCartItem: function(product) {
      for (var i = 0; i < this.cart.items.length; i++) {
        if (this.cart.items[i].product.id === product.id) {
          return this.cart.items[i];
        }
      }
      
      return null;
    },
    listWrapper:function(){
      this.groupWrapper = "list-group-item"
    },
    gridWrapper:function(){
      this.groupWrapper = "grid-group-item"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.glyphicon { margin-right:5px; }
.thumbnail
{
  margin-bottom: 20px;
  padding: 0px;
  -webkit-border-radius: 0px;
  -moz-border-radius: 0px;
  border-radius: 0px;
}

.item.list-group-item
{
  float: none;
  width: 100%;
  background-color: #fff;
  margin-bottom: 10px;
}
.item.list-group-item:nth-of-type(odd):hover,.item.list-group-item:hover
{
  background: #428bca;
}

.item.list-group-item .list-group-image
{
  margin-right: 10px;
}
.item.list-group-item .thumbnail
{
  margin-bottom: 0px;
}
.item.list-group-item .caption
{
  padding: 9px 9px 0px 9px;
}
.item.list-group-item:nth-of-type(odd)
{
  background: #eeeeee;
}

.item.list-group-item:before, .item.list-group-item:after
{
  display: table;
  content: " ";
}

.item.list-group-item img
{
  float: left;
}
.item.list-group-item:after
{
  clear: both;
}
.list-group-item-text
{
  margin: 0 0 11px;
}
</style>
