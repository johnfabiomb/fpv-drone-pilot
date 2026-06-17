import {
  computed,
  signal,
  ɵɵdefineInjectable
} from "./chunk-YX7TN7IZ.js";

// src/app/map/core/services/edit-profile-modal.service.ts
var EditProfileModalService = class _EditProfileModalService {
  constructor() {
    this.mode = signal(null);
    this.isOpen = computed(() => this.mode() !== null);
  }
  open(mode = "edit") {
    this.mode.set(mode);
  }
  close() {
    this.mode.set(null);
  }
  static {
    this.\u0275fac = function EditProfileModalService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _EditProfileModalService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EditProfileModalService, factory: _EditProfileModalService.\u0275fac, providedIn: "root" });
  }
};

export {
  EditProfileModalService
};
//# sourceMappingURL=chunk-6VRUSLL4.js.map
