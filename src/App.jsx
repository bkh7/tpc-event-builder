import React, { useState } from "react";

const SERVICE_RATE = 0.20;
const SALES_TAX = 0.06;

const HOSTED_BAR_LEVELS = [
  { key: "beerWine", label: "Beer & Wine", price: 16 },
  { key: "house", label: "House", price: 20 },
  { key: "call", label: "Call", price: 22 },
  { key: "premium", label: "Premium", price: 24 },
];

const PLATED_ENTREES = [
  { key: "tuscan", label: "Tuscan Chicken", price: 24.95 },
  { key: "marsala", label: "Chicken Marsala", price: 23.95 },
  { key: "sirloin", label: "Pinnacle Sirloin", price: 31.95 },
  { key: "primeRib10", label: "Roasted Prime Rib 10oz", price: 37.95 },
  { key: "tenderloin", label: "Tenderloin Filet", price: 42.95 },
  { key: "sunDriedTomatoSalmon", label: "Creamy Sundried Tomato Salmon", price: 24.95 },
  { key: "veganPotRoast", label: "Vegan Pot Roast (VG)", price: 22.95 },
];

const BUFFET_OPTIONS = [
  { key: "pinnacleBuffet", label: "Pinnacle Buffet", price: 32.95 },
  { key: "bbqBuffet", label: "BBQ Dinner Buffet", price: 32.95 },
  { key: "carvedTurkey", label: "Carved Turkey Buffet", price: 35.95 },
  { key: "primeRibCarved", label: "Prime Rib Carved Buffet", price: 42.95 },
];

const APP_OPTIONS = [
  { key: "passedApps", label: "Passed Appetizers (choose 3)", price: 6.95 },
  { key: "charcuterie", label: "Charcuterie Table", price: 9.00 },
];

const REFRESH_PP = [
  { key: "coffeeBar", label: "Deluxe Coffee Bar (pp)", price: 2.00 },
  { key: "hotChocolate", label: "Hot Chocolate Bar (pp)", price: 3.50 },
];
const REFRESH_GAL = [
  { key: "fruitPunch", label: "Fruit Punch (gal)", price: 23.00 },
  { key: "strawberryLemonade", label: "Strawberry Lemonade (gal)", price: 23.00 },
  { key: "pineappleOrange", label: "Pineapple Orange (gal)", price: 26.00 },
];
const REFRESH_SINGLE = [
  { key: "cannedSoda", label: "Canned Soda (ea)", price: 2.50 },
  { key: "bottledWater", label: "Bottled Water (ea)", price: 2.50 },
  { key: "sparklingWater", label: "Sparkling Water (ea)", price: 3.00 },
  { key: "milkCarton", label: "Milk Carton (ea)", price: 3.50 },
  { key: "sportsDrink", label: "Sports Drink (ea)", price: 3.50 },
];

const WEDDING_ROOM_RENTAL = {
  friEvening: 2000,
  satLuncheon: 1000,
  satEvening: 2500,
  sunAfternoonEvening: 2000,
};

const EVENING_MINIMUMS = {
  friday: { oneBallroom: 3000, bothBallrooms: 6500 },
  saturday: { oneBallroom: 4500, bothBallrooms: 9500 },
};

function RoomMap({ room, setRoom }) {
  const w = 480, h = 200, pad = 12; const rw = w - pad*2, rh = 120; const x = pad, y = pad; const mid = x + rw/2;
  const isFull = room === 'full'; const left = room === 'fountain'; const right = room === 'terrace';
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto border rounded-xl bg-white">
      <rect x={x} y={y} width={rw} height={rh} rx={14} fill="#fafafa" stroke="#111827" />
      <line x1={mid} y1={y} x2={mid} y2={y+rh} stroke="#111827" strokeDasharray="6 4" />
      <rect x={x+2} y={y+2} width={rw/2-4} height={rh-4} fill={isFull||left?"#16a34a":"#e5e7eb"} opacity={isFull?0.35:0.7} onClick={() => setRoom('fountain')} />
      <rect x={mid+2} y={y+2} width={rw/2-4} height={rh-4} fill={isFull||right?"#16a34a":"#e5e7eb"} opacity={isFull?0.35:0.7} onClick={() => setRoom('terrace')} />
      <text x={x+rw/4} y={y+rh/2} textAnchor="middle" fontSize="12" fill="#fff">Fountain / Deck</text>
      <text x={mid+rw/4} y={y+rh/2} textAnchor="middle" fontSize="12" fill="#fff">Terrace / Garden</text>
      <text x={w/2} y={h-10} textAnchor="middle" fontSize="11" fill="#374151">Click to select - Full = toggle below</text>
    </svg>
  );
}

