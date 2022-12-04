app.component("product", {
    template: /* vue-html */ `
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
                <button :disabled="product.stock == 0" @click="sendToCart()">Agregar al carrito</button>
            </section>
    
    `,
    props: ["product"],
    emits: ["sendtocart"],
    setup(props, context){
        //Variable tipo reactive que contiene todo el estado de mi producto
        const productState = reactive({
            activeImage: 0,
        });
        
        

        const discountCodes = ref(["RAZO", "IOSAMUEL"]);

        //.VALUE para cuando se necesiten accesar a las variables dentro de una función
        function applyDiscount(event){
            const discountCodeIndex = discountCodes.value.indexOf(event.target.value); //obtener el valor en una variable y buscar con la funcion indexOf
            //validar si esta dentro del arreglo discountCodes
            console.log("discountCodeIndex = "+discountCodeIndex);
            if(discountCodeIndex >= 0){
                props.product.price *= 50/100;
                discountCodes.value.splice(discountCodeIndex, 1); //eliminar si ya fue utilizado
            }

        }

        function sendToCart(){
            context.emit("sendtocart", props.product);
        }

        return{
            ...toRefs(productState),
            applyDiscount,
            sendToCart
        }
    }
});