/**
 * Google Apps Script Webhook for Economics Practice Submissions
 * Saves student answers to Google Sheets and handwritten images to Google Drive (5 TB storage).
 *
 * Setup Instructions:
 * 1. Open Google Sheets (create a new sheet or use an existing one named e.g. "Economics Submissions").
 * 2. Click "Extensions" -> "Apps Script".
 * 3. Delete any code in the editor, paste this entire file, and click Save (💾).
 * 4. Click "Deploy" -> "New deployment".
 * 5. Select type: "Web app".
 * 6. Set:
 *    - Description: "Practice Submissions Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (allows student browser submissions without login prompt)
 * 7. Click "Deploy", authorize the permissions for Google Drive & Google Sheets, and copy the Web App URL.
 * 8. Add the URL to your project's .env.local file:
 *    VITE_GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
 */

const ROOT_FOLDER_NAME = "Economics Practice Submissions";

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "ok",
      service: "Economics Practice Submissions Webhook",
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return responseJson({ ok: false, error: "No post data received" }, 400);
    }

    const payload = JSON.parse(e.postData.contents);
    const practiceSetId = String(payload.practice_set_id || "general-practice").trim();
    const studentName = String(payload.student_name || "Anonymous").trim();
    const studentClass = String(payload.class || "").trim();
    const studentSection = String(payload.section || "").trim();
    const rollNo = String(payload.roll_no || "").trim();
    const numericalScore = payload.numerical_score !== undefined && payload.numerical_score !== null ? Number(payload.numerical_score) : "";
    const numericalTotal = payload.numerical_total !== undefined && payload.numerical_total !== null ? Number(payload.numerical_total) : "";
    const answers = payload.answers || {};

    // 1. Get or Create Destination Folder in Google Drive
    const driveFolder = getOrCreateDriveFolder(practiceSetId);

    // 2. Process and Save Uploaded Base64 Images to Google Drive
    const processedAnswers = {};
    const questionKeys = Object.keys(answers).sort(sortQuestionKeys);

    for (let i = 0; i < questionKeys.length; i++) {
      const qKey = questionKeys[i];
      const ans = answers[qKey];

      if (typeof ans === "object" && ans !== null) {
        let textPart = String(ans.text || "").trim();
        let imageUrl = String(ans.image_url || "").trim();

        // If client provided a base64 image, save to Google Drive
        if (ans.image_base64) {
          try {
            const base64Data = ans.image_base64.replace(/^data:image\/\w+;base64,/, "");
            const mimeType = ans.image_mime || "image/jpeg";
            const ext = mimeType.split("/")[1] || "jpg";
            const cleanRoll = rollNo.replace(/[^a-zA-Z0-9_-]/g, "_") || "anon";
            const cleanName = studentName.replace(/[^a-zA-Z0-9_-]/g, "_");
            const fileName = `${qKey}_Roll${cleanRoll}_${cleanName}_${new Date().getTime()}.${ext}`;

            const decodedBytes = Utilities.base64Decode(base64Data);
            const blob = Utilities.newBlob(decodedBytes, mimeType, fileName);
            const driveFile = driveFolder.createFile(blob);

            // Grant anyone with link view access
            driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
            imageUrl = driveFile.getUrl();
          } catch (imgErr) {
            Logger.log("Image saving error: " + imgErr.toString());
          }
        }

        if (textPart && imageUrl) {
          processedAnswers[qKey] = `${textPart}\n\n[Handwritten Sheet]: ${imageUrl}`;
        } else if (imageUrl) {
          processedAnswers[qKey] = imageUrl;
        } else {
          processedAnswers[qKey] = textPart || "(No answer)";
        }
      } else {
        processedAnswers[qKey] = ans !== undefined && ans !== null ? ans : "(No answer)";
      }
    }

    // 3. Save to Google Sheets
    const sheetResult = appendToGoogleSheet({
      practiceSetId: practiceSetId,
      studentName: studentName,
      studentClass: studentClass,
      studentSection: studentSection,
      rollNo: rollNo,
      numericalScore: numericalScore,
      numericalTotal: numericalTotal,
      processedAnswers: processedAnswers,
      questionKeys: questionKeys
    });

    return responseJson({
      ok: true,
      message: "Submission saved to Google Drive & Google Sheets successfully",
      driveFolderUrl: driveFolder.getUrl(),
      sheetRow: sheetResult.row
    });
  } catch (err) {
    Logger.log("Webhook Error: " + err.toString());
    return responseJson({ ok: false, error: err.toString() }, 500);
  }
}

function getOrCreateDriveFolder(practiceSetId) {
  let rootFolder;
  const rootFolders = DriveApp.getFoldersByName(ROOT_FOLDER_NAME);
  if (rootFolders.hasNext()) {
    rootFolder = rootFolders.next();
  } else {
    rootFolder = DriveApp.createFolder(ROOT_FOLDER_NAME);
  }

  const cleanSubfolderName = practiceSetId;
  const subFolders = rootFolder.getFoldersByName(cleanSubfolderName);
  if (subFolders.hasNext()) {
    return subFolders.next();
  } else {
    return rootFolder.createFolder(cleanSubfolderName);
  }
}

function appendToGoogleSheet(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.create("Economics Student Practice Submissions");
  let sheet = ss.getSheetByName(data.practiceSetId);

  // If sheet tab for this practice set doesn't exist, create and format it
  if (!sheet) {
    sheet = ss.insertSheet(data.practiceSetId);

    // Build Header Row
    const headers = [
      "Timestamp",
      "Student Name",
      "Class",
      "Section",
      "Roll No",
      "Auto Numerical Score",
      "Numerical Total",
      "Teacher Total / Grade",
      "Teacher Remarks"
    ];

    for (let i = 0; i < data.questionKeys.length; i++) {
      const qKey = data.questionKeys[i];
      headers.push(qKey.toUpperCase());
    }

    sheet.appendRow(headers);

    // Format Header Row Styling
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#146b63");
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    headerRange.setFontFamily("Arial");
    sheet.setFrozenRows(1);
  }

  // Build the submission data row
  const timestampStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || "GMT+5:45", "yyyy-MM-dd HH:mm:ss");
  const rowData = [
    timestampStr,
    data.studentName,
    data.studentClass,
    data.studentSection,
    data.rollNo,
    data.numericalScore !== "" ? data.numericalScore : "N/A",
    data.numericalTotal !== "" ? data.numericalTotal : "N/A",
    "", // Blank for teacher to grade
    ""  // Blank for teacher remarks
  ];

  for (let i = 0; i < data.questionKeys.length; i++) {
    const qKey = data.questionKeys[i];
    const val = data.processedAnswers[qKey];
    rowData.push(val !== undefined && val !== null ? val : "");
  }

  sheet.appendRow(rowData);
  const rowIndex = sheet.getLastRow();

  // Auto-fit column widths for legibility
  for (let col = 1; col <= Math.min(sheet.getLastColumn(), 15); col++) {
    sheet.autoResizeColumn(col);
  }

  return { row: rowIndex };
}

function sortQuestionKeys(a, b) {
  const numA = parseInt(a.replace(/[^0-9]/g, ""), 10) || 0;
  const numB = parseInt(b.replace(/[^0-9]/g, ""), 10) || 0;
  return numA - numB;
}

function responseJson(data, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
