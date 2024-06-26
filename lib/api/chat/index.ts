import axios from "@/lib/api/axios";

export async function getChatList() {
  try {
    const res = await axios.get(`/rooms`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getChatStatus(id: number) {
  try {
    const res = await axios.get(`/rooms/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getChatPrev(
  id: number,
  chatPage: number,
  prevPage: number,
) {
  try {
    const res = await axios.get(
      `/rooms/${id}/chats?page=${chatPage}&size=${prevPage}`,
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
