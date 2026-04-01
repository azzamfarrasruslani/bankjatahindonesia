export async function fetchLokasi() {
  const res = await fetch("/api/lokasi", {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Gagal mengambil data lokasi");
  }

  return data;
}

export async function insertLokasi(payload) {
  const res = await fetch("/api/lokasi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error);
  }

  return res.json();
}

export async function updateLokasi(id, payload) {
  const res = await fetch(`/api/lokasi?id=${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error);
  }

  return res.json();
}

export async function deleteLokasi(id) {
  const res = await fetch(`/api/lokasi?id=${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Gagal menghapus lokasi.");
  }

  return data;
}
