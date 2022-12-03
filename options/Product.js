app.component("product",{
    template: /* vue-html*/ `
        <section class="product">
                <div class="product__thumbnails">
                    <div 
                        v-for="(image, index) in product.images"
                        :key="image.thumbnail"
                        class="thumb" 
                        :class="{ active: activeImage == index }" 
                        :style="{ backgroundImage: 'url(' + product.images[index].thumbnail + ')' }" 
                        @click="activeImage = index"
                    ></div>
                </div>
                <div class="product__image">
                    <img :src="product.images[activeImage].image" :alt="product.name">
                </div>
            </section>

            <section class="description">
                <h4>{{ product.name.toUpperCase() }} {{ product.stock == 0 ? "\u{1F62D}" : "😎" }}</h4>
                <span class="badge new" v-if="product.new">Nuevo</span>
                <span class="badge offer" v-if="product.offer">Oferta</span>
                <p class="description__status" v-if="product.stock == 3">Quedan pocas unidades!</p>
                <p class="description__status" v-else-if="product.stock == 2">El producto esta por terminarse!</p>
                <p class="description__status" v-else-if="product.stock == 1">Última unidad disponible!</p>
                <p class="description__price">{{ new Intl.NumberFormat("es-MX").format(product.price)  }}</p>
                <p class="description__content"></p>
                <div class="discount">
                    <span>Código de Descuento:</span>
                    <input 
                        type="text" 
                        placeholder="Ingresa tu código" 
                        @keyup.enter="applyDiscount($event)"
                    >
                </div>
                <button :disabled="product.stock == 0" @click="addToCart()">Agregar al carrito</button>
            </section>
    `,
    data() {
        return{
            product:{
                name: "Camara",
                price: 450_000,
                stock: 5,
                content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa tenetur, laudantium placeat obcaecati autem deleniti magni. Sit reprehenderit   ipsum quidem reiciendis suscipit, fuga pariatur molestiae deserunt ea temporibus, doloribus cumque?',
                images: [
                    { 
                        image: "./images/camara.jpg",
                        thumbnail: "./images/camara-thumb.jpg",
                    },
                    { 
                        image: "./images/camara-2.jpg",
                        thumbnail: "./images/camara-2-thumb.jpg",
                    }
                ],
                new: true,
                offer: false,
                quantity: 1,
            },
            activeImage: 0,
            discountCodes: ["RAZO", "IOSAMUEL"],
        };
    },
    methods: {
                
        applyDiscount(event){
            const discountCodeIndex = this.discountCodes.indexOf(event.target.value); //obtener el valor en una variable y buscar con la funcion indexOf
            //validar si esta dentro del arreglo discountCodes
            console.log("discountCodeIndex = "+discountCodeIndex);
            if(discountCodeIndex >= 0){
                this.product.price *= 50/100;
                this.discountCodes.splice(discountCodeIndex, 1); //eliminar si ya fue utilizado
            }
        },
        addToCart(){
            const prodIndex = this.cart.findIndex(prod => prod.name == this.product.name); //validar si ya existe
            console.log("prodIndex = " + prodIndex );
            if(prodIndex >= 0){
                this.cart[prodIndex].quantity += 1;//En el carrito Aumentar la cantidad del producto encontrado
            }else{
                this.cart.push(this.product); //añadir producto al carrito
            }
            this.product.stock -= 1; //disminuir el stock
        }
    },
});
    