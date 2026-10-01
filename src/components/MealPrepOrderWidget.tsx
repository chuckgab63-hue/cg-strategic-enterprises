import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MEAL_PREP_ORDER_WEBHOOK_URL } from '../config/webhooks';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  recommendedIds?: string[];
}

// Invented demo menu: each meal matches an unbranded, AI-generated photo in /public/demo-meals
const MENU: MenuItem[] = [
  { id: 'grilled-chicken-jasmine-rice-broccoli', name: 'Grilled Chicken, Jasmine Rice & Broccoli', category: 'High Protein', price: 12.99, calories: 480, protein: 42, carbs: 48, fat: 10 },
  { id: 'chicken-burrito-bowl-black-beans-corn', name: 'Chicken Burrito Bowl with Black Beans & Corn', category: 'High Protein', price: 13.49, calories: 560, protein: 40, carbs: 58, fat: 16 },
  { id: 'steak-sweet-potato-mash-green-beans', name: 'Steak, Sweet Potato Mash & Green Beans', category: 'High Protein', price: 15.99, calories: 540, protein: 44, carbs: 38, fat: 22 },
  { id: 'turkey-meatballs-marinara-penne', name: 'Turkey Meatballs, Marinara & Penne', category: 'High Protein', price: 12.49, calories: 590, protein: 38, carbs: 64, fat: 17 },
  { id: 'garlic-butter-chicken-cauliflower-mash', name: 'Garlic Butter Chicken & Cauliflower Mash', category: 'Low Carb', price: 13.99, calories: 430, protein: 39, carbs: 12, fat: 24 },
  { id: 'teriyaki-salmon-brown-rice-bok-choy', name: 'Teriyaki Salmon, Brown Rice & Bok Choy', category: 'Seafood', price: 15.49, calories: 520, protein: 34, carbs: 46, fat: 20 },
  { id: 'lemon-herb-cod-roasted-vegetables-quinoa', name: 'Lemon Herb Cod, Roasted Vegetables & Quinoa', category: 'Seafood', price: 14.99, calories: 410, protein: 33, carbs: 40, fat: 11 },
  { id: 'shrimp-stir-fry-rice-noodles', name: 'Shrimp Stir-Fry with Rice Noodles', category: 'Seafood', price: 14.49, calories: 470, protein: 29, carbs: 60, fat: 12 },
  { id: 'chickpea-coconut-curry-basmati', name: 'Chickpea Coconut Curry & Basmati Rice', category: 'Plant-Based', price: 11.99, calories: 530, protein: 16, carbs: 72, fat: 19 },
  { id: 'tofu-peanut-noodle-bowl', name: 'Tofu Peanut Noodle Bowl', category: 'Plant-Based', price: 12.49, calories: 550, protein: 24, carbs: 62, fat: 22 },
  { id: 'berry-almond-overnight-oats', name: 'Berry & Almond Butter Overnight Oats', category: 'Breakfast', price: 8.99, calories: 420, protein: 15, carbs: 54, fat: 16 },
  { id: 'spinach-egg-white-frittata-turkey-sausage', name: 'Spinach Egg White Frittata & Turkey Sausage', category: 'Breakfast', price: 10.49, calories: 340, protein: 35, carbs: 14, fat: 15 },
];

const mealPhoto = (id: string) => `/demo-meals/${id}.webp`;

type Mode = 'menu' | 'chat' | 'checkout' | 'confirmed';

// Weekly cadence: orders close Thursday at 8PM, meals arrive the following Monday.
function getCutoffInfo() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysUntilThursday = (4 - dayOfWeek + 7) % 7;
  const cutoff = new Date(now);
  cutoff.setDate(now.getDate() + daysUntilThursday);
  cutoff.setHours(20, 0, 0, 0);
  if (daysUntilThursday === 0 && now >= cutoff) {
    cutoff.setDate(cutoff.getDate() + 7);
  }
  const delivery = new Date(cutoff);
  delivery.setDate(cutoff.getDate() + 4);

  const dateFmt = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  const timeFmt = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' });

  return {
    cutoffLabel: `${dateFmt.format(cutoff)} at ${timeFmt.format(cutoff)}`,
    deliveryLabel: dateFmt.format(delivery),
  };
}

