export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      capsules: {
        Row: {
          created_at: string;
          description: string | null;
          discount: number | null;
          id: number;
          image: string | null;
          maxCapacity: number | null;
          name: string | null;
          regularPrice: number | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          discount?: number | null;
          id?: number;
          image?: string | null;
          maxCapacity?: number | null;
          name?: string | null;
          regularPrice?: number | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          discount?: number | null;
          id?: number;
          image?: string | null;
          maxCapacity?: number | null;
          name?: string | null;
          regularPrice?: number | null;
        };
        Relationships: [];
      };
      customers: {
        Row: {
          countryFlag: string | null;
          created_at: string;
          email: string | null;
          fullName: string | null;
          id: number;
          nationalID: string | null;
          nationality: string | null;
        };
        Insert: {
          countryFlag?: string | null;
          created_at?: string;
          email?: string | null;
          fullName?: string | null;
          id?: number;
          nationalID?: string | null;
          nationality?: string | null;
        };
        Update: {
          countryFlag?: string | null;
          created_at?: string;
          email?: string | null;
          fullName?: string | null;
          id?: number;
          nationalID?: string | null;
          nationality?: string | null;
        };
        Relationships: [];
      };
      reservations: {
        Row: {
          capsuleId: number | null;
          capsulePrice: number | null;
          comment: string | null;
          created_at: string;
          customerId: number | null;
          endDate: string | null;
          extrasPrice: number | null;
          hasMeal: boolean | null;
          id: number;
          isPaid: boolean | null;
          numCustomers: number | null;
          numNights: number | null;
          startDate: string | null;
          status: string | null;
          totalPrice: number | null;
        };
        Insert: {
          capsuleId?: number | null;
          capsulePrice?: number | null;
          comment?: string | null;
          created_at?: string;
          customerId?: number | null;
          endDate?: string | null;
          extrasPrice?: number | null;
          hasMeal?: boolean | null;
          id?: number;
          isPaid?: boolean | null;
          numCustomers?: number | null;
          numNights?: number | null;
          startDate?: string | null;
          status?: string | null;
          totalPrice?: number | null;
        };
        Update: {
          capsuleId?: number | null;
          capsulePrice?: number | null;
          comment?: string | null;
          created_at?: string;
          customerId?: number | null;
          endDate?: string | null;
          extrasPrice?: number | null;
          hasMeal?: boolean | null;
          id?: number;
          isPaid?: boolean | null;
          numCustomers?: number | null;
          numNights?: number | null;
          startDate?: string | null;
          status?: string | null;
          totalPrice?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "reservations_capsuleId_fkey";
            columns: ["capsuleId"];
            isOneToOne: false;
            referencedRelation: "capsules";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservations_customerId_fkey";
            columns: ["customerId"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          }
        ];
      };
      settings: {
        Row: {
          created_at: string;
          id: number;
          maxCustomersPerReservation: number | null;
          maxReservationLength: number | null;
          mealPrice: number | null;
          minReservationLength: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          maxCustomersPerReservation?: number | null;
          maxReservationLength?: number | null;
          mealPrice?: number | null;
          minReservationLength?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          maxCustomersPerReservation?: number | null;
          maxReservationLength?: number | null;
          mealPrice?: number | null;
          minReservationLength?: number | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
