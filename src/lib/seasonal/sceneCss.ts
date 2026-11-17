// The animation CSS the scenes are written against, ported from the One Source engine.
// Every keyframe below is theirs, unchanged -- the motion is the point of the port, and a
// scene whose `an-fall` means something different here would not be the same scene.
//
// Two things did change, both about where it lives. Their `.sc` is fixed to the corner of
// the viewport; this is a square inside a panel, so the root rules are the inline ones.
// And the selectors are scoped under `.ssc` so nothing here can reach the rest of the page.
//
// Photosensitivity, carried over from their comment: every glow or pulse cycles no faster
// than about every two seconds, and nothing alternates between light and dark.

export const SCENE_CSS = `
.ssc-frame{position:relative;width:100%;aspect-ratio:1;overflow:hidden;--sp:1}
.ssc-layer{position:absolute;inset:0;transition:opacity .6s ease}
/* The layer on its way out mounts already in place, so it needs an animation rather than
   a transition: there is no previous value for a transition to run from. */
.ssc-layer-out{animation:ssc-fade-out .6s ease forwards}
@keyframes ssc-fade-out{from{opacity:1}to{opacity:0}}
.ssc .sc{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;--sp:1}
.ssc .sc svg{display:block;width:100%;height:100%;overflow:visible}
.ssc .sc svg[data-clip]{overflow:hidden}
.ssc .sc svg *{transform-box:view-box}
.ssc .sc .a1{fill:var(--c1)}.ssc .sc .a2{fill:var(--c2)}.ssc .sc .a3{fill:var(--c3)}
.ssc .sc [class*="an-"]{animation-duration:calc(var(--t,4s) / var(--sp,1));animation-delay:calc(var(--dl,0s) / var(--sp,1));animation-iteration-count:infinite;animation-timing-function:ease-in-out}
.ssc .sc .an-k{animation-name:var(--n)}
.ssc .sc .an-glow{animation-name:sc-glow}.ssc .sc .an-sway{animation-name:sc-sway}.ssc .sc .an-bob{animation-name:sc-bob}
.ssc .sc .an-stretch{animation-name:sc-stretch}.ssc .sc .an-fall{animation-name:sc-fall;animation-timing-function:linear}
.ssc .sc .an-flit{animation-name:sc-flit}.ssc .sc .an-flap{animation-name:sc-flap}
.ssc .sc .an-march{animation-name:sc-march;animation-timing-function:linear}
.ssc .sc .an-step{animation-name:sc-step}.ssc .sc .an-steam{animation-name:sc-steam;animation-timing-function:linear}
.ssc .sc .an-draw{animation-name:sc-draw}.ssc .sc .an-rise{animation-name:sc-rise;animation-timing-function:linear}
.ssc .sc .an-spin{animation-name:sc-spin;animation-timing-function:linear}.ssc .sc .an-roll{animation-name:sc-roll;animation-timing-function:linear}
.ssc .sc .an-smoke{animation-name:sc-smoke;animation-timing-function:linear}.ssc .sc .an-dawn{animation-name:sc-dawn;animation-direction:alternate}
.ssc .sc .an-sun{animation-name:sc-sun;animation-direction:alternate}.ssc .sc .an-burst{animation-name:sc-burst;animation-timing-function:ease-out}
.ssc .sc .an-pace{animation-name:sc-pace}.ssc .sc .an-meet{animation-name:sc-meet}.ssc .sc .an-meet2{animation-name:sc-meet2}
.ssc.is-paused .sc *{animation-play-state:paused!important}
@keyframes sc-glow{0%,100%{opacity:.6}50%{opacity:1}}
@keyframes sc-sway{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
@keyframes sc-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(24px)}}
@keyframes sc-stretch{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.5)}}
@keyframes sc-fall{0%{transform:translate(0,-16px) rotate(0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translate(var(--dx,24px),250px) rotate(var(--rot,220deg));opacity:0}}
@keyframes sc-flit{0%,100%{transform:translate(0,0)}25%{transform:translate(-44px,14px)}50%{transform:translate(-86px,-6px)}75%{transform:translate(-42px,-20px)}}
@keyframes sc-flap{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.5)}}
@keyframes sc-march{0%{transform:translateX(-120px);opacity:0}8%{opacity:1}92%{opacity:1}100%{transform:translateX(260px);opacity:0}}
@keyframes sc-step{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.3px)}}
@keyframes sc-draw{0%{stroke-dashoffset:1;opacity:1}55%{stroke-dashoffset:0;opacity:1}85%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}
@keyframes sc-rise{0%{transform:translate(0,0);opacity:0}12%{opacity:.9}88%{opacity:.9}100%{transform:translate(var(--dx,12px),-190px);opacity:0}}
@keyframes sc-spin{to{transform:rotate(360deg)}}
@keyframes sc-roll{0%{transform:translateX(0);opacity:0}8%{opacity:1}86%{transform:translateX(130px);opacity:1}100%{transform:translateX(130px);opacity:0}}
@keyframes sc-smoke{0%{transform:translate(0,0) scale(.8);opacity:0}25%{opacity:.5}100%{transform:translate(8px,-44px) scale(1.5);opacity:0}}
@keyframes sc-dawn{from{stroke:#8d939e}to{stroke:#dca94a}}
@keyframes sc-sun{from{transform:translateY(16px)}to{transform:translateY(-8px)}}
@keyframes sc-burst{0%{transform:scale(.15);opacity:0}12%{opacity:1}100%{transform:scale(1.15);opacity:0}}
@keyframes sc-pace{0%,100%{transform:translateX(0)}50%{transform:translateX(70px)}}
@keyframes sc-meet{0%,100%{transform:translateX(0)}50%{transform:translateX(16px)}}
@keyframes sc-meet2{0%,100%{transform:translateX(0)}50%{transform:translateX(-16px)}}
@keyframes sc-steam{0%{transform:translateY(0);opacity:0}35%{opacity:.55}100%{transform:translateY(-12px);opacity:0}}
@media (prefers-reduced-motion:reduce){.ssc .sc *{animation:none!important}.ssc-layer{transition:none}}
/* The year-round web (SpiderScene.tsx). Their pluck, their hide and their walk cycle,
   with the strand draw-in kept as it is: the web spins itself in, then she sets off. */
.ssc .ssc-spider-root{position:absolute;inset:0}
.ssc .ssc-web{transform-box:view-box;transform-origin:0 100%}
.ssc .ssc-web.is-plucked{animation:ssc-pluck .75s ease-out}
@keyframes ssc-pluck{25%{transform:rotate(.7deg)}55%{transform:rotate(-.45deg)}80%{transform:rotate(.2deg)}}
.ssc .ssc-spider{opacity:0;transition:opacity .6s ease}
.ssc .ssc-spider-root.is-ready .ssc-spider{opacity:1}
.ssc .ssc-spider-body{transition:transform .4s ease,opacity .4s ease;transform-box:fill-box;transform-origin:center}
.ssc .ssc-spider-root.is-hiding .ssc-spider-body{transform:scale(.55);opacity:.55}
@media (prefers-reduced-motion:reduce){.ssc .ssc-spider{opacity:1;transition:none}.ssc .ssc-web{animation:none!important}}
`;
