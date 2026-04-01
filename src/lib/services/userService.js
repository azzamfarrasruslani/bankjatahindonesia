export async function fetchUsers() {
  const res = await fetch("/api/users", {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Gagal mengambil data pengguna");
  }

  return data;
}

export async function insertUser(payload) {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Gagal menambah pengguna");
  }

  return data;
}

export async function updateUser(id, payload) {
  const res = await fetch(`/api/users?id=${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Gagal memperbarui pengguna");
  }

  return data;
}

export async function deleteUser(id) {
  const res = await fetch(`/api/users?id=${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Gagal menghapus pengguna");
  }

  return data;
}
