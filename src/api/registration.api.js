import { http } from "./http";

export const getSummary = () => http.get("/summary");
export const listRegistrations = (params) => http.get("/registrations", { params });
export const createRegistration = (payload) => http.post("/registrations", payload);

export const adminListRegistrations = (params, adminKey) =>
  http.get("/admin/registrations", {
    params,
    headers: { "admin-key": adminKey },
  });

export const adminUpdateSeats = (payload, adminKey) =>
  http.put("/admin/seats", payload, {
    headers: { "admin-key": adminKey },
  });

export const adminDeleteRegistration = (id, adminKey) =>
  http.delete(`/admin/registrations/${id}`, {
    headers: { "admin-key": adminKey },
  });
