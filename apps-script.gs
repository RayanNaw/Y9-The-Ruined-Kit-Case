// Ruined Kit Investigation: saves student progress to this Google Sheet.
// 1. Change the PIN below to your own. 2. Deploy > New deployment > Web app,
//    Execute as: Me, Who has access: Anyone. 3. Copy the web app URL.
const PIN = 'Nawar2026';
const SHEET = 'Progress';

function sheet_() {
  const ss = SpreadsheetApp.getActive();
  return ss.getSheetByName(SHEET) || ss.insertSheet(SHEET);
}

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  if (!d.id) return ContentService.createTextOutput('no id');
  const s = sheet_();
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const last = s.getLastRow();
    const ids = last ? s.getRange(1, 1, last, 1).getValues().map(r => String(r[0])) : [];
    const row = ids.indexOf(String(d.id)) + 1;
    const vals = [d.id, new Date(), d.name || '', d.cls || '', d.role || '', d.stage || '', JSON.stringify(d)];
    if (row > 0) s.getRange(row, 1, 1, vals.length).setValues([vals]);
    else s.appendRow(vals);
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput('ok');
}

function doGet(e) {
  const p = e.parameter || {};
  if ((p.pin || '') !== PIN) return json_({ error: 'pin' });
  const s = sheet_();
  if (p.action === 'clear') { s.clear(); return json_({ ok: true }); }
  const last = s.getLastRow();
  if (!last) return json_({ rows: [] });
  const rows = s.getRange(1, 1, last, 7).getValues().filter(r => r[0]).map(r => {
    let d = {};
    try { d = JSON.parse(r[6]); } catch (err) {}
    d.updated = r[1];
    return d;
  });
  return json_({ rows: rows });
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
