import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@11.16.0?target=deno'

// Initialize Stripe with the Secret Key from Supabase Environment Variables
const stripe = new Stripe(Deno.env.get('Stripe_Secret_Test_Key') as string, {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
});

// Configure CORS for web requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Ensure it's a POST request
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Parse the request body
    const { items, cancelUrl, successUrl } = await req.json()

    // Validate inputs
    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: 'Missing or invalid items array' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Format line items for Stripe
    const line_items = items.map((item: any) => ({
      price: item.id,
      quantity: item.quantity,
    }));

    // Create a detailed description of the order for metadata
    const orderDetails = items.map((item: any) => {
      const color = item.color ? item.color.charAt(0).toUpperCase() + item.color.slice(1) : '';
      return `${item.quantity}x ${item.size} ${color}`.trim();
    }).join(', ');

    // Truncate to 500 chars (Stripe limit for metadata string)
    const safeOrderDetails = orderDetails.length > 500
      ? orderDetails.substring(0, 497) + '...'
      : orderDetails;

    // Set up the Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      shipping_options: [
        {
          shipping_rate: 'shr_1TFe8hBA6S4OMIQxytHowB6F',
        },
      ],
      // Metadata allows us to attach the selected colors/sizes to the order in Stripe
      payment_intent_data: {
        metadata: {
          orderDetails: safeOrderDetails,
        },
      },
      metadata: {
        orderDetails: safeOrderDetails,
      },
      // Redirect URLs back to your website
      success_url: successUrl || `https://boone.click/store/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `https://boone.click/store/index.html`,
    })

    // Return the generated session URL
    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
