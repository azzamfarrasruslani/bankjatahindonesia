export async function fetchKontak() {
  const res = await fetch("/api/kontak", {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Gagal mengambil data kontak");
  }

  return data;
}

export async function updateKontak(id, payload) {
  const res = await fetch(`/api/kontak?id=${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Gagal memperbarui kontak");
  }

  return data;
}
