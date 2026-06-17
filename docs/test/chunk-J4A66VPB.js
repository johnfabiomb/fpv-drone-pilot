// src/app/map/core/models/group.model.ts
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
  CooldownError,
  SpamMutedError,
  GroupFullError,
  LeaderMustTransferError,
  AlreadyHasActiveGroupError
};
//# sourceMappingURL=chunk-J4A66VPB.js.map
