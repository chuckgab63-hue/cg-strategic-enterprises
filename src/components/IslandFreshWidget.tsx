import React, { useState, useMemo } from 'react';
import { ISLAND_FRESH_ORDER_WEBHOOK_URL } from '../config/webhooks';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  calories: number;
}

// Real menu items pulled from islandfreshmeals.com's actual product catalog
const MENU: MenuItem[] = [
  { id: 'baked-chicken-congris', name: 'Baked Chicken Leg with Congris & Plantains', category: 'Balance', price: 10.99, calories: 520 },
  { id: 'bolognese', name: 'Bolognese', category: 'Balance', price: 12.99, calories: 500 },
  { id: 'grilled-chicken-jasmine', name: 'Grilled Chicken, Jasmine Rice, Cilantro, Green Beans & Pico', category: 'Balance', price: 12.99, calories: 400 },
  { id: 'cubano', name: 'Cubano \u2014 Shredded Chicken, Scrambled Eggs, Red Potatoes, Pico', category: 'Breakfast', price: 11.99, calories: 340 },
  { id: 'eggs-ham-cheese', name: 'Scramble Eggs, Ham, Shredded Cheese & Veggies', category: 'Breakfast', price: 10.99, calories: 380 },
  { id: 'garlic-chicken-beans', name: 'Garlic Chicken, Jasmine Rice, Black Beans, Green Beans & Pico', category: 'Balance', price: 13.99, calories: 360 },
  { id: 'grilled-chicken-salad', name: 'Grilled Chicken Salad \u2014 Spinach, Corn, Carrots, Peppers, Ranch', category: 'Low Carb', price: 16.99, calories: 340 },
  { id: 'shrimp-brown-rice', name: 'Shrimp, Brown Rice, Green Beans & Cilantro', category: 'Seafood', price: 15.99, calories: 378 },
  { id: 'ginger-shot', name: 'Ginger Shot', category: 'Drinks', price: 3.99, calories: 0 },
];

type Mode = 'menu' | 'checkout' | 'confirmed';

function getCutoffInfo() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  let daysUntilSunday = (7 - dayOfWeek) % 7;
  const cutoff = new Date(now);
  cutoff.setDate(now.getDate() + daysUntilSunday);
  cutoff.setHours(9, 0, 0, 0);
  if (daysUntilSunday === 0 && now >= cutoff) {
    cutoff.setDate(cutoff.getDate() + 7);
  }
  const delivery = new Date(cutoff);
  delivery.setDate(cutoff.getDate() + 3);

  const dateFmt = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  const timeFmt = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' });

  return {
    cutoffLabel: `${dateFmt.format(cutoff)} at ${timeFmt.format(cutoff)}`,
    deliveryLabel: dateFmt.format(delivery),
  };
}

