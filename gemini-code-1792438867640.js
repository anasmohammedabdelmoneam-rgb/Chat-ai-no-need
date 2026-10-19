// رابط التطبيق الموجه إليه رمز الـ QR
const m0 = "https://chat-ai-pro-ymod.onrender.com/";

// توليد رمز الـ QR وتضمينه في الصفحة
window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('qrcode-container');
    if (container && window.qrcode) {
        try {
            // إنشاء الـ QR برمز دقة عالي
            var typeNumber = 4;
            var errorCorrectionLevel = 'M';
            var qr = qrcode(typeNumber, errorCorrectionLevel);
            qr.addData(m0);
            qr.make();
            
            // وضع الـ QR داخل العنصر كـ HTML
            container.innerHTML = qr.createSvgTag({cellSize: 6, margin: 2});
        } catch (e) {
            console.error("خطأ في توليد رمز الـ QR:", e);
        }
    }

    // إعداد خلفية النجوم المتحركة عبر Canvas
    const canvas = document.getElementById('space-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        // إنشاء النجوم
        const stars = Array.from({ length: 120 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.5,
            alpha: Math.random(),
            speed: Math.random() * 0.05 + 0.01
        }));

        function animateStars() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#ffffff';

            stars.forEach(star => {
                star.alpha += star.speed;
                if (star.alpha > 1 || star.alpha < 0) star.speed = -star.speed;
                ctx.globalAlpha = Math.abs(star.alpha);
                ctx.fillRect(star.x, star.y, star.size, star.size);
            });

            requestAnimationFrame(animateStars);
        }
        animateStars();
    }
});