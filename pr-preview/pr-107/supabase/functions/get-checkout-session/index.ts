import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@11.16.0?target=deno'

const stripe = new Stripe(Deno.env.get('Stripe_Secret_Key') as string, {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const sessionId = url.searchParams.get('session_id')

    if (!sessionId) {
      return new Response(JSON.stringify({ error: 'Missing session_id' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'payment_intent', 'payment_intent.latest_charge']
    })

    // Reconstruct cart items from metadata
    let cartJson = '';
    let chunkIndex = 0;
    while (session.metadata && session.metadata[`cart_${chunkIndex}`]) {
      cartJson += session.metadata[`cart_${chunkIndex}`];
      chunkIndex++;
    }

    let cartItems = [];
    if (cartJson) {
      try {
        cartItems = JSON.parse(cartJson);
      } catch (e) {
        console.error('Failed to parse cart JSON from metadata:', e);
      }
    }

    const responseData = {
      ...session,
      cart_items: cartItems
    };

    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
