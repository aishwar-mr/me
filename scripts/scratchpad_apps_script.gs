// Paste this into Extensions > Apps Script on the Google Doc that should
// receive scratch pad drawings from the portfolio site, replace DOC_ID
// below with that doc's own ID, then deploy as a Web App (see README notes
// at the bottom of this file for the exact steps).

const DOC_ID = "1ONPNJuUs8CQd2PtbM4L9dD9ciwT4bdsqU8e9vO9wpsw";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const match = (data.image || "").match(/^data:image\/(png|jpeg);base64,(.+)$/);
    if (!match) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "no image in request" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const ext = match[1] === "jpeg" ? "jpg" : "png";
    const mime = match[1] === "jpeg" ? "image/jpeg" : "image/png";
    const bytes = Utilities.base64Decode(match[2]);
    const blob = Utilities.newBlob(bytes, mime, `scratch-${Date.now()}.${ext}`);

    const doc = DocumentApp.openById(DOC_ID);
    const body = doc.getBody();
    const when = data.at ? new Date(data.at) : new Date();
    body.appendParagraph(`— ${when.toLocaleString()}`);
    body.appendImage(blob);
    body.appendParagraph("");
    doc.saveAndClose();

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// --- Deploy steps ---
// 1. Replace DOC_ID above with your doc's ID, save (Ctrl/Cmd+S).
// 2. Deploy > New deployment > type "Web app".
// 3. Execute as: Me. Who has access: Anyone.
// 4. Deploy, authorize the permissions prompt (it's your own script and
//    your own doc, so this is safe to approve).
// 5. Copy the "Web app" URL it gives you (ends in /exec) — that's
//    VITE_SCRATCHPAD_ENDPOINT.