const MealPrepOrderWidget: React.FC = () => {
  const [mode, setMode] = useState<Mode>('menu');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fulfillmentType, setFulfillmentType] = useState<'Pickup' | 'Delivery'>('Delivery');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'assistant', text: "Hi! Tell me what you're craving or your health goals \u2014 like \"high protein, no seafood\" or \"something vegan and low carb\" \u2014 and I'll pick a few good fits from the menu." }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const { cutoffLabel, deliveryLabel } = useMemo(() => getCutoffInfo(), []);

  const cartItems = useMemo(
    () => MENU.filter((item) => (cart[item.id] || 0) > 0).map((item) => ({ item, qty: cart[item.id] })),
    [cart]
  );
  const cartCount = cartItems.reduce((sum, { qty }) => sum + qty, 0);
  const cartTotal = cartItems.reduce((sum, { item, qty }) => sum + item.price * qty, 0);

  useEffect(() => {
    chatScrollRef.current?.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [chatMessages, isChatLoading]);

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

  const handleSendChat = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    const userText = chatInput.trim();
    const historyForApi = chatMessages.map((m) => ({ role: m.role, text: m.text }));
    setChatMessages((prev) => [...prev, { id: Date.now().toString(), role: 'user', text: userText }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/recommend-meal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: userText, menu: MENU, history: historyForApi }),
      });
      if (!response.ok) throw new Error(`Responded with ${response.status}`);
      const data = await response.json();
      setChatMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: data.reply || "Here's what I'd suggest.",
        recommendedIds: Array.isArray(data.recommendedItemIds) ? data.recommendedItemIds : [],
      }]);
    } catch (error) {
      console.error('Meal recommendation failed:', error);
      setChatMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: 'Something went wrong on my end \u2014 mind trying again?',
      }]);
    } finally {
      setIsChatLoading(false);
    }
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
      const response = await fetch(MEAL_PREP_ORDER_WEBHOOK_URL, {
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
      <div className="bg-[#134e4a] px-6 py-5 flex items-center justify-between shrink-0 border-b border-teal-500/20">
        <div>
          <h3 className="text-white font-black text-base uppercase tracking-wider leading-none mb-1">
            Weekly Meal Prep
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_#2dd4bf]" />
            <span className="text-teal-300 text-[8px] font-black uppercase tracking-widest">
              Live Demo
            </span>
          </div>
        </div>
        {mode === 'menu' && (
          <button
            onClick={() => setMode('chat')}
            className="bg-teal-400 text-[#134e4a] font-black text-[10px] uppercase tracking-widest px-3 py-2 rounded-full flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            Help Me Choose
          </button>
        )}
        {mode === 'chat' && (
          <button
            onClick={() => setMode('menu')}
            className="text-teal-300 font-black text-[10px] uppercase tracking-widest"
          >
            &larr; Menu
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
        <>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          {MENU.map((item) => {
            const qty = cart[item.id] || 0;
            return (
              <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3">
                <img
                  src={mealPhoto(item.id)}
                  alt={item.name}
                  width={600}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="w-16 h-12 rounded-lg object-cover shrink-0 bg-slate-100"
                />
                <div className="min-w-0 flex-1 text-left">
                  <span className="text-[8px] font-black uppercase tracking-widest text-teal-700 block mb-0.5">{item.category}</span>
                  <p className="text-sm font-bold text-[#134e4a] leading-snug">{item.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">${item.price.toFixed(2)}{item.calories > 0 ? ` \u00b7 ${item.calories} cal \u00b7 ${item.protein}g protein` : ''}</p>
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
                  <span className="w-5 text-center text-sm font-bold text-[#134e4a]">{qty}</span>
                  <button
                    onClick={() => adjustQty(item.id, 1)}
                    aria-label={`Add one ${item.name}`}
                    className="w-7 h-7 rounded-full bg-[#134e4a] text-teal-400 font-black flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {cartCount > 0 && (
          <div className="shrink-0 p-4 bg-white border-t border-slate-200">
            <button
              onClick={() => setMode('checkout')}
              className="w-full h-14 rounded-xl bg-teal-500 text-white font-black text-sm uppercase tracking-widest flex items-center justify-between px-5 shadow-lg hover:bg-teal-600 transition-colors"
            >
              <span>{cartCount} item{cartCount !== 1 ? 's' : ''} &middot; ${cartTotal.toFixed(2)}</span>
              <span className="flex items-center gap-1">Checkout &rarr;</span>
            </button>
          </div>
        )}
        </>
      )}

      {mode === 'chat' && (
        <>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" ref={chatScrollRef}>
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] rounded-2xl p-3 ${msg.role === 'user' ? 'bg-[#134e4a] text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'}`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                {msg.recommendedIds && msg.recommendedIds.length > 0 && (
                  <div className="flex flex-col gap-2 mt-3">
                    {msg.recommendedIds.map((id) => {
                      const item = MENU.find((m) => m.id === id);
                      if (!item) return null;
                      return (
                        <div key={id} className="flex items-center justify-between gap-2 bg-teal-50 border border-teal-200 rounded-lg p-2">
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-[#134e4a] truncate">{item.name}</p>
                            <p className="text-[10px] text-slate-400">${item.price.toFixed(2)} &middot; {item.calories} cal</p>
                          </div>
                          <button
                            onClick={() => adjustQty(item.id, 1)}
                            className="shrink-0 bg-teal-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full hover:bg-teal-600 transition-colors"
                          >
                            + Add
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isChatLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-3 shadow-sm flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>
        <div className="shrink-0 p-4 bg-white border-t border-slate-200 flex flex-col gap-2">
          {cartCount > 0 && (
            <button
              onClick={() => setMode('checkout')}
              className="w-full h-10 rounded-lg bg-teal-100 text-teal-800 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-1"
            >
              View Cart ({cartCount}) &middot; ${cartTotal.toFixed(2)} &rarr;
            </button>
          )}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
              placeholder="e.g. high protein, no seafood"
              disabled={isChatLoading}
              className="flex-1 bg-slate-50 text-[#134e4a] placeholder:text-slate-400 border border-slate-200 rounded-xl px-3 py-3 text-sm font-medium focus:outline-none focus:border-[#134e4a] focus:ring-1 focus:ring-[#134e4a] transition-all disabled:opacity-50"
            />
            <button
              onClick={handleSendChat}
              disabled={isChatLoading || !chatInput.trim()}
              className="w-12 h-12 rounded-xl bg-[#134e4a] text-teal-400 flex items-center justify-center shrink-0 disabled:opacity-50"
              aria-label="Send"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
            </button>
          </div>
        </div>
        </>
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
            <div className="flex justify-between text-sm font-black text-[#134e4a] pt-2 mt-2 border-t border-slate-100">
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
            className="bg-white text-[#134e4a] placeholder:text-slate-400 border border-slate-200 rounded-xl px-3 py-3 text-sm font-medium focus:outline-none focus:border-[#134e4a] focus:ring-1 focus:ring-[#134e4a] transition-all shadow-sm disabled:opacity-50 w-full"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            disabled={isSubmitting}
            className="bg-white text-[#134e4a] placeholder:text-slate-400 border border-slate-200 rounded-xl px-3 py-3 text-sm font-medium focus:outline-none focus:border-[#134e4a] focus:ring-1 focus:ring-[#134e4a] transition-all shadow-sm disabled:opacity-50 w-full"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            disabled={isSubmitting}
            className="bg-white text-[#134e4a] placeholder:text-slate-400 border border-slate-200 rounded-xl px-3 py-3 text-sm font-medium focus:outline-none focus:border-[#134e4a] focus:ring-1 focus:ring-[#134e4a] transition-all shadow-sm disabled:opacity-50 w-full"
          />

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setFulfillmentType('Delivery')}
              disabled={isSubmitting}
              className={`py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${fulfillmentType === 'Delivery' ? 'bg-[#134e4a] text-teal-400' : 'bg-white border border-slate-200 text-slate-500'}`}
            >
              Delivery
            </button>
            <button
              onClick={() => setFulfillmentType('Pickup')}
              disabled={isSubmitting}
              className={`py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${fulfillmentType === 'Pickup' ? 'bg-[#134e4a] text-teal-400' : 'bg-white border border-slate-200 text-slate-500'}`}
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
              className="bg-white text-[#134e4a] placeholder:text-slate-400 border border-slate-200 rounded-xl px-3 py-3 text-sm font-medium focus:outline-none focus:border-[#134e4a] focus:ring-1 focus:ring-[#134e4a] transition-all shadow-sm disabled:opacity-50 w-full"
            />
          )}

          <button
            onClick={handleSubmitOrder}
            disabled={isSubmitting || !customerName.trim() || !email.trim() || !phone.trim() || (fulfillmentType === 'Delivery' && !address.trim())}
            className={`h-12 rounded-xl flex items-center justify-center text-xs font-black uppercase tracking-widest transition-colors ${
              isSubmitting || !customerName.trim() || !email.trim() || !phone.trim() || (fulfillmentType === 'Delivery' && !address.trim())
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-[#134e4a] text-teal-400 cursor-pointer'
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
          <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center">
            <svg className="w-7 h-7 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h4 className="text-lg font-black text-[#134e4a]">Demo Order Captured</h4>
          <p className="text-sm text-slate-500 max-w-xs">
            This is a portfolio demo &mdash; no real food will be prepared or delivered, and no payment was taken.
          </p>
          <button
            onClick={resetAll}
            className="mt-1 text-xs font-black uppercase tracking-widest text-slate-400 hover:underline"
          >
            Try the Demo Again
          </button>
        </div>
      )}

    </div>
  );
};

export default MealPrepOrderWidget;
