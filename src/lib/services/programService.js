export async function fetchProgram() {
  const res = await fetch("/api/program", {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Gagal mengambil data program");
  }

  return data;
}

export async function insertProgram(payload) {
  const res = await fetch("/api/program", {
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

export async function updateProgram(payload) {
  const res = await fetch(`/api/program`, {
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

export async function deleteProgram(id, icon_url) {
  const res = await fetch(`/api/program`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, icon_url }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Gagal menghapus program.");
  }

  return data;
}
