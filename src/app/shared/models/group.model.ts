import { Timestamp } from '@angular/fire/firestore';

export type GroupStatus = 'open' | 'full' | 'cancelled' | 'completed';
export type GroupRole = 'leader' | 'member';

export interface GroupMemberPreview {
  uid: string;
  displayName: string;
  photoURL: string;
}

export interface Group {
  id: string;
  title: string;
  spotSlug: string;
  spotTitle: string;
  spotLat: number;
  spotLon: number;
  date: Timestamp;
  time: string;
  description: string;
  difficulty: 'easy' | 'moderate' | 'hard';
  maxMembers: number | null;
  status: GroupStatus;
  leaderId: string;
  leaderName: string;
  leaderPhoto: string;
  memberCount: number;
  memberPreviews: GroupMemberPreview[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface GroupMember {
  uid: string;
  displayName: string;
  photoURL: string;
  role: GroupRole;
  joinedAt: Timestamp;
  lastActive: Timestamp;
}

export interface GroupMessage {
  id: string;
  uid: string;
  displayName: string;
  photoURL: string;
  text: string;
  createdAt: Timestamp | null;
}

export interface CreateGroupPayload {
  title: string;
  spotSlug: string;
  spotTitle: string;
  spotLat: number;
  spotLon: number;
  date: Date;
  time: string;
  description: string;
  difficulty: 'easy' | 'moderate' | 'hard';
  maxMembers: number | null;
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
