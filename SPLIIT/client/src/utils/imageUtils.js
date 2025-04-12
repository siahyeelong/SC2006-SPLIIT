export const processImageFile = (
    file,
    options = { width: 512, height: 512, quality: 0.8 }
) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            return reject(new Error("No file provided"));
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const size = Math.min(img.width, img.height);
                const sx = (img.width - size) / 2;
                const sy = (img.height - size) / 2;
                const canvas = document.createElement("canvas");
                canvas.width = options.width;
                canvas.height = options.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(
                    img,
                    sx,
                    sy,
                    size,
                    size,
                    0,
                    0,
                    options.width,
                    options.height
                );
                const base64String = canvas.toDataURL(
                    "image/jpeg",
                    options.quality
                );
                resolve(base64String);
            };

            img.onerror = (error) => reject(error);
        };

        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};
