export async function fetchTestimoni() {
  const res = await fetch("/api/testimoni", {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Gagal mengambil data testimoni");
  }

  return data;
}

export async function insertTestimoni(payload) {
  const res = await fetch("/api/testimoni", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Gagal menambah testimoni");
  }

  return data;
}

export async function updateTestimoni(id, payload) {
  const res = await fetch(`/api/testimoni?id=${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Gagal memperbarui testimoni");
  }

  return data;
}

export async function deleteTestimoni(id) {
  const res = await fetch(`/api/testimoni?id=${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Gagal menghapus testimoni");
  }

  return data;
}
