import { Timestamp } from '@core/models/timestamp';
import type { GroupStatus, GroupRole, Difficulty } from '@core/models/enums';

export interface GroupMemberPreview {
  uid: string;
  displayName: string;
  photoURL: string;
}

export interface MeetingPoint {
  lat: number;
  lon: number;
  label?: string;
}

export interface PinnedMessage {
  id: string;
  text: string;
  authorName: string;
  pinnedAt: Timestamp;
}

export interface Group {
  id: string;
  title: string;
  spotSlug: string | null;
  spotTitle: string | null;
  spotLat: number | null;
  spotLon: number | null;
  date: Timestamp;
  time: string;
  description: string;
  difficulty: Difficulty;
  maxMembers: number | null;
  status: GroupStatus;
  leaderId: string;
  leaderName: string;
  leaderPhoto: string;
  leaderIsAdmin: boolean;
  leaderLevel: number;
  memberCount: number;
  memberPreviews: GroupMemberPreview[];
  meetingPoint: MeetingPoint | null;
  pinnedMessage?: PinnedMessage | null;
  completedAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface GroupMember {
  uid: string;
  displayName: string;
  photoURL: string;
  level: number;
  isAdmin: boolean;
  role: GroupRole;
  joinedAt: Timestamp;
  lastActive: Timestamp;
  mutedUntil?: Timestamp;
}

export interface GroupMessage {
  id: string;
  uid: string;
  displayName: string;
  photoURL: string;
  text: string;
  createdAt: Timestamp | null;
  isSystem?: boolean;
  level?: number;
  isAdmin?: boolean;
}

export interface CreateGroupPayload {
  title: string;
  spotSlug: string | null;
  spotTitle: string | null;
  spotLat: number | null;
  spotLon: number | null;
  date: Date;
  time: string;
  description: string;
  difficulty: Difficulty;
  maxMembers: number | null;
  meetingPoint: MeetingPoint | null;
}

export interface UpdateGroupPayload {
  title: string;
  spotSlug: string | null;
  spotTitle: string | null;
  spotLat: number | null;
  spotLon: number | null;
  date: Date;
  time: string;
  description: string;
  difficulty: Difficulty;
  maxMembers: number | null;
  meetingPoint: MeetingPoint | null;
}

export class CooldownError extends Error {
  constructor(public readonly secondsLeft: number) {
    super(`Please wait ${secondsLeft}s before sending again.`);
    this.name = 'CooldownError';
  }
}

export class SpamMutedError extends Error {
  constructor(public readonly minutesLeft: number) {
    super(`You've been muted for ${minutesLeft} minute${minutesLeft === 1 ? '' : 's'}.`);
    this.name = 'SpamMutedError';
  }
}

export class GroupFullError extends Error {
  constructor() {
    super('This group is already full.');
    this.name = 'GroupFullError';
  }
}

export class LeaderMustTransferError extends Error {
  constructor() {
    super('You must transfer leadership before leaving the group.');
    this.name = 'LeaderMustTransferError';
  }
}

export class AlreadyHasActiveGroupError extends Error {
  constructor() {
    super('You already have an active group. Cancel or complete it before creating a new one.');
    this.name = 'AlreadyHasActiveGroupError';
  }
}

export interface ReportRow {
  id:            string;
  reporter_id:   string;
  reporter_name: string;
  group_id:      string;
  group_title:   string;
  message_id:    string;
  message_text:  string;
  created_at:    string;
}
