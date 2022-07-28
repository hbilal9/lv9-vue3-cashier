<template>
    <h3>Cart</h3>
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in cartData" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ calculateSubTotal(item) }}</td>
            </tr>
            <tr>
                <td colspan="2" class="text-center"><strong> Total: </strong></td>
                <td><strong> {{ cartTotal }} </strong></td>
            </tr>
        </tbody>
    </table>
    <div class="form">
        <div class="row">
            <div class="col-4">
                <div class="form-group">
                    <label for="first_name">First Name</label>
                    <input
                        v-model="customer.first_name"
                        class="form-control"
                        type="text"
                        :disabled="paymentProcessing"
                    >
                </div>
            </div>
            <div class="col-4">
                <div class="form-group">
                    <label for="last_name">Last Name</label>
                    <input
                        v-model="customer.last_name"
                        class="form-control"
                        type="text"
                        :disabled="paymentProcessing"
                    >
                </div>
            </div>
            <div class="col-4">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                        v-model="customer.email"
                        class="form-control"
                        type="email"
                        :disabled="paymentProcessing"
                    >
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-8">
                <label for="cart-info">Credit Card Information</label>
                <div id="card-element"></div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12 d-flex justify-content-center">
                <button
                    @click="processPayment"
                    class="btn btn-primary shadow-none"
                    :disabled="paymentProcessing"
                >
                    Pay Now
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { loadStripe } from '@stripe/stripe-js'
    import { computed, onMounted, ref } from '@vue/runtime-core';
    import { useCartStore } from '../stores/useCartStore';
    const store = useCartStore();

    const cartData = computed(() => {
        return store.cart;
    });

    const cartTotal = computed( () => {
        return store.cart.reduce((acc, item) => acc + (item.price * item.quantity),0)
    });

    const paymentProcessing = ref(false);
    const customer = ref({});

    const cardElement = ref({});
    const stripe = ref({});

    onMounted(async () => {
        stripe.value = await loadStripe(import.meta.env.VITE_STRIPE_KEY);
        // console.log(stripe)
        const el = stripe.value.elements();
        cardElement.value = el.create('card',{
            classes: {
                base: 'form-control form-control-lg'
            }
        });
        cardElement.value.mount('#card-element')
    });

    
    const processPayment = async () => {
        paymentProcessing.value = true;
        const { paymentMethod, error } = await stripe.value.createPaymentMethod (
            'card', cardElement.value, {
                billing_details: {
                    name: customer.value.first_name + customer.value.last_name,
                    email: customer.value.email
                }
            }
        );

        if(error){
            paymentProcessing.value = false;
            console.log(error);
        }else{
            customer.value.payment_method_id = paymentMethod.id;
            customer.value.amount = cartTotal.value;
            customer.value.cart = cartData.value

            // try {
                store.processPayment(customer.value);
                paymentProcessing.value = false;
                store.clearCart();
            // } catch (error) {
            //     console.log(error)
            // }
        }
    }


    const calculateSubTotal  = (item) => item.quantity * item.price;
</script>