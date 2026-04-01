const API_URL = "/api/users";

export async function fetchUsers() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal mengambil data pengguna");
  }
  return response.json();
}

export async function fetchUserById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal mengambil detail pengguna");
  }
  return response.json();
}

export async function insertUser(payload) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal menambah pengguna");
  }
  return response.json();
}

export async function updateUser(id, payload) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal memperbarui pengguna");
  }
  return response.json();
}

export async function deleteUser(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Gagal menghapus pengguna");
  }
  return response.json();
}
