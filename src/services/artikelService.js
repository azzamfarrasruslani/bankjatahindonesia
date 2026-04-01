const API_URL = "/api/artikel";

export async function fetchArtikel() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal mengambil data artikel");
  }
  return response.json();
}

export async function fetchArtikelById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal mengambil detail artikel");
  }
  return response.json();
}

export async function uploadImage(file, existingUrl = "", bucket = "artikel-images", pathPrefix = "artikel") {
  if (!file) return existingUrl;

  // Tetap gunakan kompresi di sisi client untuk efisiensi bandwidth
  const imageCompression = (await import("browser-image-compression")).default;
  const options = {
    maxSizeMB: 0.25,
    maxWidthOrHeight: 1000,
    initialQuality: 0.85,
    useWebWorker: true,
    fileType: "image/webp",
  };

  try {
    const compressedFile = await imageCompression(file, options);
    const fileName = `${pathPrefix}/${Date.now()}.webp`;

    const formData = new FormData();
    formData.append("file", compressedFile);
    formData.append("bucket", bucket);
    formData.append("path", fileName);

    const response = await fetch("/api/storage/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Gagal mengunggah gambar");
    }

    const data = await response.json();
    return data.publicUrl;
  } catch (err) {
    console.error("Gagal mengunggah gambar:", err);
    throw err;
  }
}

export async function insertArtikel(payload) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal menambah artikel");
  }
  return response.json();
}

export async function updateArtikel(id, payload) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal memperbarui artikel");
  }
  return response.json();
}

export async function deleteArtikel(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal menghapus artikel");
  }
  return response.json();
}
