import { pgTable, text, timestamp, boolean, real ,pgEnum } from "drizzle-orm/pg-core";


const resourceTypeEnum = pgEnum("resource_type", ["Appartments & Spaces", "Tools & Equipment", "Office & Teach"]);
const priceUnitEnum = pgEnum("price_unit", ["hour", "day", "week", "month"]);

export const resource = pgTable("resource", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    name: text("name").notNull(),
    image: text("image"),
    price: real("price").default(0).notNull(),
    priceUnit: priceUnitEnum("price_unit").default("hour").notNull(),
    category: resourceTypeEnum("type").default("Appartments & Spaces").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
})
