const API_URL = "/api/tim";

export async function fetchTim() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal mengambil data tim");
  }
  return response.json();
}

export async function fetchTimById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal mengambil detail anggota tim");
  }
  return response.json();
}

export async function uploadImage(file, existingUrl = "", bucket = "team-images", pathPrefix = "team") {
  if (!file) return existingUrl;

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
      throw new Error(errorData.error || "Gagal mengunggah foto");
    }

    const data = await response.json();
    return data.publicUrl;
  } catch (err) {
    console.error("Gagal mengunggah foto:", err);
    throw err;
  }
}

export async function insertTim(payload) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal menambah anggota tim");
  }
  return response.json();
}

export async function updateTim(id, payload) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal memperbarui anggota tim");
  }
  return response.json();
}

export async function deleteTim(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal menghapus anggota tim");
  }
  return response.json();
}
