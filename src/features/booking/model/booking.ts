import { pgTable, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const bookingStatusEnum = pgEnum("booking_status", ["pending", "confirmed", "cancelled"]);

export const booking = pgTable("booking", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    resourceId: text("resource_id").notNull(),
    startTime: timestamp("start_time").notNull(),
    endTime: timestamp("end_time").notNull(),
    status: bookingStatusEnum("status").default("pending").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

