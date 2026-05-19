import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@11.16.0?target=deno'

// Initialize Stripe with the Secret Key from Supabase Environment Variables
const stripe = new Stripe(Deno.env.get('Stripe_Secret_Key') as string, {
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
    const { items, returnUrl, shipping_rate_id } = await req.json()

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
      const customText = item.customText ? `("${item.customText}")` : '';
      return `${item.quantity}x ${item.size} ${color} ${customText}`.trim();
    }).join(', ');

    // Truncate to 500 chars (Stripe limit for metadata string)
    const safeOrderDetails = orderDetails.length > 500
      ? orderDetails.substring(0, 497) + '...'
      : orderDetails;

    // Serialize cart items into chunks of 500 characters to bypass Stripe metadata length limit
    const cartJson = JSON.stringify(items);
    const metadata: Record<string, string> = {
      orderDetails: safeOrderDetails,
    };

    // Split JSON string into chunks of 500 chars
    for (let i = 0; i < cartJson.length; i += 500) {
      metadata[`cart_${Math.floor(i/500)}`] = cartJson.substring(i, i + 500);
    }

    // Set up the Checkout Session
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      shipping_options: shipping_rate_id ? [{ shipping_rate: shipping_rate_id }] : [],
      // Metadata allows us to attach the selected colors/sizes to the order in Stripe
      payment_intent_data: {
        metadata: metadata,
      },
      metadata: metadata,
      // Redirect URLs back to your website
      return_url: returnUrl || `https://aquajay88.github.io/boone.click/store/success.html?session_id={CHECKOUT_SESSION_ID}`,
    })

    // Return the generated session client_secret
    return new Response(JSON.stringify({ client_secret: session.client_secret, publishableKey: Deno.env.get('Stripe_Publishable_Key') }), {
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