const IslandFreshWidget: React.FC = () => {
  const [mode, setMode] = useState<Mode>('menu');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fulfillmentType, setFulfillmentType] = useState<'Pickup' | 'Delivery'>('Delivery');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const { cutoffLabel, deliveryLabel } = useMemo(() => getCutoffInfo(), []);

  const cartItems = useMemo(
    () => MENU.filter((item) => (cart[item.id] || 0) > 0).map((item) => ({ item, qty: cart[item.id] })),
    [cart]
  );
  const cartCount = cartItems.reduce((sum, { qty }) => sum + qty, 0);
  const cartTotal = cartItems.reduce((sum, { item, qty }) => sum + item.price * qty, 0);

  const adjustQty = (id: string, delta: number) => {
    setCart((prev) => {
      const next = { ...prev };
      const newQty = (next[id] || 0) + delta;
      if (newQty <= 0) delete next[id];
      else next[id] = newQty;
      return next;
    });
  };

  const resetAll = () => {
    setMode('menu');
    setCart({});
    setCustomerName('');
    setPhone('');
    setAddress('');
    setStatusMessage(null);
  };

  const handleSubmitOrder = async () => {
    if (!customerName.trim() || !email.trim() || !phone.trim() || cartCount === 0 || isSubmitting) return;
    if (fulfillmentType === 'Delivery' && !address.trim()) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    const itemsSummary = cartItems
      .map(({ item, qty }) => `${qty}x ${item.name} ($${(item.price * qty).toFixed(2)})`)
      .join('<br>');
    const addressLine = fulfillmentType === 'Delivery' ? `Delivery to: ${address}<br>` : '';

    try {
      const response = await fetch(ISLAND_FRESH_ORDER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          email,
          phone,
          fulfillmentType,
          addressLine,
          deliveryDate: deliveryLabel,
          itemsSummary,
          total: cartTotal.toFixed(2),
        }),
      });

      if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
      const data = await response.json().catch(() => ({}));

      if (data.limitReached) {
        setStatusMessage("You've reached today's usage limit for this demo (10 submissions). Check your email for details.");
      } else {
        setMode('confirmed');
      }
    } catch (error) {
      console.error('Order submission failed:', error);
      setStatusMessage('Something went wrong submitting your order \u2014 please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto bg-slate-50 rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col h-[650px] border border-white/10">

      {/* Header */}
      <div className="bg-[#0a3d2e] px-6 py-5 flex items-center justify-between shrink-0 border-b border-green-500/20">
        <div>
          <h3 className="text-white font-black text-base uppercase tracking-wider leading-none mb-1">
            Island Fresh
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
            <span className="text-green-300 text-[8px] font-black uppercase tracking-widest">
              Live Demo
            </span>
          </div>
        </div>
        {mode === 'menu' && cartCount > 0 && (
          <button
            onClick={() => setMode('checkout')}
            className="bg-green-400 text-[#0a3d2e] font-black text-xs px-4 py-2 rounded-full flex items-center gap-2"
          >
            {cartCount} item{cartCount !== 1 ? 's' : ''} &middot; ${cartTotal.toFixed(2)}
          </button>
        )}
      </div>

      {/* Cutoff banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center shrink-0">
        <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide">
          Order by {cutoffLabel} &middot; Delivery {deliveryLabel}
        </span>
      </div>

      {mode === 'menu' && (
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          {MENU.map((item) => {
            const qty = cart[item.id] || 0;
            return (
              <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[8px] font-black uppercase tracking-widest text-green-700 block mb-0.5">{item.category}</span>
                  <p className="text-sm font-bold text-[#0a3d2e] leading-snug">{item.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">${item.price.toFixed(2)}{item.calories > 0 ? ` \u00b7 ${item.calories} cal` : ''}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => adjustQty(item.id, -1)}
                    disabled={qty === 0}
                    aria-label={`Remove one ${item.name}`}
                    className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 font-black flex items-center justify-center disabled:opacity-30"
                  >
                    &minus;
                  </button>
                  <span className="w-5 text-center text-sm font-bold text-[#0a3d2e]">{qty}</span>
                  <button
                    onClick={() => adjustQty(item.id, 1)}
                    aria-label={`Add one ${item.name}`}
                    className="w-7 h-7 rounded-full bg-[#0a3d2e] text-green-400 font-black flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {mode === 'checkout' && (
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-2">Your Order</span>
            {cartItems.map(({ item, qty }) => (
              <div key={item.id} className="flex justify-between text-xs text-slate-600 py-0.5">
                <span>{qty}x {item.name}</span>
                <span className="shrink-0 ml-2">${(item.price * qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm font-black text-[#0a3d2e] pt-2 mt-2 border-t border-slate-100">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          {statusMessage && (
            <div className="bg-slate-100 border border-slate-200 rounded-xl p-3 text-xs text-slate-600">
              {statusMessage}
            </div>
          )}

          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Full name"
            disabled={isSubmitting}
            className="bg-white text-[#0a3d2e] placeholder:text-slate-400 border border-slate-200 rounded-xl px-3 py-3 text-sm font-medium focus:outline-none focus:border-[#0a3d2e] focus:ring-1 focus:ring-[#0a3d2e] transition-all shadow-sm disabled:opacity-50 w-full"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            disabled={isSubmitting}
            className="bg-white text-[#0a3d2e] placeholder:text-slate-400 border border-slate-200 rounded-xl px-3 py-3 text-sm font-medium focus:outline-none focus:border-[#0a3d2e] focus:ring-1 focus:ring-[#0a3d2e] transition-all shadow-sm disabled:opacity-50 w-full"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            disabled={isSubmitting}
            className="bg-white text-[#0a3d2e] placeholder:text-slate-400 border border-slate-200 rounded-xl px-3 py-3 text-sm font-medium focus:outline-none focus:border-[#0a3d2e] focus:ring-1 focus:ring-[#0a3d2e] transition-all shadow-sm disabled:opacity-50 w-full"
          />

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setFulfillmentType('Delivery')}
              disabled={isSubmitting}
              className={`py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${fulfillmentType === 'Delivery' ? 'bg-[#0a3d2e] text-green-400' : 'bg-white border border-slate-200 text-slate-500'}`}
            >
              Delivery
            </button>
            <button
              onClick={() => setFulfillmentType('Pickup')}
              disabled={isSubmitting}
              className={`py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${fulfillmentType === 'Pickup' ? 'bg-[#0a3d2e] text-green-400' : 'bg-white border border-slate-200 text-slate-500'}`}
            >
              Pickup
            </button>
          </div>

          {fulfillmentType === 'Delivery' && (
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Delivery address"
              disabled={isSubmitting}
              className="bg-white text-[#0a3d2e] placeholder:text-slate-400 border border-slate-200 rounded-xl px-3 py-3 text-sm font-medium focus:outline-none focus:border-[#0a3d2e] focus:ring-1 focus:ring-[#0a3d2e] transition-all shadow-sm disabled:opacity-50 w-full"
            />
          )}

          <button
            onClick={handleSubmitOrder}
            disabled={isSubmitting || !customerName.trim() || !email.trim() || !phone.trim() || (fulfillmentType === 'Delivery' && !address.trim())}
            className={`h-12 rounded-xl flex items-center justify-center text-xs font-black uppercase tracking-widest transition-colors ${
              isSubmitting || !customerName.trim() || !email.trim() || !phone.trim() || (fulfillmentType === 'Delivery' && !address.trim())
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-[#0a3d2e] text-green-400 cursor-pointer'
            }`}
          >
            {isSubmitting ? 'Placing order...' : `Place Order \u2014 $${cartTotal.toFixed(2)}`}
          </button>

          <button
            onClick={() => setMode('menu')}
            disabled={isSubmitting}
            className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors self-start disabled:opacity-50"
          >
            &larr; Back to menu
          </button>
        </div>
      )}

      {mode === 'confirmed' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-3">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h4 className="text-lg font-black text-[#0a3d2e]">Order Confirmed!</h4>
          <p className="text-sm text-slate-500 max-w-xs">
            A confirmation has been sent to {email}. We'll be in touch to confirm payment before {deliveryLabel}.
          </p>
          <button
            onClick={resetAll}
            className="mt-2 text-xs font-black uppercase tracking-widest text-green-700 hover:underline"
          >
            Place Another Order
          </button>
        </div>
      )}

    </div>
  );
};

export default IslandFreshWidget;
