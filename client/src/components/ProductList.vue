<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Product List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(product, index) in products"
          :key="index"
          @click="setActiveProduct(product, index)"
        >
          {{ product.attributes.custom_fields.name }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentProduct">
        <h4>Product</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentProduct.title }}
        </div>
        <div>
          <label><strong>Episode ID:</strong></label> {{ currentProduct.episode_id }}
        </div>
        <div>
          <label><strong>Directed By:</strong></label> {{ currentProduct.director }}
        </div>
        <div>
          <label><strong>Produced By:</strong></label> {{ currentProduct.producer }}
        </div>
        <div>
          <label><strong>Release Date:</strong></label> {{ currentProduct.release_date }}
        </div>

        <a class="badge badge-warning"
          :href="'/products/' + currentProduct._id"
        >
          View
        </a>
        <a class="badge badge-warning"
          :href="'/products/edit/' + currentProduct._id"
        >
          Edit
        </a>
        <img :src="currentProduct.image_url + '?w=400&auto=format,compress'" sizes="300px" width="300px" height="auto" />
      </div>
      <div v-else>
        <br />
        <p>Please click on a Product...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/ProductService.js";

export default {
  name: "ProductList",
  data() {
    return {
      product: {},
      currentIndex: [],
      data: [],
      products: [],
      title: [],
      currentProduct: []
    };
  },
  created() {
    this.getProductsData();
  },
  methods: {
    async getProductsData() {
      ProductService.getProducts()
      .then(
        (products => {
          this.$set(this, "products", products);
        }).bind(this)
      );
    },
    setActiveProduct(product, index) {
      this.currentProduct = product;
      this.currentIndex = index;
    },
    searchTitle() {
      ProductService.findByTitle(this.title)
        .then(response => {
          this.products = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    /*retrieveSwapis() {
      SwapiDataService.getAll()
        .then(response => {
          this.swapis = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveSwapis();
      this.currentSwapi = null;
      this.currentIndex = -1;
    }
  },
  mounted() {
    this.retrieveSwapis();*/
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>