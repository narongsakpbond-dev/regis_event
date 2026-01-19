import { defineStore } from "pinia";
import { createRegistration, getSummary, listRegistrations } from "../api/registration.api";

export const usePublicStore = defineStore("public", {
  state: () => ({
    summary: null,
    summaryLoading: false,
    items: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    tableLoading: false,
    search: "",
    sort: "createdAt",
    order: "desc",
    formLoading: false,
    error: null,
  }),
  actions: {
    async fetchSummary() {
      this.summaryLoading = true;
      this.error = null;
      try {
        const res = await getSummary();
        this.summary = res.data;
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
        const res = await listRegistrations({
          search: this.search || undefined,
          page: this.pagination.page,
          limit: this.pagination.limit,
          sort: this.sort,
          order: this.order,
        });
        this.items = res.data.items;
        this.pagination = res.data.pagination;
      } catch (err) {
        this.error = err;
        throw err;
      } finally {
        this.tableLoading = false;
      }
    },
    async register(payload) {
      this.formLoading = true;
      this.error = null;
      try {
        await createRegistration(payload);
        await this.fetchSummary();
        this.pagination.page = 1;
        await this.fetchTable();
      } catch (err) {
        this.error = err;
        throw err;
      } finally {
        this.formLoading = false;
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
