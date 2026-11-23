'use strict';
const V1_FORM=document.body.dataset.formUrl;
const el=id=>document.getElementById(id);
const player=el('player');
let consented=false, watched=false;
function resetParticipation(){consented=false;watched=false;player.pause();player.removeAttribute('src');player.removeAttribute('poster');player.load();el('google-form').removeAttribute('src');el('form-external').removeAttribute('href');el('video-content').hidden=true;el('form-content').hidden=true;el('video-locked').hidden=false;el('form-locked').hidden=false;el('to-form').disabled=true;el('to-form').textContent='觀看完畢後填寫問卷';el('step-video').removeAttribute('aria-current');el('step-form').removeAttribute('aria-current');}
el('agree').checked=false;
el('agree').addEventListener('change',()=>{el('start').disabled=!el('agree').checked;if(!el('agree').checked){resetParticipation();el('consent-status').textContent='已取消同意，影片與問卷已關閉。';}});
el('start').addEventListener('click',()=>{if(!el('agree').checked)return;consented=true;el('exit-message').hidden=true;el('video-locked').hidden=true;el('video-content').hidden=false;if(!player.hasAttribute('src')){player.src='video/V1.mp4';player.poster='video/V1.jpg';player.load();}el('consent-status').textContent='已同意參與，請往下觀看 V1 影片。';el('video-status').textContent=watched?'影片已播放完畢，您可以繼續填寫問卷。':'請按播放，觀看 V1 影片。';el('step-video').setAttribute('aria-current','step');el('watch').scrollIntoView({block:'start'});});
el('decline').addEventListener('click',()=>{el('agree').checked=false;el('start').disabled=true;resetParticipation();el('exit-message').hidden=false;el('consent-status').textContent='已結束參與。';});
el('reconsider').addEventListener('click',()=>{el('exit-message').hidden=true;el('consent-status').textContent='';el('ethics').scrollIntoView({block:'start'});});
player.addEventListener('ended',()=>{if(!consented)return;watched=true;el('to-form').disabled=false;el('to-form').textContent='開始填寫 V1 問卷';el('video-status').textContent='影片已播放完畢，請按下方按鈕填寫問卷。';});
player.addEventListener('error',()=>{if(consented)el('video-status').textContent='影片暫時無法播放，請檢查網路或重新整理頁面；仍有問題請聯絡研究團隊。';});
el('to-form').addEventListener('click',()=>{if(!consented||!watched)return;el('form-locked').hidden=true;el('form-content').hidden=false;el('form-external').href=V1_FORM;const previewMode=new URL(V1_FORM).pathname.endsWith('/preview');el('google-form').hidden=previewMode;if(!previewMode&&!el('google-form').hasAttribute('src'))el('google-form').src=V1_FORM+'?embedded=true';el('step-video').removeAttribute('aria-current');el('step-form').setAttribute('aria-current','step');el('questionnaire').scrollIntoView({block:'start'});});
