const API_URL = "/api/faq";

export async function fetchFAQ() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal mengambil data FAQ");
  }
  return response.json();
}

export async function fetchFAQById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal mengambil detail FAQ");
  }
  return response.json();
}

export async function insertFAQ(payload) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal menambah FAQ");
  }
  return response.json();
}

export async function updateFAQ(id, payload) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal memperbarui FAQ");
  }
  return response.json();
}

export async function deleteFAQ(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal menghapus FAQ");
  }
  return response.json();
}