export default function App(){
  const [room, setRoom] = useState('fountain');
  const [eventType, setEventType] = useState('wedding');
  const [slot, setSlot] = useState('friEvening');
  const [guests, setGuests] = useState(150);

  const [mealType, setMealType] = useState('plated');
  const [platedKey, setPlatedKey] = useState('tuscan');
  const [buffetKey, setBuffetKey] = useState('pinnacleBuffet');

  const [apps, setApps] = useState({ passedApps:false, charcuterie:false });
  const [pp, setPP] = useState({ coffeeBar:false, hotChocolate:false });
  const [gal, setGal] = useState({ fruitPunch:0, strawberryLemonade:0, pineappleOrange:0 });
  const [single, setSingle] = useState({ cannedSoda:0, bottledWater:0, sparklingWater:0, milkCarton:0, sportsDrink:0 });

  const [barMode, setBarMode] = useState('hosted');
  const [hostedLevel, setHostedLevel] = useState('beerWine');
  const [bartenders, setBartenders] = useState(0);

  const [bizRoom, setBizRoom] = useState(0);

  const cap = room === 'full' ? 800 : 275;

  const plated = PLATED_ENTREES.find(i=>i.key===platedKey) || null;
  const buffet = BUFFET_OPTIONS.find(i=>i.key===buffetKey) || null;
  const hosted = HOSTED_BAR_LEVELS.find(i=>i.key===hostedLevel) || null;

  const dinnerPP = mealType==='plated' ? (plated ? plated.price : 0) : mealType==='buffet' ? (buffet ? buffet.price : 0) : 0;
  const dinnerSubtotal = mealType==='none' ? 0 : dinnerPP*guests;
  const appsSubtotal = APP_OPTIONS.reduce((s,o)=> s + (apps[o.key]? o.price*guests:0),0);
  const ppSubtotal = REFRESH_PP.reduce((s,o)=> s + (pp[o.key]? o.price*guests:0),0);
  const galSubtotal = Object.entries(gal).reduce((s,[k,v])=> s + (REFRESH_GAL.find(x=>x.key===k)?.price||0)*(+v||0),0);
  const singleSubtotal = Object.entries(single).reduce((s,[k,v])=> s + (REFRESH_SINGLE.find(x=>x.key===k)?.price||0)*(+v||0),0);
  const foodSubtotal = dinnerSubtotal + appsSubtotal + ppSubtotal + galSubtotal + singleSubtotal;
  const service = foodSubtotal * SERVICE_RATE;
  const foodTax = (foodSubtotal + service) * SALES_TAX;

  const autoBart = Math.max(1, Math.ceil(guests/150));
  const barBase = barMode==='hosted' && hosted ? hosted.price*guests : 0;
  const barTax = barMode==='hosted' ? barBase*SALES_TAX : 0;
  const cashFees = barMode==='cash' ? (200 + Math.max(0,(bartenders||autoBart)-1)*100) : 0;

  const roomRental = eventType==='wedding' ? (WEDDING_ROOM_RENTAL[slot]||0) : (bizRoom||0);

  const isEvening = eventType==='wedding' && (slot==='friEvening' || slot==='satEvening');
  let minTarget=0, minShort=0; if(isEvening){
    const which = slot==='friEvening'? EVENING_MINIMUMS.friday : EVENING_MINIMUMS.saturday;
    minTarget = room==='full' ? which.bothBallrooms : which.oneBallroom;
    const toward = roomRental + foodSubtotal;
    minShort = Math.max(0, minTarget - toward);
  }

  const total = roomRental + foodSubtotal + service + foodTax + (barMode==='hosted' ? barBase + barTax : cashFees) + (minShort||0);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold">Pinnacle Center - Event Builder (Lite)</h1>
          <p className="text-sm text-gray-600">Fast-loading estimator. For advanced options, use the full builder.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-3">
            <RoomMap room={room} setRoom={setRoom} />
            <div className="flex gap-2">
              <select className="border rounded p-2" value={room} onChange={(e)=>setRoom(e.target.value)}>
                <option value="fountain">Fountain (Deck)</option>
                <option value="terrace">Terrace (Garden)</option>
                <option value="full">Full Ballroom</option>
              </select>
              <div className="text-xs text-gray-600 self-center">Cap: {cap}</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Guests: {guests}</label>
              <input type="range" min={10} max={800} value={guests} onChange={(e)=>setGuests(+e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Event Type</label>
              <select className="border rounded p-2 w-full" value={eventType} onChange={(e)=>setEventType(e.target.value)}>
                <option value="wedding">Wedding Reception</option>
                <option value="business">Business / Social</option>
              </select>
              {eventType==='wedding' ? (
                <select className="border rounded p-2 w-full mt-2" value={slot} onChange={(e)=>setSlot(e.target.value)}>
                  <option value="friEvening">Friday Evening</option>
                  <option value="satLuncheon">Saturday Lunch</option>
                  <option value="satEvening">Saturday Evening</option>
                  <option value="sunAfternoonEvening">Sunday Aft/Eve</option>
                </select>
              ) : (
                <input type="number" className="border rounded p-2 w-full mt-2" min={0} placeholder="Room / amenities charge" value={bizRoom} onChange={(e)=>setBizRoom(+e.target.value||0)} />
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Meal Service</label>
              <select className="border rounded p-2 w-full" value={mealType} onChange={(e)=>setMealType(e.target.value)}>
                <option value="plated">Plated</option>
                <option value="buffet">Buffet</option>
                <option value="none">No Dinner</option>
              </select>
            </div>

            {mealType==='plated' && (
              <div className="space-y-1">
                <label className="text-sm">Plated Entree</label>
                <select className="border rounded p-2 w-full" value={platedKey} onChange={(e)=>setPlatedKey(e.target.value)}>
                  {PLATED_ENTREES.map(i=> (
                    <option key={i.key} value={i.key}>{i.label} — ${i.price.toFixed(2)}</option>
                  ))}
                </select>
              </div>
            )}
            {mealType==='buffet' && (
              <div className="space-y-1">
                <label className="text-sm">Buffet Option</label>
                <select className="border rounded p-2 w-full" value={buffetKey} onChange={(e)=>setBuffetKey(e.target.value)}>
                  {BUFFET_OPTIONS.map(i=> (
                    <option key={i.key} value={i.key}>{i.label} — ${i.price.toFixed(2)}</option>
                  ))}
                </select>
                {guests<30 && (<div className="text-xs text-amber-700">Buffet chosen with fewer than 30 guests: a service fee will apply.</div>)}
              </div>
            )}

            <fieldset className="space-y-1">
              <legend className="text-sm font-medium">Appetizers (per person)</legend>
              {APP_OPTIONS.map(o=> (
                <label key={o.key} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={!!apps[o.key]} onChange={(e)=>setApps({...apps,[o.key]:e.target.checked})} />
                  <span>{o.label} — ${o.price.toFixed(2)}</span>
                </label>
              ))}
            </fieldset>

            <fieldset className="space-y-1">
              <legend className="text-sm font-medium">Refreshments</legend>
              {REFRESH_PP.map(o=> (
                <label key={o.key} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={!!pp[o.key]} onChange={(e)=>setPP({...pp,[o.key]:e.target.checked})} />
                  <span>{o.label} — ${o.price.toFixed(2)}</span>
                </label>
              ))}
              <div className="grid grid-cols-2 gap-2 text-sm">
                {REFRESH_GAL.map(o=> (
                  <label key={o.key} className="flex items-center justify-between gap-2">
                    <span>{o.label}</span>
                    <input type="number" min={0} className="border rounded p-1 w-20" value={gal[o.key]} onChange={(e)=>setGal({...gal,[o.key]:+e.target.value||0})} />
                  </label>
                ))}
                {REFRESH_SINGLE.map(o=> (
                  <label key={o.key} className="flex items-center justify-between gap-2">
                    <span>{o.label}</span>
                    <input type="number" min={0} className="border rounded p-1 w-20" value={single[o.key]} onChange={(e)=>setSingle({...single,[o.key]:+e.target.value||0})} />
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Bar Service (Lite)</label>
              <select className="border rounded p-2 w-full" value={barMode} onChange={(e)=>setBarMode(e.target.value)}>
                <option value="hosted">Hosted (per person)</option>
                <option value="cash">Cash Bar</option>
                <option value="none">No Bar</option>
              </select>
              {barMode==='hosted' && (
                <select className="border rounded p-2 w-full mt-2" value={hostedLevel} onChange={(e)=>setHostedLevel(e.target.value)}>
                  {HOSTED_BAR_LEVELS.map(i=> (
                    <option key={i.key} value={i.key}>{i.label} — ${i.price.toFixed(2)} / person</option>
                  ))}
                </select>
              )}
              {barMode==='cash' && (
                <div className="text-sm">
                  <label className="block">Bartenders (0 = auto)
                    <input type="number" min={0} className="border rounded p-2 w-full mt-1" value={bartenders} onChange={(e)=>setBartenders(+e.target.value||0)} />
                  </label>
                  <div className="text-xs text-gray-600 mt-1">Auto suggestion: {Math.max(1,Math.ceil(guests/150))}</div>
                </div>
              )}
            </div>

            <div className="border rounded-xl p-3 bg-gray-50">
              <div className="flex items-center justify-between text-sm"><span>Room</span><span>${roomRental.toFixed(2)}</span></div>
              <div className="flex items-center justify-between text-sm"><span>Food & Refreshments</span><span>${foodSubtotal.toFixed(2)}</span></div>
              <div className="flex items-center justify-between text-sm"><span>Service (20%)</span><span>${service.toFixed(2)}</span></div>
              <div className="flex items-center justify-between text-sm"><span>Food Tax (6%)</span><span>${foodTax.toFixed(2)}</span></div>
              {barMode==='hosted' && (
                <>
                  <div className="flex items-center justify-between text-sm"><span>Hosted Bar</span><span>${barBase.toFixed(2)}</span></div>
                  <div className="flex items-center justify-between text-sm"><span>Alcohol Tax (6%)</span><span>${barTax.toFixed(2)}</span></div>
                </>
              )}
              {barMode==='cash' && (
                <div className="flex items-center justify-between text-sm"><span>Cash Bar Fees</span><span>${cashFees.toFixed(2)}</span></div>
              )}
              {isEvening && (
                <div className="mt-2 text-xs text-gray-700">
                  Evening Minimum {room==='full'? '(both ballrooms)':'(one ballroom)'}: <strong>${minTarget.toFixed(2)}</strong><br />
                  Current toward min: <strong>${(roomRental+foodSubtotal).toFixed(2)}</strong>
                  {minShort>0? (<div className="text-red-600">Shortfall added: ${minShort.toFixed(2)}</div>):(<div className="text-emerald-700">Minimum satisfied.</div>)}
                </div>
              )}
              <hr className="my-2" />
              <div className="flex items-baseline justify-between">
                <div className="text-sm font-medium">Estimated Total</div>
                <div className="text-2xl font-bold">${total.toFixed(2)}</div>
              </div>
              <button className="mt-2 w-full border rounded p-2 text-sm" onClick={()=>{
                const data = { room, eventType, slot, guests, mealType, plated: (PLATED_ENTREES.find(i=>i.key===platedKey)||{}).label, buffet: (BUFFET_OPTIONS.find(i=>i.key===buffetKey)||{}).label, apps, pp, gal, single, barMode, hostedLevel, bartenders, roomRental, totals:{ foodSubtotal, service, foodTax, barBase, barTax, cashFees, minShort, total } };
                if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
                  navigator.clipboard.writeText(JSON.stringify(data,null,2));
                }
                alert('Lite estimate copied to clipboard as JSON.');
              }}>Copy Estimate (JSON)</button>
            </div>

            <div className="text-xs text-gray-600">
              Prices from your 2025 menus. Service charge 20% on food; 6% MI sales tax.<br />
              Hosted bar is a 4-hour window within a 6-hour event. Cash-bar drink prices include tax; fees shown here.<br />
              Use the full builder for ala carte bar and granular line-items.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
