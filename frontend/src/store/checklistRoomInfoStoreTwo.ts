import { roomFormSpec } from "@/store/checklistRoomInfoStore";
import { createInputFieldStores } from "@/store/createFormStoreNew";

export const checklistRoomInfostores = createInputFieldStores(roomFormSpec);