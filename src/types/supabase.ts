export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      booking_links: {
        Row: {
          booking_id: string
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean
          opened_at: string | null
          token: string
        }
        Insert: {
          booking_id: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          opened_at?: string | null
          token?: string
        }
        Update: {
          booking_id?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          opened_at?: string | null
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_links_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_links_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          booking_ref: string
          client_id: string | null
          created_at: string | null
          description: string | null
          end_at: string
          google_event_id: string | null
          id: string
          is_external: boolean
          location: string | null
          notes: string | null
          price_expenses: number
          price_total: number
          start_at: string
          status: Database["public"]["Enums"]["booking_status"]
          title: string
          updated_at: string | null
        }
        Insert: {
          booking_ref?: string
          client_id?: string | null
          created_at?: string | null
          description?: string | null
          end_at: string
          google_event_id?: string | null
          id?: string
          is_external?: boolean
          location?: string | null
          notes?: string | null
          price_expenses?: number
          price_total?: number
          start_at: string
          status?: Database["public"]["Enums"]["booking_status"]
          title: string
          updated_at?: string | null
        }
        Update: {
          booking_ref?: string
          client_id?: string | null
          created_at?: string | null
          description?: string | null
          end_at?: string
          google_event_id?: string | null
          id?: string
          is_external?: boolean
          location?: string | null
          notes?: string | null
          price_expenses?: number
          price_total?: number
          start_at?: string
          status?: Database["public"]["Enums"]["booking_status"]
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      group_members: {
        Row: {
          contact_phone: string | null
          group_id: string | null
          id: string
          joined_at: string | null
          last_active: string | null
          muted_until: string | null
          role: string | null
          uid: string | null
        }
        Insert: {
          contact_phone?: string | null
          group_id?: string | null
          id?: string
          joined_at?: string | null
          last_active?: string | null
          muted_until?: string | null
          role?: string | null
          uid?: string | null
        }
        Update: {
          contact_phone?: string | null
          group_id?: string | null
          id?: string
          joined_at?: string | null
          last_active?: string | null
          muted_until?: string | null
          role?: string | null
          uid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_members_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_members_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      group_messages: {
        Row: {
          created_at: string | null
          display_name: string | null
          group_id: string | null
          id: string
          is_admin: boolean | null
          is_system: boolean | null
          level: number | null
          photo_url: string | null
          text: string
          uid: string | null
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          group_id?: string | null
          id?: string
          is_admin?: boolean | null
          is_system?: boolean | null
          level?: number | null
          photo_url?: string | null
          text: string
          uid?: string | null
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          group_id?: string | null
          id?: string
          is_admin?: boolean | null
          is_system?: boolean | null
          level?: number | null
          photo_url?: string | null
          text?: string
          uid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_messages_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_messages_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_messages_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          completed_at: string | null
          created_at: string | null
          date: string
          description: string | null
          difficulty: string | null
          id: string
          leader_id: string | null
          max_members: number | null
          meeting_point: Json | null
          member_count: number | null
          member_previews: Json | null
          pinned_message: Json | null
          price_eur: number | null
          spot_lat: number | null
          spot_lon: number | null
          spot_slug: string | null
          spot_title: string | null
          status: string | null
          time: string
          title: string
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          date: string
          description?: string | null
          difficulty?: string | null
          id?: string
          leader_id?: string | null
          max_members?: number | null
          meeting_point?: Json | null
          member_count?: number | null
          member_previews?: Json | null
          pinned_message?: Json | null
          price_eur?: number | null
          spot_lat?: number | null
          spot_lon?: number | null
          spot_slug?: string | null
          spot_title?: string | null
          status?: string | null
          time: string
          title: string
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          date?: string
          description?: string | null
          difficulty?: string | null
          id?: string
          leader_id?: string | null
          max_members?: number | null
          meeting_point?: Json | null
          member_count?: number | null
          member_previews?: Json | null
          pinned_message?: Json | null
          price_eur?: number | null
          spot_lat?: number | null
          spot_lon?: number | null
          spot_slug?: string | null
          spot_title?: string | null
          status?: string | null
          time?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "groups_leader_id_fkey"
            columns: ["leader_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groups_leader_id_fkey"
            columns: ["leader_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      location_aggregate_stats: {
        Row: {
          slug: string
          total_saves: number
          total_shares: number
          total_views: number
          updated_at: string
        }
        Insert: {
          slug: string
          total_saves?: number
          total_shares?: number
          total_views?: number
          updated_at?: string
        }
        Update: {
          slug?: string
          total_saves?: number
          total_shares?: number
          total_views?: number
          updated_at?: string
        }
        Relationships: []
      }
      notification_reads: {
        Row: {
          notification_id: string
          read_at: string
          user_id: string
        }
        Insert: {
          notification_id: string
          read_at?: string
          user_id: string
        }
        Update: {
          notification_id?: string
          read_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_reads_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "notifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_reads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_reads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_label: string | null
          action_url: string | null
          body: string | null
          created_at: string
          created_by: string | null
          expires_at: string | null
          id: string
          image_url: string | null
          target_user: string | null
          title: string
          type: string
        }
        Insert: {
          action_label?: string | null
          action_url?: string | null
          body?: string | null
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          image_url?: string | null
          target_user?: string | null
          title: string
          type?: string
        }
        Update: {
          action_label?: string | null
          action_url?: string | null
          body?: string | null
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          image_url?: string | null
          target_user?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_target_user_fkey"
            columns: ["target_user"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_target_user_fkey"
            columns: ["target_user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          booking_id: string
          created_at: string | null
          id: string
          paid_at: string | null
          status: Database["public"]["Enums"]["payment_status"]
          stripe_payment_intent_id: string | null
          type: Database["public"]["Enums"]["payment_type"]
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string | null
          id?: string
          paid_at?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          stripe_payment_intent_id?: string | null
          type: Database["public"]["Enums"]["payment_type"]
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string | null
          id?: string
          paid_at?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          stripe_payment_intent_id?: string | null
          type?: Database["public"]["Enums"]["payment_type"]
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string
          group_id: string
          group_title: string
          id: string
          message_id: string
          message_text: string
          reporter_id: string
          reporter_name: string
        }
        Insert: {
          created_at?: string
          group_id: string
          group_title?: string
          id?: string
          message_id: string
          message_text?: string
          reporter_id: string
          reporter_name?: string
        }
        Update: {
          created_at?: string
          group_id?: string
          group_title?: string
          id?: string
          message_id?: string
          message_text?: string
          reporter_id?: string
          reporter_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_interaction_stats: {
        Row: {
          book_now_count: number
          coupon_copy_count: number
          entity_id: string
          entity_type: string
          first_viewed_at: string | null
          last_booked_at: string | null
          last_saved_at: string | null
          last_shared_at: string | null
          last_viewed_at: string | null
          save_count: number
          share_count: number
          user_id: string
          view_count: number
        }
        Insert: {
          book_now_count?: number
          coupon_copy_count?: number
          entity_id: string
          entity_type: string
          first_viewed_at?: string | null
          last_booked_at?: string | null
          last_saved_at?: string | null
          last_shared_at?: string | null
          last_viewed_at?: string | null
          save_count?: number
          share_count?: number
          user_id: string
          view_count?: number
        }
        Update: {
          book_now_count?: number
          coupon_copy_count?: number
          entity_id?: string
          entity_type?: string
          first_viewed_at?: string | null
          last_booked_at?: string | null
          last_saved_at?: string | null
          last_shared_at?: string | null
          last_viewed_at?: string | null
          save_count?: number
          share_count?: number
          user_id?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_interaction_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_interaction_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          display_name: string | null
          email: string
          feature_access: Json | null
          id: string
          level: number | null
          phone: string | null
          photo_url: string | null
          receive_updates: boolean | null
          referral_code: string | null
          referred_by: string | null
          role: string | null
          saved_locations: string[] | null
          xp: number
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          email: string
          feature_access?: Json | null
          id: string
          level?: number | null
          phone?: string | null
          photo_url?: string | null
          receive_updates?: boolean | null
          referral_code?: string | null
          referred_by?: string | null
          role?: string | null
          saved_locations?: string[] | null
          xp?: number
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          email?: string
          feature_access?: Json | null
          id?: string
          level?: number | null
          phone?: string | null
          photo_url?: string | null
          receive_updates?: boolean | null
          referral_code?: string | null
          referred_by?: string | null
          role?: string | null
          saved_locations?: string[] | null
          xp?: number
        }
        Relationships: [
          {
            foreignKeyName: "users_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      xp_events: {
        Row: {
          action: string
          earned_at: string
          id: string
          ref_id: string | null
          user_id: string
          xp_gained: number
        }
        Insert: {
          action: string
          earned_at?: string
          id?: string
          ref_id?: string | null
          user_id: string
          xp_gained: number
        }
        Update: {
          action?: string
          earned_at?: string
          id?: string
          ref_id?: string | null
          user_id?: string
          xp_gained?: number
        }
        Relationships: [
          {
            foreignKeyName: "xp_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "xp_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      booking_summary: {
        Row: {
          booking_ref: string | null
          client_company: string | null
          client_email: string | null
          client_id: string | null
          client_name: string | null
          client_phone: string | null
          created_at: string | null
          description: string | null
          end_at: string | null
          google_event_id: string | null
          id: string | null
          is_external: boolean | null
          location: string | null
          notes: string | null
          payment_status: string | null
          price_expenses: number | null
          price_revenue: number | null
          price_total: number | null
          start_at: string | null
          status: Database["public"]["Enums"]["booking_status"] | null
          title: string | null
          total_paid: number | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          display_name: string | null
          id: string | null
          level: number | null
          photo_url: string | null
          role: string | null
        }
        Insert: {
          display_name?: string | null
          id?: string | null
          level?: number | null
          photo_url?: string | null
          role?: string | null
        }
        Update: {
          display_name?: string | null
          id?: string | null
          level?: number | null
          photo_url?: string | null
          role?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      activate_groups_access: { Args: { p_email: string }; Returns: string }
      activate_guide_role: { Args: { p_email: string }; Returns: string }
      admin_create_notification: {
        Args: {
          p_action_label?: string
          p_action_url?: string
          p_body?: string
          p_expires_at?: string
          p_image_url?: string
          p_target_user?: string
          p_title: string
          p_type: string
        }
        Returns: string
      }
      award_xp: { Args: { p_action: string; p_ref_id?: string }; Returns: Json }
      create_system_notification: {
        Args: {
          p_action_url?: string
          p_body?: string
          p_title: string
          p_type: string
          p_user_id: string
        }
        Returns: undefined
      }
      get_leaderboard: {
        Args: { p_limit?: number }
        Returns: {
          display_name: string
          level: number
          photo_url: string
          rank: number
          user_id: string
          xp: number
        }[]
      }
      get_my_notifications: {
        Args: { p_limit?: number }
        Returns: {
          action_label: string
          action_url: string
          body: string
          created_at: string
          created_by: string
          expires_at: string
          id: string
          image_url: string
          is_read: boolean
          read_at: string
          target_user: string
          title: string
          type: string
        }[]
      }
      is_admin: { Args: never; Returns: boolean }
      is_admin_user: { Args: never; Returns: boolean }
      join_group:
        | { Args: { p_group_id: string }; Returns: undefined }
        | { Args: { p_group_id: string; p_phone?: string }; Returns: undefined }
        | {
            Args: {
              p_group_id: string
              p_name: string
              p_photo: string
              p_uid: string
            }
            Returns: undefined
          }
      leave_group: {
        Args: { p_group_id: string; p_uid: string }
        Returns: undefined
      }
      mark_all_notifications_read: { Args: never; Returns: undefined }
      mark_notification_read: {
        Args: { p_notification_id: string }
        Returns: undefined
      }
      process_referral: { Args: { p_referrer_id: string }; Returns: Json }
      track_interaction: {
        Args: { p_entity_id: string; p_entity_type: string; p_event: string }
        Returns: Json
      }
    }
    Enums: {
      booking_status: "draft" | "booked" | "in_progress" | "done" | "cancelled"
      payment_status:
        | "pending"
        | "processing"
        | "completed"
        | "failed"
        | "refunded"
      payment_type: "deposit" | "full"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      booking_status: ["draft", "booked", "in_progress", "done", "cancelled"],
      payment_status: [
        "pending",
        "processing",
        "completed",
        "failed",
        "refunded",
      ],
      payment_type: ["deposit", "full"],
    },
  },
} as const
