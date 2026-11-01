// English copy for the meal-prep feature pages (see mealPrepFeatures.ts for the rules).
// Every claim here was checked against the live demo (demo.cgstrategic.dev) and the
// demo guide. No prices, no invented numbers, no competitor names.

import type { FeaturePage } from './mealPrepFeatures.ts';

export const FEATURE_PAGES_EN: FeaturePage[] = [
  {
    slug: 'subscriptions',
    navTitle: 'Subscriptions and recurring revenue',
    eyebrow: 'Subscriptions and recurring revenue',
    title: 'Meal Prep Subscription Software: Weekly Plans That Run Themselves',
    intro:
      'Customers sign up once, then skip a week, swap meals, pause or cancel on their own. You get a week you can plan around, billed on your own Stripe account.',
    card: 'Weekly plans customers manage themselves: skip, pause, swap or cancel, billed every week.',
        problem: [
      'Every week I am chasing the same people in DMs and texts: are you in this week, which meals do you want, did you pay? One missed message and my numbers for the week fall apart.',
      'I want people to sign up once and have the week run itself, and I do not want to lose them just because they are traveling for a week.',
    ],
    how: [
      {
        side: 'customer',
        title: 'Pick a plan and start',
        body: 'Customers choose a weekly plan (a set number of meals at a price per meal), pick delivery or pickup and confirm. On your own site the customer adds a card through Stripe, on your own Stripe account, and each week is billed after its ordering deadline.',
        screen: { id: 'store-plans', alt: 'The demo storefront plans page with three weekly plans and a price per meal', caption: 'The plans page. In the demo nothing is charged.' },
      },
      {
        side: 'customer',
        title: 'Skip, pause, swap or cancel before the deadline',
        body: 'On their account page customers see their plan, their next delivery and the coming weeks, with the deadline for changes.',
        points: [
          'Skip any week: no delivery and no charge.',
          'Choose different meals for a week, or let the saved favorites or your chef\'s picks fill it in.',
          'Pause the whole plan until a date, switch to more or fewer meals a week, or cancel.',
          'Once a week\'s deadline passes it locks, and your kitchen plans around it.',
        ],
        screen: { id: 'my-plan', alt: 'A customer\'s My Plan page with the upcoming weeks and options to skip, swap or pause', caption: 'My Plan, as the customer sees it.' },
      },
      {
        side: 'admin',
        title: 'See every subscriber and step in when needed',
        body: 'The Subscriptions page lists every subscriber with what they are doing this week: delivering, skipping or paused. Filter by active, paused, skipping this week, cancelled or failed payment, and search by name.',
        points: [
          'Open a customer to see exactly what they see, and skip a week, choose meals, pause, change meals per week or cancel for them. Every change is in the Audit Log.',
          'Choose what a customer gets when they do not pick their meals: their favorites or your chef\'s picks.',
          'On your own site a declined weekly payment is flagged here and on Orders, and the customer is emailed a link to update their card.',
          'If you ever pause billing or stop new sign-ups, customers with a weekly plan get an email about it in English or Spanish, on top of the notice in their account.',
        ],
        screen: { id: 'admin-subscriptions', alt: 'The admin Subscriptions page with counts of active, paused, skipping and cancelled plans', caption: 'Subscriptions in the admin.' },
      },
    ],
    features: ['subscriptions'],
    grow: [
      { title: 'Recurring revenue you can plan around', body: 'Subscribers are billed every week after the ordering deadline, so you know what is coming before you shop and cook.' },
      { title: 'A kinder alternative to cancelling', body: 'A customer who is away for a week can skip it in a couple of taps instead of cancelling by text, and is still on your plan when they are back.' },
      { title: 'Less admin time', body: 'The plan places each week\'s order for the customer. You stop collecting orders by message and start from a list that is already there.' },
    ],
    demo: [
      { label: 'The plans page', path: '/plans', side: 'customer' },
      { label: 'A customer\'s account and plan', path: '/account', side: 'customer' },
      { label: 'Subscribers', path: '/admin/subscriptions', side: 'admin' },
      { label: 'Plans you offer', path: '/admin/plans', side: 'admin' },
    ],
    faq: [
      { id: 'skip-pause', question: 'Can customers skip a week or pause on their own?', answer: 'Yes. Before a week\'s ordering deadline they can skip it, swap its meals, pause the plan until a date, change how many meals they get or cancel. After the deadline the week is locked so your kitchen can plan around it.' },
      { id: 'who-gets-paid', question: 'Where does the money go, and do you take a cut of each order?', answer: 'Payments go to your own Stripe account. There is no per-order platform fee from us. Stripe\'s own processing fees still apply, as they do with any card payment.' },
      { id: 'failed-payment', question: 'What happens when a weekly payment fails?', answer: 'On your own site the failed payment is flagged on the Subscriptions page and on Orders, and the customer is emailed a link to update their card.' },
      { id: 'pause-everything', question: 'Can I pause billing for everyone, for example if I close for a week?', answer: 'Yes. In Settings > Features you can pause all weekly-plan billing or just stop new sign-ups. The screen shows who is affected first, customers get an email about it in their language, and turning weekly plans back on resumes exactly those plans.' },
    ],
    related: ['delivery-and-pickup', 'kitchen-operations', 'reports-and-insights'],
  },
  {
    slug: 'bigger-orders',
    navTitle: 'Bigger orders',
    eyebrow: 'Bigger orders',
    title: 'Build-Your-Own Meals, Sizes, Add-Ons and Bundles',
    intro:
      'Let customers build a bowl with live macros, choose a size, add extras and buy packs, and set a minimum so every order is worth the trip.',
    card: 'Build-your-own meals with macros, sizes and add-ons, packs of meals, and a minimum order.',
        problem: [
      'My customers order the same two or three meals, and nobody tries the extras because they have to text me to ask. Meanwhile a small order that needs a delivery trip barely pays for the gas.',
      'I want people to build exactly what they want, see the price and macros as they go, and spend a little more each time.',
    ],
    how: [
      {
        side: 'customer',
        title: 'Build your own meal, with macros that add up as they choose',
        body: 'Customers pick a protein (a regular or double portion), a carb, one or two vegetables, a sauce and toppings. As they pick, the price, calories, protein, carbs and fat add up, along with the allergens of what they chose. If they filtered out an allergen on the menu, the choices that contain it are hidden here too.',
        screen: { id: 'byo', alt: 'The Build Your Own Bowl page with protein choices, portion sizes and a running price', caption: 'Build Your Own Bowl on the demo storefront.' },
      },
      {
        side: 'customer',
        title: 'Sizes and add-ons',
        body: 'On a meal that comes in sizes, the customer chooses a size and ticks up to two add-ons. The price and nutrition change before it goes in the cart. An add-on that brings an allergen the meal does not have says so there, again in the cart, at checkout and on the label.',
        screen: { id: 'sizes', alt: 'A meal page with a size selector and paid add-ons', caption: 'A meal with sizes and add-ons.' },
      },
      {
        side: 'customer',
        title: 'Packs of meals at their own price',
        body: 'A bundle is a pack with a fixed list of meals, like a ten-meal variety pack. Its page shows what is inside, the allergens of every meal in it, and the nutrition per meal averaged over the pack.',
        screen: { id: 'bundle', alt: 'A ten-meal variety pack page listing the meals inside', caption: 'A meal pack and what is inside it.' },
      },
      {
        side: 'customer',
        title: 'A minimum order, so each order is worth delivering',
        body: 'Set a minimum for the whole store, a higher one for a delivery zone (the higher one applies), or sell a meal a few at a time. The cart says what is missing and holds checkout until the minimum is met.',
        screen: { id: 'minimums', alt: 'The cart showing the minimum order message', caption: 'The cart explains what is missing.' },
      },
      {
        side: 'admin',
        title: 'You set the rules, and the kitchen gets exact combinations',
        body: 'On the Build your own page you set how many of each kind a customer picks, and add the components with their sizes, the price each adds and its recipe. Calories, macros and allergens come from the recipe and your Ingredients list. The kitchen sees each combination on the Production Plan, the labels and the packing slips.',
        screen: { id: 'admin-build-your-own', alt: 'The admin Build your own page with the choices and rules', caption: 'Build-your-own rules in the admin.' },
      },
    ],
    features: ['build_your_own', 'sizes_addons', 'bundles', 'order_minimums'],
    grow: [
      { title: 'Higher order value', body: 'Sizes, add-ons and packs let a customer spend a little more each time, on meals they already like.' },
      { title: 'Fewer orders that cost more to deliver than they earn', body: 'A minimum order, by store or by delivery zone, keeps very small orders from eating your margin.' },
      { title: 'Less back-and-forth', body: 'Customers customize on their own and see the price and nutrition right away, and you get an exact list instead of a text thread.' },
    ],
    demo: [
      { label: 'Build Your Own Bowl', path: '/menu', side: 'customer' },
      { label: 'Meal packs', path: '/menu/meal-packs', side: 'customer' },
      { label: 'Build-your-own rules', path: '/admin/build-your-own', side: 'admin' },
      { label: 'What was ordered, by size and add-on', path: '/admin/variations', side: 'admin' },
    ],
    faq: [
      { id: 'kitchen-sees', question: 'Does my kitchen see exactly what each customer built?', answer: 'Yes. Each combination, size and add-on appears on the Production Plan, the labels and the packing slips, and the Variations page counts how many of each size, add-on and component were ordered for a delivery week.' },
      { id: 'allergens-nutrition', question: 'Do allergens and nutrition update when a customer builds a meal?', answer: 'Yes. The totals and the allergens come from the recipe and your Ingredients list, so check those before you offer a component. They update as the customer chooses, and an add-on that brings a new allergen says so.' },
      { id: 'plans-addons', question: 'Can weekly plans use sizes and add-ons?', answer: 'No. Weekly plans take each meal\'s standard size without add-ons. Sizes and add-ons are for one-off orders.' },
      { id: 'minimums-pickup', question: 'Does the minimum order apply to pickup too?', answer: 'The store minimum applies to every order, pickup included. A delivery zone can have a higher minimum, and then the higher one applies. Weekly plans are not affected.' },
    ],
    related: ['kitchen-operations', 'labels', 'subscriptions'],
  },
  {
    slug: 'delivery-and-pickup',
    navTitle: 'Delivery and pickup',
    eyebrow: 'Delivery and pickup',
    title: 'Meal Prep Delivery Route Planning, Zones, Pickup and Packing Slips',
    intro:
      'ZIP code zones with their own day and fee, route sheets with stops in a sensible order, pickup spots and a packing slip for every bag.',
    card: 'ZIP zones, delivery days and deadlines, pickup locations, route sheets and packing slips.',
        problem: [
      'Delivery day is chaos. I am sorting addresses in a spreadsheet, texting drivers the order of stops and writing names on bags, and people outside my area keep ordering and then ask for a refund.',
      'I need the system to know where I deliver, when, and what it costs, and to hand my driver a list.',
    ],
    how: [
      {
        side: 'customer',
        title: 'Customers find out right away if you deliver to them',
        body: 'At checkout the customer\'s ZIP code finds their delivery zone: its fee, its delivery day and its minimum order. Outside every zone, the customer is told so and offered your pickup locations instead.',
        screen: { id: 'checkout-zone', alt: 'Checkout where a ZIP code outside the zones is offered pickup instead', caption: 'A ZIP outside the zones is offered pickup.' },
      },
      {
        side: 'admin',
        title: 'Deadlines, delivery days and zones',
        body: 'On the Delivery page you set your ordering deadline, your delivery days and your free-delivery threshold. Each zone is a list of ZIP codes with its own delivery day, fee, minimum order and free-delivery amount, and checkout uses them automatically.',
        screen: { id: 'admin-delivery', alt: 'The admin Delivery page with the ordering deadline, delivery days and zones', caption: 'Delivery settings and zones.' },
      },
      {
        side: 'admin',
        title: 'Route sheets for the delivery day',
        body: 'Pick a delivery day and its orders are grouped by zone, with each route\'s stops in order from your kitchen (nearest stop next), plus name, phone, address, delivery notes and meal count.',
        points: [
          'Print the route sheets for your driver.',
          'Download a CSV to take into a route-planning app if you want to optimize further.',
          'Open a route in Google Maps (long routes are split into parts, as Google allows).',
        ],
        screen: { id: 'admin-routes', alt: 'The admin Routes page with each route\'s stops in order', caption: 'Routes for one delivery day.' },
      },
      {
        side: 'admin',
        title: 'Pickup locations',
        body: 'List the places customers can collect their meals, like a gym or a studio. Turn one off and it disappears from checkout, while past orders keep its name and address.',
        screen: { id: 'admin-pickup', alt: 'The admin Pickup Locations page', caption: 'Pickup locations.' },
      },
      {
        side: 'admin',
        title: 'A packing slip for every order',
        body: 'One slip per order for whoever packs the bag and the driver: the customer and phone, the delivery address or pickup spot, the day, the route and stop number (in the same order as Routes), the delivery notes, and every meal with its size, choices and add-ons. Print two slips to a page or one.',
        screen: { id: 'admin-packing-slips', alt: 'The admin Packing slips page with a printable slip', caption: 'A packing slip, ready to print.' },
      },
    ],
    features: ['delivery_zones', 'route_sheets', 'pickup_locations', 'packing_slips'],
    grow: [
      { title: 'Less admin time on delivery day', body: 'Routes and packing slips come straight from the week\'s orders, so you are not rebuilding the day by hand.' },
      { title: 'Fewer mistakes at the door', body: 'Slips list the route and stop number in the same order as the route sheet, so the bag, the driver and the list agree.' },
      { title: 'More customers served', body: 'Someone outside your zones is not turned away: they are offered pickup. And each zone can have its own day, fee and minimum, so every area you serve makes sense for you.' },
    ],
    demo: [
      { label: 'Delivery settings and zones', path: '/admin/delivery', side: 'admin' },
      { label: 'Routes', path: '/admin/routes', side: 'admin' },
      { label: 'Pickup locations', path: '/admin/pickup-locations', side: 'admin' },
      { label: 'Packing slips', path: '/admin/packing-slips', side: 'admin' },
    ],
    faq: [
      { id: 'zone-fees', question: 'Can each delivery zone have its own day, fee and minimum?', answer: 'Yes. Each zone is a list of ZIP codes with its own delivery day, fee, minimum order and free-delivery amount. Where the store has a minimum order too, the higher one applies.' },
      { id: 'outside-zone', question: 'What happens if a customer is outside my zones?', answer: 'They are told you do not deliver there and offered your pickup locations instead, so they can still order.' },
      { id: 'route-optimizing', question: 'Does it optimize my routes?', answer: 'It puts each route\'s stops in order starting from your kitchen, nearest stop next. For anything more, download a CSV for a route-planning app or open the route in Google Maps.' },
      { id: 'routes-need-zones', question: 'Do routes need delivery zones to be turned on?', answer: 'Yes. Delivery routes depend on Delivery zones, so turning zones off also turns routes off. Turning a feature off never deletes anything, and turning it back on brings it all back.' },
    ],
    related: ['kitchen-operations', 'labels', 'subscriptions'],
  },
  {
    slug: 'kitchen-operations',
    navTitle: 'Kitchen operations',
    eyebrow: 'Kitchen operations',
    title: 'Meal Prep Kitchen Software: Production Plan, Shopping Lists and Inventory',
    intro:
      'The week\'s orders turn into a prep list and a shopping list by supplier. Track ingredient costs and stock, and run more than one kitchen when you grow.',
    card: 'Production plan, prep and shopping lists, inventory, ingredient costs and suppliers, and more than one kitchen.',
    problem: [
      'I build the prep list from the orders by hand, then guess the grocery order. I either over-buy and throw food out, or run short mid-week.',
      'And I do not really know what each meal costs me, because the prices live in a notebook and a few receipts.',
    ],
    how: [
      {
        side: 'admin',
        title: 'The production plan: what to cook',
        body: 'Pick a delivery week and get the prep list: how many of each meal and portion to make, from that week\'s orders and weekly plans. Skipped and paused weeks are left out. From here you print labels and packing slips for the week.',
        screen: { id: 'admin-production', alt: 'The admin Production Plan with the prep list for a delivery week', caption: 'The Production Plan for one delivery week.' },
      },
      {
        side: 'admin',
        title: 'Shopping lists by supplier',
        body: 'Further down: everything to buy, rounded to how you buy it, with one list per supplier and its estimated cost. With stock recorded, each row shows what the week needs, what is on hand and what to buy. Print it or download it as a spreadsheet.',
        screen: { id: 'shopping', alt: 'The shopping list by supplier with needed, on hand and to buy columns', caption: 'The shopping list, with what is on hand.' },
      },
      {
        side: 'admin',
        title: 'Ingredient costs and suppliers',
        body: 'The Ingredients page holds everything you buy, how you buy it (by the pound, by the case), what it costs, which supplier it comes from and how much you have on hand. Recipes and costs are worked out from this list, and you can add a second supplier and price to compare.',
        screen: { id: 'admin-ingredients', alt: 'The admin Ingredients list with cost, supplier and on-hand amounts', caption: 'Ingredients, suppliers and stock.' },
      },
      {
        side: 'admin',
        title: 'Inventory that follows what you cook',
        body: 'Anything at or below its alert level is listed at the top and marked Low. Stock goes down when you mark a week cooked, never when an order is placed, so an order cancelled before then simply drops out of the plan. Adjust stock with a reason (a delivery received, a count correction, waste or spoilage) and every adjustment is kept in the stock history.',
        screen: { id: 'stock', alt: 'The Ingredients page with low-stock alerts and on-hand amounts', caption: 'Low-stock alerts at the top.' },
      },
      {
        side: 'admin',
        title: 'More than one kitchen',
        body: 'Each kitchen has its own address (where its routes start), ordering deadline and delivery days, delivery zones, pickup spots and the meals it offers. Customers are matched to a kitchen by their address or pickup spot, and each kitchen keeps its own stock. With one kitchen you see none of this. The screen is from the demo\'s Established sample business, which has two.',
        screen: { id: 'locations', alt: 'The admin Locations page with two kitchens and their zones', caption: 'Two kitchens, each with its own schedule and menu.' },
      },
    ],
    features: ['production_planning', 'ingredient_costs', 'inventory', 'multi_location'],
    grow: [
      { title: 'Less waste', body: 'You buy for the week\'s actual orders, with what is already on your shelves taken into account, instead of guessing.' },
      { title: 'Know what a meal costs you', body: 'Ingredient costs and suppliers sit behind every recipe, so you can see the food cost of a meal before you set its price.' },
      { title: 'Less admin time', body: 'The prep list, the shopping list and the labels all come from the same orders, so you stop retyping the week.' },
      { title: 'Room to grow', body: 'When a second kitchen makes sense, it has its own schedule, zones and stock, and your reports can show one kitchen or all of them.' },
    ],
    demo: [
      { label: 'Production plan', path: '/admin/production', side: 'admin' },
      { label: 'Ingredients, costs and stock', path: '/admin/ingredients', side: 'admin' },
      { label: 'Locations', path: '/admin/locations', side: 'admin' },
    ],
    faq: [
      { id: 'skipped-weeks', question: 'Does the plan leave out skipped and paused weekly plans?', answer: 'Yes. The prep list is built from that week\'s orders and the weekly plans that are actually delivering. Skipped and paused weeks are left out.' },
      { id: 'when-stock-drops', question: 'When does stock go down?', answer: 'When you mark a week cooked. Then the exact amounts on that week\'s shopping list come off stock, once, and Undo cooked puts them back. Nothing comes off when an order is placed.' },
      { id: 'supplier-lists', question: 'Can I send each supplier their own list?', answer: 'The shopping list is split by supplier, with an estimated cost for each. You can print it or download it as a spreadsheet.' },
      { id: 'need-two-kitchens', question: 'Do I need more than one kitchen to use this?', answer: 'No. Production planning, costs and inventory work with one kitchen. More than one kitchen is a separate feature, in the Pro plan, for when you grow into it.' },
    ],
    related: ['delivery-and-pickup', 'labels', 'reports-and-insights'],
  },
  {
    slug: 'labels',
    navTitle: 'Labels and use-by dates',
    eyebrow: 'Labels and use-by dates',
    title: 'Meal Prep Labels with Nutrition Facts and Use-By Dates',
    intro:
      'Print a label for every meal from your own menu data: nutrition panel, ingredients, allergens, packed and use-by dates. You review them before you use them.',
    card: 'Printable labels with nutrition facts, ingredients, allergens and use-by dates, from your own menu data.',
        problem: [
      'Labels eat my Sunday. I retype the ingredients and calories for every meal, and I am never sure the use-by date is right by the time it is on the container.',
      'I want labels that come from the same recipes as my menu, in the size my printer takes.',
    ],
    how: [
      {
        side: 'admin',
        title: 'Print the week\'s labels in the size you use',
        body: 'From the Production Plan, print a label for every meal to cook that week, or for one meal, or one per order with the customer\'s name. Choose 2 by 4 inch or 3 and one-third by 4 inch sheets (Avery 5163/8163 and 5164/8164), or 4 by 6 inch thermal labels, and see the print preview first.',
        screen: { id: 'admin-labels', alt: 'The admin Labels page with size options, a production date and a print preview', caption: 'Choose a size, see the preview, print.' },
      },
      {
        side: 'admin',
        title: 'What is on each label',
        body: 'Your name and logo, the meal and portion, a nutrition panel, the ingredients, a Contains line for the major allergens (and Possible lines for sauces you buy in), packed and use-by dates, and storage and reheating.',
        screen: { id: 'label-sheet', alt: 'A printed label sheet with nutrition facts, ingredients, allergens and packed and use-by dates', caption: 'Sample labels from the demo.' },
      },
      {
        side: 'admin',
        title: 'Dates come from your own shelf life',
        body: 'You set each meal\'s shelf life. Labels print the production day as Packed, and Use by counts from it, with the production day as day one. Your kitchen sets both, and the label states the date you give.',
      },
      {
        side: 'admin',
        title: 'Labels come from your data, for you to review',
        body: 'Labels are generated from each meal\'s data: its nutrition, ingredients and allergens. Review them before you use them, and check them against your recipes and the labels of anything you buy in. You are responsible for what is on your labels.',
      },
    ],
    features: ['labels'],
    grow: [
      { title: 'Less admin time', body: 'Nothing is retyped: the label comes from the same meal data as your menu and your production plan.' },
      { title: 'One source of truth', body: 'When you change a recipe or an ingredient, the nutrition, allergens and label change with it, instead of three documents drifting apart.' },
      { title: 'Customers see what they are eating', body: 'The same nutrition, ingredients and allergens are on each meal\'s page, so what is on the container matches what they ordered.' },
    ],
    demo: [
      { label: 'Labels', path: '/admin/labels', side: 'admin' },
      { label: 'Production plan (where labels print from)', path: '/admin/production', side: 'admin' },
    ],
    faq: [
      { id: 'label-sizes', question: 'What label sizes can I print?', answer: 'Avery sheets at 2 by 4 inches (10 a sheet) or 3 and one-third by 4 inches (6 a sheet), or 4 by 6 inch thermal labels, one per label. You see a print preview first.' },
      { id: 'where-data-comes-from', question: 'Where do the nutrition numbers and allergens on a label come from?', answer: 'From your own meal data: the recipe, your Ingredients list and the allergens you have listed. The system generates the label from it, and you review it before you use it.' },
      { id: 'label-responsibility', question: 'Does this make my labels correct for me?', answer: 'No. The labels are built from your data for you to review, not legal or regulatory advice. Check them against your recipes and the labels of anything you buy in, and ask whoever advises you on labeling rules if you are unsure.' },
      { id: 'per-order-labels', question: 'Can I print a label for each order with the customer\'s name?', answer: 'Yes. You can print a label for every meal to cook, one meal\'s labels, or one per order with the customer\'s name.' },
    ],
    related: ['kitchen-operations', 'delivery-and-pickup', 'bigger-orders'],
  },
  {
    slug: 'loyalty-and-referrals',
    navTitle: 'Loyalty and word of mouth',
    eyebrow: 'Loyalty and word of mouth',
    title: 'Meal Prep Loyalty Points, Referrals, Gift Cards and Coupons',
    intro:
      'Reward the customers who keep coming back, let your best ones bring friends, sell gift cards, and run discount codes without a spreadsheet.',
    card: 'Reward points, referrals, gift cards and coupons that bring customers back and bring friends.',
        problem: [
      'My best marketing is word of mouth, but I cannot track it. I hand out discounts in DMs and have no idea who sent whom or what it cost me.',
      'I would also love to sell gift cards, and not have to make up a code by hand every time.',
    ],
    how: [
      {
        side: 'customer',
        title: 'Reward points customers can spend',
        body: 'Customers earn points on orders and spend them later. Meal pages show the points an order earns, and customers see their balance on their account page.',
      },
      {
        side: 'admin',
        title: 'Referrals, with a reward for both sides',
        body: 'Every customer has a code and a link to share. A friend who signs up with it and pays for a first order earns a reward for both of them: a coupon, store credit or points, as you choose. If that order is refunded in full, both rewards are taken back.',
        points: [
          'Choose what the referrer and the friend each get, how long reward coupons last, and limits per referrer a month and in all.',
          'A referral is blocked when a customer tries their own code, or the friend uses the referrer\'s email, card or delivery address, and the reason is shown.',
        ],
        screen: { id: 'admin-referrals', alt: 'The admin Referrals page with rewarded, pending and blocked referrals', caption: 'Referrals and where each one stands. Sample history.' },
      },
      {
        side: 'customer',
        title: 'Gift cards for any amount',
        body: 'Customers buy a gift card for someone else with a message and a send date. It is redeemed at checkout, alone or with a coupon (your choice), and whatever is not spent stays on the card. On your own site the buyer pays by card through Stripe and the recipient gets the code by email on the send date.',
        screen: { id: 'store-gift-cards', alt: 'The storefront gift card page with amounts, recipient and send date', caption: 'The gift card page.' },
      },
      {
        side: 'admin',
        title: 'Every gift card and its history',
        body: 'See who each card is for, its balance and its history. Issue a card by hand (a comp, a prize), change a balance or disable a lost card, each with a note, all in the Audit Log.',
        screen: { id: 'admin-gift-cards', alt: 'The admin Gift Cards page with balances and history', caption: 'Gift cards in the admin.' },
      },
      {
        side: 'admin',
        title: 'Coupon codes with limits',
        body: 'A percentage or an amount off, with a limit on uses and an end date. Customers enter the code at checkout.',
        screen: { id: 'admin-coupons', alt: 'The admin Coupons list', caption: 'Coupons.' },
      },
    ],
    features: ['coupons', 'gift_cards', 'loyalty_points', 'referrals'],
    grow: [
      { title: 'More repeat customers', body: 'Points give people a reason to come back next week, and a balance they do not want to leave unused.' },
      { title: 'New customers from people who already like you', body: 'Referrals reward both sides, and only after the friend pays for a first order, so you are not giving away rewards for sign-ups that never order.' },
      { title: 'Money up front, and new faces', body: 'Gift cards bring in cash before the meals are cooked and put your food in front of someone who has not tried it.' },
      { title: 'Less admin time', body: 'Codes, balances and rewards are tracked for you, with every change recorded.' },
    ],
    demo: [
      { label: 'A customer\'s points and referral code', path: '/account', side: 'customer' },
      { label: 'The gift card page', path: '/gift-cards', side: 'customer' },
      { label: 'Referrals', path: '/admin/referrals', side: 'admin' },
      { label: 'Gift cards', path: '/admin/gift-cards', side: 'admin' },
      { label: 'Coupons', path: '/admin/coupons', side: 'admin' },
    ],
    faq: [
      { id: 'when-rewarded', question: 'When is a referral reward given?', answer: 'When the friend\'s first order is paid. If that order is later refunded in full, both rewards are taken back. In the demo the referrals are sample history, and nothing is paid.' },
      { id: 'referral-fraud', question: 'Can customers cheat the referral program?', answer: 'The system blocks the usual ways: using your own code, or a friend who shares the referrer\'s email, card or delivery address. A blocked referral shows the reason. For the same-card check it keeps only Stripe\'s own fingerprint of the card, never card details.' },
      { id: 'gift-card-coupons', question: 'Can a gift card be used together with a coupon?', answer: 'That is your choice. There is a setting for whether a gift card can be used with a coupon.' },
      { id: 'choose-reward', question: 'Can I choose what the reward is?', answer: 'Yes. For referrals the referrer and the friend can each get a one-time coupon (a percent or dollar amount off), store credit or points, and you set how long reward coupons last and the limits per referrer.' },
    ],
    related: ['reviews-and-surveys', 'subscriptions', 'reports-and-insights'],
  },
  {
    slug: 'reviews-and-surveys',
    navTitle: 'Reviews and customer feedback',
    eyebrow: 'Reviews and customer feedback',
    title: 'Meal Reviews and Customer Surveys for Meal Prep Businesses',
    intro:
      'Customers rate meals, you approve what shows on your menu, and a short survey after each delivery tells you how the week really went.',
    card: 'Meal reviews you approve, and a four-question survey after each order.',
        problem: [
      'I get great feedback in DMs and then it disappears. And the one bad week I only hear about when somebody cancels.',
      'I would like reviews on my menu without strangers posting whatever they want, and a quick pulse after every delivery.',
    ],
    how: [
      {
        side: 'admin',
        title: 'Reviews appear only after you approve them',
        body: 'Customers rate and review a meal. A review shows on that meal\'s page only after you approve it, and every decision is recorded in the Audit Log.',
        screen: { id: 'admin-reviews', alt: 'The admin Reviews page with a pending review to approve or reject', caption: 'A pending review waiting for approval.' },
      },
      {
        side: 'customer',
        title: 'A four-question survey after each order',
        body: 'Once an order is delivered or picked up, its customer can answer four quick questions: overall, the food, the delivery or pickup, and whether they would recommend you, with an optional comment. One answer per order, and only you see it.',
        screen: { id: 'survey', alt: 'The customer survey page with four rating questions', caption: 'The survey, as the customer sees it.' },
      },
      {
        side: 'admin',
        title: 'The answers, by week',
        body: 'Pick your dates and see how many answered and the response rate, the average ratings for overall, food and delivery or pickup, the share who would recommend you, the same by week, and every comment with its order and customer. A CSV downloads one row per answer. Surveys are separate from meal reviews.',
        screen: { id: 'admin-surveys', alt: 'The admin Customer surveys page with ratings by week and comments', caption: 'Survey results. Sample data from the demo.' },
      },
    ],
    features: ['reviews', 'surveys'],
    grow: [
      { title: 'Trust for new customers', body: 'Approved reviews on a meal\'s page help someone who has never ordered pick with more confidence.' },
      { title: 'Problems caught early', body: 'Delivery and pickup ratings by week show where a week slipped, before it becomes a cancellation.' },
      { title: 'Know what to keep making', body: 'Reviews tell you which meals customers rave about, so your menu follows what they like.' },
    ],
    demo: [
      { label: 'A customer\'s orders, with the survey link', path: '/account', side: 'customer' },
      { label: 'Reviews', path: '/admin/reviews', side: 'admin' },
      { label: 'Customer surveys', path: '/admin/surveys', side: 'admin' },
    ],
    faq: [
      { id: 'moderation', question: 'Can I choose which reviews show on my menu?', answer: 'Yes. A review appears on a meal\'s page only after you approve it, and you can reject it instead.' },
      { id: 'survey-sent', question: 'Do customers get the survey automatically?', answer: 'On your own site we set up the email that links the survey after delivery, and customers also find it in their order history. The link works only for the customer who placed the order.' },
      { id: 'survey-private', question: 'Who can see the survey answers?', answer: 'Only you. Customers answer once per order, and the answers are separate from the public meal reviews.' },
      { id: 'survey-export', question: 'Can I download the answers?', answer: 'Yes. The surveys page has a CSV that downloads one row per answer for the dates you choose.' },
    ],
    related: ['loyalty-and-referrals', 'reports-and-insights', 'ai-tools'],
  },
  {
    slug: 'reports-and-insights',
    navTitle: 'Reports and insights',
    eyebrow: 'Reports and insights',
    title: 'Meal Prep Analytics: Repeat Rate, Churn, CSV Exports and Sales Tax Reports',
    intro:
      'See sales, your best-selling meals, repeat customers and churn, and download your data as CSV for your accountant, any time.',
    card: 'Analytics, repeat rate and churn, CSV exports and a sales tax report.',
        problem: [
      'When I wonder whether the business is growing, or tax time comes, I am in spreadsheets. I could not tell you my repeat customers, who is leaving, or which meal really sells best.',
      'I want the numbers where I run the business, explained in plain words.',
    ],
    how: [
      {
        side: 'admin',
        title: 'Analytics, in plain words',
        body: 'Revenue, orders, customers and your best-selling meals, week by week and month by month. Further down: weekly-plan subscribers, skips, pauses and cancellations by week. Tiles for repeat rate and churn each have a What this means link to a glossary that explains every number.',
        screen: { id: 'admin-analytics', alt: 'The admin Analytics page with revenue, orders, churn and top meals', caption: 'Analytics. Sample data from the demo.' },
      },
      {
        side: 'admin',
        title: 'Your data as CSV, any time',
        body: 'Download orders (one row per meal line), customers, weekly plans, stock on hand and stock movements as CSV files for Excel, Google Sheets or your accountant. Exporting changes nothing, and the customers file has no passwords or payment details.',
        screen: { id: 'admin-exports', alt: 'The admin Exports page with CSV downloads', caption: 'Exports.' },
      },
      {
        side: 'admin',
        title: 'A sales tax report from what Stripe recorded',
        body: 'A record of the tax Stripe recorded on your paid and fulfilled orders, by day, week or month, with totals and a CSV. The system does not work out tax itself: with Stripe Tax turned on in your Stripe account, each order\'s tax is kept as Stripe charged it. It is a record of your orders, not tax advice. The amounts in the demo are made-up sample data.',
        screen: { id: 'admin-sales-tax', alt: 'The admin Sales tax report by week', caption: 'The sales tax report. Made-up sample data.' },
      },
    ],
    features: ['reports', 'analytics'],
    grow: [
      { title: 'More repeat customers', body: 'Repeat rate, churn and the weekly skips, pauses and cancellations show when regulars start to drift, so you can reach out while it still matters.' },
      { title: 'Decide what to cook and what to drop', body: 'Top meals over the last twelve months tell you what to keep, push or retire.' },
      { title: 'Less admin time at tax time', body: 'The sales tax record is already grouped by week or month, and your accountant gets the CSV instead of a pile of screenshots.' },
    ],
    demo: [
      { label: 'Analytics', path: '/admin/analytics', side: 'admin' },
      { label: 'Glossary of every number', path: '/admin/glossary', side: 'admin' },
      { label: 'Exports', path: '/admin/exports', side: 'admin' },
      { label: 'Sales tax report', path: '/admin/sales-tax', side: 'admin' },
    ],
    faq: [
      { id: 'repeat-churn', question: 'What do repeat rate and churn mean here?', answer: 'Repeat rate is the share of this year\'s customers who have ordered more than once. Churn is, of the customers who ordered in a month, the share who never ordered again, counted for months at least three months back. The glossary in the admin explains both with examples.' },
      { id: 'tax-calculation', question: 'Does the system calculate sales tax?', answer: 'No. With Stripe Tax turned on in your Stripe account, each order\'s tax is kept as Stripe charged it, and the report lists it by day, week or month. It is a record of your orders, not tax advice.' },
      { id: 'accountant', question: 'Can my accountant use the exports?', answer: 'Yes. Orders, customers, weekly plans, stock and the sales tax report all download as CSV files that open in Excel or Google Sheets.' },
      { id: 'own-data', question: 'Can I take my customer list with me?', answer: 'Yes. Your customer and order data always belongs to your business, and you can export it at any time.' },
    ],
    related: ['subscriptions', 'loyalty-and-referrals', 'kitchen-operations'],
  },
  {
    slug: 'ai-tools',
    navTitle: 'AI tools',
    eyebrow: 'AI tools',
    title: 'AI Tools for Meal Prep Businesses: Customer Chat, Food Photo Styling and Trend Finder',
    intro:
      'A chat that answers customers\' menu questions from your own menu, styling options for your food photos, and ideas for new meals. You stay in charge of all of it.',
    card: 'A customer chat assistant with a Conversations page, food photo styling, and Trend Finder for new meal ideas.',
        problem: [
      'Customers ask me the same menu questions at all hours, and I answer them between batches. Photos of every new dish take forever. And I never know what new meal to add next.',
      'I want help with all three, but I do not want a robot making promises about allergies or putting things on my menu that I did not approve.',
    ],
    how: [
      {
        side: 'customer',
        title: 'A chat on your storefront that answers from your menu',
        body: 'A chat button sits in the corner of every storefront page. Customers ask in their own words, like what chicken meals you have, and it answers from your own menu: the meals that fit, with your prices and an Add button the customer presses themselves. It answers in English or Spanish, following the storefront\'s language, and it cannot place orders, change a plan or promise a discount. When it does not know something it says so and offers to pass the question to you.',
        screen: { id: 'chat-menu', alt: 'The chat assistant answering a menu question with meals, prices and Add buttons', caption: 'The assistant answers from the sample menu.' },
      },
      {
        side: 'customer',
        title: 'Allergy questions go to your kitchen',
        body: 'Any question that mentions allergies gets a plain reminder: if you have a severe allergy, please contact the kitchen directly before ordering. The assistant only repeats the allergens you have listed for a meal. It never says a meal is safe for an allergy, and it does not give medical or diet advice. Talk to the kitchen passes the conversation to you, and name, email and phone are all optional.',
        screen: { id: 'chat-allergy', alt: 'The assistant listing a meal\'s allergens with a reminder to contact the kitchen', caption: 'An allergy question: the listed allergens, and a reminder to contact the kitchen.' },
      },
      {
        side: 'admin',
        title: 'Conversations: what customers ask, and what your menu is missing',
        body: 'Every chat is saved on the Conversations page. Tiles count conversations, how many led to an order of a recommended meal, how many it could not fully answer and how many were passed to the kitchen. Below, what people asked for most and what it could not answer: a quick read on what to add to your menu. Conversations are deleted after the number of days you choose, 90 by default. In the demo the history is invented, and a chat you have in the demo is listed first.',
        screen: { id: 'admin-conversations', alt: 'The admin Conversations page with what customers asked for and what the assistant could not answer', caption: 'Conversations. The history in the demo is invented.' },
      },
      {
        side: 'admin',
        title: 'Food photo styling for your real dishes',
        body: 'Choose the lighting, camera angle, plate or surface, background, color grading (from true to life up to natural, never oversaturated), garnish and shape, starting from a style guide written from your own menu photos. Garnish only ever comes from each dish\'s own ingredients. Every AI photo is checked against the dish\'s ingredients and allergens, and a photo that shows anything that is not in the recipe is not used. A photo that passes still waits for your approval before it appears on your menu. In the public demo the styling options work and making photos is turned off for visitors, since each is a paid call; we show it live on a walkthrough call.',
        screen: { id: 'photo-styling', alt: 'The photo styling options in the admin Settings', caption: 'Photo styling options in Settings.' },
      },
      {
        side: 'admin',
        title: 'Trend Finder: ideas for new meals, with their sources',
        body: 'Choose how many ideas, a focus like high-protein or vegan, and a season. Each idea says why it is trending and links the recent articles that show it, from at least two publications, with their dates. Show details lists every ingredient with its nutrition and cost, and anything it estimates is marked for you to confirm. Accept turns an idea into a draft meal that stays hidden from customers until you review it and publish it. The demo shows saved results from real searches; on your own site it searches the web live.',
        screen: { id: 'trend-idea', alt: 'A Trend Finder idea with why it is trending and its sources', caption: 'A Trend Finder idea with its sources.' },
      },
    ],
    features: ['ai_assistant', 'ai_photos', 'trend_finder'],
    grow: [
      { title: 'Fewer repeat questions answered by hand', body: 'The chat handles the menu questions and passes you only the ones it cannot answer, with the contact details the customer chose to leave.' },
      { title: 'A list of what your menu is missing', body: 'The questions it could not answer are a plain list of what customers want that you do not offer yet.' },
      { title: 'More menu ideas, without guessing', body: 'Trend Finder brings sourced ideas with ingredients and costs, and you decide what becomes a meal.' },
      { title: 'Photos that match your menu', body: 'Styling options keep new photos in the style of the ones you already have, and nothing goes live without your approval.' },
    ],
    demo: [
      { label: 'Open the menu and click Ask our AI assistant', path: '/menu', side: 'customer' },
      { label: 'Conversations', path: '/admin/conversations', side: 'admin' },
      { label: 'Photo styling options', path: '/admin/settings', side: 'admin' },
      { label: 'Meals, with Find trending meals', path: '/admin/meals', side: 'admin' },
    ],
    faq: [
      { id: 'safe-claims', question: 'Will the assistant tell a customer a meal is safe for their allergy?', answer: 'No. It only repeats the allergens you have listed for a meal and always adds a reminder to contact the kitchen directly before ordering. It does not say a meal is safe, and it does not give medical or diet advice.' },
      { id: 'place-orders', question: 'Can the assistant take orders or give discounts?', answer: 'No. It cannot place orders, change a plan or promise a discount. It shows meals with your prices and an Add button the customer presses themselves.' },
      { id: 'spanish-chat', question: 'Does the chat work in Spanish?', answer: 'Yes. It answers in English or Spanish, following the language of the storefront.' },
      { id: 'demo-limits', question: 'Why does the demo limit how many questions I can ask?', answer: 'In the demo it is a live AI assistant answering from the sample menu, and each visitor gets a few questions a day. At the limit it says so, and a walkthrough call shows more.' },
      { id: 'approve-photos', question: 'Do AI photos go on my menu on their own?', answer: 'No. Each photo is checked against the dish\'s ingredients and allergens, and one that passes still waits for your approval. The check catches visible extras only, so you stay responsible for your menu and labels.' },
    ],
    related: ['reviews-and-surveys', 'bilingual-and-app', 'reports-and-insights'],
  },
  {
    slug: 'bilingual-and-app',
    navTitle: 'Bilingual storefront and installable app',
    eyebrow: 'Bilingual storefront and installable app',
    title: 'Bilingual Meal Prep Website in English and Spanish, Installable on a Phone',
    intro:
      'Your store and your admin area in English and Spanish with a one-tap switch, and a store customers can add to their phone\'s home screen like an app.',
    card: 'An English and Spanish storefront and admin, and a store customers can install like an app.',
        problem: [
      'A lot of my customers would rather order in Spanish, and nearly all of them order from their phone. I do not want two websites, and I do not want to pay for an app that has to be approved by an app store.',
    ],
    how: [
      {
        side: 'customer',
        title: 'One tap between English and Spanish',
        body: 'Customers switch with EN | ES at the top of any page, and the whole storefront changes. Their choice sticks, and a link that ends in ?lang=es opens the store in Spanish, so you can send it straight to a Spanish-speaking customer.',
        screen: { id: 'store-plans', forceLang: 'es', alt: 'The plans page of the demo storefront in Spanish', caption: 'The same plans page, in Spanish.' },
      },
      {
        side: 'admin',
        title: 'Your admin in both languages too',
        body: 'The admin has its own EN | ES switch, so your staff can work in the language they are most comfortable in. The billing-change emails to customers go out in each customer\'s language.',
        screen: { id: 'admin-delivery', forceLang: 'es', alt: 'The Delivery page of the demo admin in Spanish', caption: 'The admin Delivery page, in Spanish.' },
      },
      {
        side: 'admin',
        title: 'You choose when Spanish goes live',
        body: 'On a new store Spanish starts switched off: the store opens in English, with no EN | ES switch, until you turn Spanish on in Settings > Features. The demo has it on so you can see both. Meal names and descriptions stay as you enter them.',
      },
      {
        side: 'customer',
        title: 'Install it like an app',
        body: 'After their first order, customers are offered to add your store to their home screen. It opens like an app, with your name and icon, and loads fast on repeat visits. On iPhone the two steps are shown (Share, then Add to Home Screen), since Safari has no install button. There is no app store to go through, and checkout always needs a connection.',
        screen: { id: 'phone-plan', alt: 'A customer\'s plan page on a phone', caption: 'Built for phones: the plan page on a small screen.' },
      },
    ],
    features: ['spanish', 'pwa'],
    grow: [
      { title: 'Reach customers who prefer Spanish', body: 'They get the whole store in their language without a second website for you to maintain.' },
      { title: 'More repeat orders, with less effort for the customer', body: 'A home-screen icon with your name on it is one tap from the menu, which makes coming back easier.' },
      { title: 'No app store', body: 'Customers install from the browser, so there is nothing to submit, approve or keep updated in an app store.' },
    ],
    demo: [
      { label: 'The storefront in Spanish', path: '/menu', side: 'customer' },
      { label: 'The admin (use EN | ES at the top)', path: '/admin', side: 'admin' },
      { label: 'Settings > Features, where Spanish is switched on', path: '/admin/settings?tab=features', side: 'admin' },
    ],
    faq: [
      { id: 'what-is-translated', question: 'What is available in both languages?', answer: 'The storefront, the admin area and the billing-change emails to customers. The meal names and descriptions you enter stay as you write them; tell us if you want them in both languages.' },
      { id: 'need-app-store', question: 'Do my customers need an app store?', answer: 'No. They add your store to their phone\'s home screen from the browser. It opens like an app with your name and icon.' },
      { id: 'offline', question: 'Does ordering work without a connection?', answer: 'The store loads fast on repeat visits, but checkout always needs a connection.' },
      { id: 'spanish-off', question: 'Why does Spanish start switched off on a new store?', answer: 'So you decide when it goes live. The store opens in English with no EN | ES switch until you turn Spanish on in Settings > Features.' },
    ],
    related: ['ai-tools', 'subscriptions', 'getting-started'],
  },
  {
    slug: 'getting-started',
    navTitle: 'Getting started',
    eyebrow: 'Getting started',
    title: 'Done-for-You Meal Prep Ordering Setup and Customer Migration',
    intro:
      'We set it up for you, move your menu and customers over, and put it on your own domain and your own Stripe account. You do not have to learn software or start from zero.',
    card: 'Done-for-you setup, moving your customers over, and owning your data, domain and Stripe account.',
        problem: [
      'I do not have time to learn new software, set up payments and move my customers over, and I am afraid of losing people in the switch.',
      'I also do not want to hand my customer list and my business to a platform that charges me on every order.',
    ],
    how: [
      {
        side: 'setup',
        title: 'A free intro call',
        body: 'We talk about your menu, how you take orders today and what you would like to change. You can try the demo first with your own name, logo and colors: the Try it with your brand panel shows the whole site as yours.',
        screen: { id: 'brand', alt: 'The demo storefront with a different business name and colors', caption: 'The demo with a business name and colors changed in the brand panel.' },
      },
      {
        side: 'setup',
        title: 'We set it up for you',
        body: 'We configure your name, logo and colors, your menu, your delivery zones and days, your plans and your payments, so you start with a working store instead of an empty one.',
      },
      {
        side: 'setup',
        title: 'We move your customers and your menu',
        body: 'During setup we move your existing customer and menu data for you, from spreadsheets and other systems. A menu in an online store export can be imported directly. Nutrition and allergens that are not in the export are flagged for you to fill in, never guessed. Your customers keep ordering from you without interruption, and we plan the switch-over date with you.',
      },
      {
        side: 'admin',
        title: 'Turn features on as you grow',
        body: 'There are three plans, and we set yours. In Settings > Features you choose which of its features are on, so you can start simple and turn more on when you are ready. Turning one off never deletes its data.',
        screen: { id: 'admin-settings-features', alt: 'The admin Settings Features tab with switches grouped by plan', caption: 'Settings > Features, grouped by plan.' },
      },
      {
        side: 'setup',
        title: 'It stays yours',
        body: 'Your customer and order data, your domain name and your Stripe account are in your name, and you can take them with you at any time. Payments go to your own Stripe account, and there is no per-order platform fee from us.',
      },
    ],
    features: [],
    grow: [
      { title: 'Switch without losing customers', body: 'We plan the switch-over date with you, and your customers keep ordering from you while we move things.' },
      { title: 'Less admin time from day one', body: 'You are not learning a new system on top of running a kitchen. We do the setup and the move.' },
      { title: 'A business you own', body: 'Your customer list, your domain and your payment account stay in your name, so you can grow without being locked in.' },
    ],
    demo: [
      { label: 'The storefront (open Try it with your brand)', path: '/menu', side: 'customer' },
      { label: 'Settings > Features', path: '/admin/settings?tab=features', side: 'admin' },
    ],
    faq: [
      { id: 'who-sets-up', question: 'Who sets it up?', answer: 'We do. We are based in Jacksonville, Florida, and we work with small and mid-sized meal prep operators in English and Spanish. You tell us how your business works, and we configure the system for it.' },
      { id: 'bring-customers', question: 'Can you bring my customers and menu over?', answer: 'Yes. We move your existing customer and menu data during setup, from spreadsheets and other systems. Nutrition and allergens that are missing are flagged for you to fill in, never guessed, and we plan the switch-over date with you.' },
      { id: 'own-it', question: 'Do I own my data, my domain and my Stripe account?', answer: 'Yes. They are in your name from the start, and you can export your data and take them with you at any time.' },
      { id: 'fees', question: 'Is there a fee on every order?', answer: 'There is no per-order platform fee from us. Stripe\'s own processing fees apply to card payments, as they would anywhere.' },
      { id: 'start', question: 'How do I get started?', answer: 'Call (904) 822-8929 or talk to Alex from the button on this page. You can also read the demo guide first.' },
    ],
    related: ['subscriptions', 'kitchen-operations', 'bilingual-and-app'],
  },
];
