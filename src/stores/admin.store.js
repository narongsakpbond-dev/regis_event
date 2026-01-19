import { defineStore } from "pinia";
import {
  adminDeleteRegistration,
  adminListRegistrations,
  adminUpdateSeats,
  getSummary,
} from "../api/registration.api";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    adminKey: localStorage.getItem("adminKey") || "",

    summary: null,
    summaryLoading: false,

    totalSeatsInput: 0,
    seatSaving: false,

    items: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    tableLoading: false,

    search: "",
    sort: "createdAt",
    order: "desc",

    error: null,
  }),
  getters: {
    isAuthed: (s) => Boolean(s.adminKey),
  },
  actions: {
    setAdminKey(v) {
      this.adminKey = v || "";
      localStorage.setItem("adminKey", this.adminKey);
    },
    clearAdminKey() {
      this.adminKey = "";
      localStorage.removeItem("adminKey");
    },
    async fetchSummary() {
      this.summaryLoading = true;
      this.error = null;
      try {
        const res = await getSummary();
        this.summary = res.data;
        this.totalSeatsInput = res.data.totalSeats ?? 0;
      } catch (err) {
        this.error = err;
        throw err;
      } finally {
        this.summaryLoading = false;
      }
    },
    async fetchTable() {
      this.tableLoading = true;
      this.error = null;
      try {
        const res = await adminListRegistrations(
          {
            search: this.search || undefined,
            page: this.pagination.page,
            limit: this.pagination.limit,
            sort: this.sort,
            order: this.order,
          },
          this.adminKey
        );
        this.items = res.data.items;
        this.pagination = res.data.pagination;
      } catch (err) {
        this.error = err;
        throw err;
      } finally {
        this.tableLoading = false;
      }
    },
    async saveSeats() {
      this.seatSaving = true;
      this.error = null;
      try {
        await adminUpdateSeats(
          { totalSeats: Number(this.totalSeatsInput) },
          this.adminKey
        );
        await this.fetchSummary();
      } catch (err) {
        this.error = err;
        throw err;
      } finally {
        this.seatSaving = false;
      }
    },
    async deleteRegistration(id) {
      this.error = null;
      try {
        await adminDeleteRegistration(id, this.adminKey);
        await this.fetchSummary();
        await this.fetchTable();
      } catch (err) {
        this.error = err;
        throw err;
      }
    },
    async init() {
      await this.fetchSummary();
      await this.fetchTable();
    },
    async changePage(p) {
      this.pagination.page = p;
      await this.fetchTable();
    },
    async setSearch(v) {
      this.search = v;
      this.pagination.page = 1;
      await this.fetchTable();
    },
    async setSort(v) {
      this.sort = v;
      this.pagination.page = 1;
      await this.fetchTable();
    },
    async setOrder(v) {
      this.order = v;
      this.pagination.page = 1;
      await this.fetchTable();
    },
  },
});
