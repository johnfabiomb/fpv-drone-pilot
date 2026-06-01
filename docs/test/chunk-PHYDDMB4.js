// src/app/core/models/enums.ts
var Difficulty = { Easy: "easy", Moderate: "moderate", Hard: "hard" };
var Island = { Malta: "malta", Gozo: "gozo", Comino: "comino" };
var MapPointType = { Destination: "destination", Parking: "parking", Waypoint: "waypoint" };
var GroupStatus = {
  Open: "open",
  Full: "full",
  Exploring: "exploring",
  Cancelled: "cancelled",
  Completed: "completed",
  Archived: "archived"
};
var GroupRole = { Leader: "leader", Member: "member" };
var UserRole = { Explorer: "explorer", Admin: "admin", Guide: "guide" };

// src/app/core/models/group.model.ts
var CooldownError = class extends Error {
  constructor(secondsLeft) {
    super(`Please wait ${secondsLeft}s before sending again.`);
    this.secondsLeft = secondsLeft;
    this.name = "CooldownError";
  }
};
var SpamMutedError = class extends Error {
  constructor(minutesLeft) {
    super(`You've been muted for ${minutesLeft} minute${minutesLeft === 1 ? "" : "s"}.`);
    this.minutesLeft = minutesLeft;
    this.name = "SpamMutedError";
  }
};
var GroupFullError = class extends Error {
  constructor() {
    super("This group is already full.");
    this.name = "GroupFullError";
  }
};
var LeaderMustTransferError = class extends Error {
  constructor() {
    super("You must transfer leadership before leaving the group.");
    this.name = "LeaderMustTransferError";
  }
};
var AlreadyHasActiveGroupError = class extends Error {
  constructor() {
    super("You already have an active group. Cancel or complete it before creating a new one.");
    this.name = "AlreadyHasActiveGroupError";
  }
};

export {
  Difficulty,
  Island,
  MapPointType,
  GroupStatus,
  GroupRole,
  UserRole,
  CooldownError,
  SpamMutedError,
  GroupFullError,
  LeaderMustTransferError,
  AlreadyHasActiveGroupError
};
//# sourceMappingURL=chunk-PHYDDMB4.js.map
