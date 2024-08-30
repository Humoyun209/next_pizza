import Stripe from 'stripe'

export const getPriceId = async (totalAmount: number) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    try {
        const product = await stripe.products.create({
            name: 'Оплата заказа',
        })

        // Создание цены
        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: totalAmount * 100,
            currency: 'RUB',
        })

        return price.id
    } catch (error) {
        console.log(error)
    }
}
