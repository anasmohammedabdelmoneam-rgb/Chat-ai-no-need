/* ==========================================
   Chat AI Pro - JavaScript Logic
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. تحديد رابط التطبيق المستهدف
    const targetUrl = "https://chat-ai-pro-ymod.onrender.com/";

    // 2. توليد رمز الـ QR Code داخل العنصر #qrcode
    const qrcodeContainer = document.getElementById("qrcode");

    if (qrcodeContainer) {
        new QRCode(qrcodeContainer, {
            text: targetUrl,
            width: 180,
            height: 180,
            colorDark: "#0b0f19",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H // مستوى تصحيح خطأ عالٍ للسماح بوضوح المسح
        });
    }
});

/**
 * دالة لنسخ رابط التطبيق إلى الحافظة (Clipboard)
 */
function copyLink() {
    const targetUrl = "https://chat-ai-pro-ymod.onrender.com/";

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(targetUrl)
            .then(() => {
                showToast("تم نسخ رابط التطبيق بنجاح! 📋");
            })
            .catch(err => {
                console.error("خطأ في النسخ: ", err);
                fallbackCopyTextToClipboard(targetUrl);
            });
    } else {
        fallbackCopyTextToClipboard(targetUrl);
    }
}

/**
 * طريقة بديلة للنسخ في حال عدم دعم Clipboard API
 */
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        showToast("تم نسخ رابط التطبيق بنجاح! 📋");
    } catch (err) {
        alert("تعذر النسخ التلقائي، يمكنك نسخ الرابط يدويًا:\n" + text);
    }

    document.body.removeChild(textArea);
}

/**
 * دالة لعرض التنبيهات المقبولة بصريًا (Toast Notification)
 */
function showToast(message) {
    alert(message);
}
