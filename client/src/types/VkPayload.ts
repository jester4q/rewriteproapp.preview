export type VkPayload = {
  token: string;
  user: { id: number; first_name: string; last_name: string };
  uuid: string;
};
