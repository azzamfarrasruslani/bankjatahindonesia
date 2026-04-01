const API_URL = "/api/testimoni";

export async function fetchTestimoni() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal mengambil data testimoni");
  }
  return response.json();
}

export async function fetchTestimoniById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal mengambil detail testimoni");
  }
  return response.json();
}


export async function insertTestimoni(payload) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal menambah testimoni");
  }
  return response.json();
}

export async function updateTestimoni(id, payload) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal memperbarui testimoni");
  }
  return response.json();
}

export async function deleteTestimoni(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal menghapus testimoni");
  }
  return response.json();
}
